import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const mammoth = require('mammoth');

export async function POST(request) {
  try {
    const { filename, folder } = await request.json();

    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      );
    }

    // P2 files are stored in public/OP2/notes/ or public/OP2/important_topics/
    const subfolder = folder || 'notes';
    const basePath = path.join('public', 'OP2', subfolder);
    const filePath = path.join(process.cwd(), basePath, filename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    const buffer = fs.readFileSync(filePath);
    const result = await mammoth.convertToHtml({ buffer });

    let htmlContent = result.value;

    htmlContent = addWatermark(htmlContent);
    htmlContent = addSecurityStyles(htmlContent);

    return NextResponse.json({
      html: htmlContent,
      messages: result.messages
    });

  } catch (error) {
    console.error('Document conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert document' },
      { status: 500 }
    );
  }
}

function addWatermark(html) {
  const watermarkStyle = `
    <style>
      .document-content {
        position: relative;
        background-image:
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 100px,
            rgba(247, 153, 27, 0.05) 100px,
            rgba(247, 153, 27, 0.05) 200px
          );
      }
      .document-content::before {
        content: "Protected Content - Read Only";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 48px;
        color: rgba(247, 153, 27, 0.1);
        font-weight: bold;
        pointer-events: none;
        z-index: 1;
      }
      .document-content > * {
        position: relative;
        z-index: 2;
      }
    </style>
  `;

  return watermarkStyle + `<div class="document-content">${html}</div>`;
}

function addSecurityStyles(html) {
  const securityStyles = `
    <style>
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
        -webkit-app-region: no-drag !important;
      }

      /* Enhanced screenshot prevention */
      html {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        user-select: none !important;
      }

      body {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        user-select: none !important;
        pointer-events: auto !important;
      }

      /* Prevent screenshots and screen recording */
      @media screen {
        .document-content {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          user-select: none !important;
          position: relative;
        }

        .document-content::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          pointer-events: none;
          z-index: 1;
        }
      }

      @media print {
        * {
          display: none !important;
          visibility: hidden !important;
        }
        body {
          display: none !important;
          visibility: hidden !important;
        }
      }

      .document-content {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        line-height: 1.6;
        color: #374151;
        font-size: 14px;
      }

      @media (min-width: 640px) {
        .document-content {
          font-size: 16px;
        }
      }

      .document-content h1, .document-content h2, .document-content h3 {
        color: #1f2937;
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
        font-size: 1.25rem;
      }

      @media (min-width: 640px) {
        .document-content h1, .document-content h2, .document-content h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
      }

      .document-content h1 {
        font-size: 1.5rem;
      }

      @media (min-width: 640px) {
        .document-content h1 {
          font-size: 2rem;
        }
      }

      .document-content p {
        margin-bottom: 0.75rem;
      }

      @media (min-width: 640px) {
        .document-content p {
          margin-bottom: 1rem;
        }
      }

      .document-content ul, .document-content ol {
        margin-left: 1rem;
        margin-bottom: 0.75rem;
      }

      @media (min-width: 640px) {
        .document-content ul, .document-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
      }

      .document-content strong {
        font-weight: 600;
        color: #f7991B;
      }

      .document-content table {
        width: 100%;
        border-collapse: collapse;
        margin: 0.75rem 0;
        font-size: 12px;
      }

      @media (min-width: 640px) {
        .document-content table {
          margin: 1rem 0;
          font-size: 14px;
        }
      }

      .document-content th, .document-content td {
        border: 1px solid #e5e7eb;
        padding: 0.25rem;
        text-align: left;
      }

      @media (min-width: 640px) {
        .document-content th, .document-content td {
          padding: 0.5rem;
        }
      }

      .document-content th {
        background-color: #f9fafb;
        font-weight: 600;
      }
    </style>
  `;

  return securityStyles + html;
}
