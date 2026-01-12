"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import LightRays from "@/components/LightRays";
import SmoothScroll from "@/components/SmoothScroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function IntermediateXI() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef([]);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [documentContent, setDocumentContent] = useState(null);
  const [isLoadingDocument, setIsLoadingDocument] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(contentRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".content-section",
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToContentRef = (el) => {
    if (el && !contentRef.current.includes(el)) {
      contentRef.current.push(el);
    }
  };

  const handleViewNotes = async () => {
    setShowDocumentModal(true);
    setIsLoadingDocument(true);
    setDocumentContent(null);

    try {
      const response = await fetch('/api/convert-document-intermediate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: 'CompleteNotes.docx',
          level: 'XI'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setDocumentContent(data.html);
      } else {
        throw new Error('Failed to load document');
      }
    } catch (error) {
      console.error('Error loading document:', error);
      setDocumentContent('<div class="text-center text-red-600"><p>Failed to load document. Please try again.</p></div>');
    } finally {
      setIsLoadingDocument(false);
    }
  };

  const closeModal = () => {
    setShowDocumentModal(false);
    setDocumentContent(null);
    setIsLoadingDocument(false);
  };

  useEffect(() => {
    const handleContextMenu = (e) => {
      if (showDocumentModal) {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e) => {
      if (showDocumentModal) {
        if (e.ctrlKey || e.metaKey || e.altKey) {
          if (e.key === 'c' || e.key === 'a' || e.key === 's' || e.key === 'p' ||
              e.key === 'x' || e.key === 'v' || e.key === 'z' || e.key === 'y' ||
              e.key === 'u' || e.key === 'r' || e.key === 'f' || e.key === 'h' ||
              e.key === 'i' || e.key === 'j') {
            e.preventDefault();
          }
        }
        if (e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
            (e.ctrlKey && e.key === 'U')) {
          e.preventDefault();
        }
        if (e.key === 'PrintScreen') {
          e.preventDefault();
        }
      }
    };

    const handleVisibilityChange = () => {
      if (showDocumentModal && document.visibilityState === 'hidden') {
        setTimeout(() => {
          if (document.visibilityState === 'visible' && showDocumentModal) {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: #000;
              z-index: 99999;
              pointer-events: none;
            `;
            document.body.appendChild(overlay);
            setTimeout(() => {
              document.body.removeChild(overlay);
            }, 100);
          }
        }, 50);
      }
    };

    const preventScreenshots = () => {
      if (showDocumentModal) {
        const style = document.createElement('style');
        style.id = 'screenshot-prevention';
        style.textContent = `
          body {
            -webkit-touch-callout: none !important;
            -webkit-user-select: none !important;
            -khtml-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-app-region: no-drag !important;
          }

          .document-viewer {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            pointer-events: auto !important;
          }

          .document-viewer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            z-index: 1;
            pointer-events: none;
          }

          @media print {
            * {
              display: none !important;
            }
          }
        `;
        document.head.appendChild(style);
      } else {
        const existingStyle = document.getElementById('screenshot-prevention');
        if (existingStyle) {
          existingStyle.remove();
        }
      }
    };

    if (showDocumentModal) {
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      preventScreenshots();
      document.body.style.userSelect = 'none';
    } else {
      preventScreenshots();
    }

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.body.style.userSelect = 'auto';
      const existingStyle = document.getElementById('screenshot-prevention');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [showDocumentModal]);

  return (
    <SmoothScroll>
      <div ref={containerRef} className="min-h-screen bg-white">
        <AnimatedNavbar />

        <main className="relative overflow-hidden">
          <LightRays
            raysOrigin="top-center"
            raysColor="#f7991B"
            raysSpeed={0.3}
            lightSpread={0.8}
            rayLength={1.2}
            saturation={0.3}
            fadeDistance={1.0}
          />

          {/* Hero Section */}
          <section className="relative z-10 bg-gradient-to-br from-[#f7991B]/5 to-white py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div ref={heroRef} className="text-center">
                <div className="inline-flex items-center px-4 py-2 bg-[#f7991B]/10 rounded-full text-[#f7991B] font-medium text-sm mb-6">
                  <span className="w-2 h-2 bg-[#f7991B] rounded-full mr-2 animate-pulse"></span>
                  Intermediate Class XI
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Class XI Foundation
                  <span className="block text-[#f7991B] mt-2">First Year Excellence</span>
                </h1>
                <p className="text-base md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Start your intermediate journey with strong foundations in mathematics,
                  computer science, and essential subjects for higher education success.
                </p>
              </div>
            </div>
          </section>

          {/* Notes Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div ref={addToContentRef} className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-12">Complete Notes</h2>
                <div className="max-w-2xl mx-auto">
                  <div
                    onClick={handleViewNotes}
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#f7991B] to-[#e6890a] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#f7991B] transition-colors">
                        Intermediate XI Complete Notes
                      </h3>
                      <p className="text-gray-600 text-center mb-4">
                        Comprehensive study material covering all topics for Class XI
                      </p>
                      <div className="bg-[#f7991B]/10 px-4 py-2 rounded-full">
                        <span className="text-[#f7991B] font-semibold text-sm">Click to View</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Full-screen Document Viewer Modal */}
        {showDocumentModal && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col" data-lenis-prevent>
            <div className="bg-white border-b border-gray-200 p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div>
                  <h2 className="text-sm sm:text-lg font-semibold text-gray-900">Intermediate XI Complete Notes</h2>
                  <p className="text-xs sm:text-sm text-gray-500">Class XI</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="bg-red-100 px-2 sm:px-3 py-1 rounded-full">
                  <span className="text-red-600 text-xs sm:text-sm font-medium">Read Only</span>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div
              className="flex-1 bg-gray-100 overflow-auto"
              style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
              }}
              onContextMenu={(e) => e.preventDefault()}
              data-lenis-prevent
            >
              <div className="w-full sm:max-w-4xl sm:mx-auto p-0 sm:p-4 lg:p-8">
                <div className="bg-white sm:rounded-lg sm:shadow-lg p-3 sm:p-6 lg:p-8 min-h-[calc(100vh-60px)] sm:min-h-[calc(100vh-200px)]">
                  <div className="prose max-w-none">
                    <div className="text-center mb-4 sm:mb-8">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#f7991B]/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#f7991B]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        Intermediate XI Complete Notes
                      </h1>
                      <p className="text-sm sm:text-base text-gray-600">Class XI</p>
                    </div>

                    {isLoadingDocument && (
                      <div className="text-center py-8 sm:py-12">
                        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-[#f7991B] mx-auto mb-4"></div>
                        <p className="text-sm sm:text-base text-gray-600">Loading document...</p>
                      </div>
                    )}

                    {!isLoadingDocument && documentContent && (
                      <div
                        className="document-viewer"
                        dangerouslySetInnerHTML={{ __html: documentContent }}
                        style={{
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          MozUserSelect: 'none',
                          msUserSelect: 'none'
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                      />
                    )}

                    {!isLoadingDocument && !documentContent && (
                      <div className="text-center py-8 sm:py-12">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L12.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Failed to load document</h3>
                        <p className="text-sm sm:text-base text-gray-500 mb-4">Please try again.</p>
                        <button
                          onClick={handleViewNotes}
                          className="px-4 py-2 bg-[#f7991B] text-white rounded-lg hover:bg-[#e6890a] transition-colors text-sm sm:text-base"
                        >
                          Retry Loading
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SmoothScroll>
  );
}
