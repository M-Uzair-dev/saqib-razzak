"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import LightRays from "@/components/LightRays";
import SmoothScroll from "@/components/SmoothScroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OLevelP2() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef([]);
  const [activeTab, setActiveTab] = useState('notes');
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
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

  const units = [
    {
      id: 7,
      title: "Unit 7",
      subtitle: "Algorithm Design & Problem Solving",
      topics: [
        { id: 1, title: "Algorithm Design & Problem Solving", file: "Unit7_Part1_Algorithm_design_and_problem_solving.docx", type: "docx", folder: "notes" },
        { id: 2, title: "Pseudocode (Max, Min, Bubble Sort, Linear Search)", file: "Unit7_Part2_Pseudocode_Max,Min,Bubblesort,Linearsearch.docx", type: "docx", folder: "notes" }
      ]
    },
    {
      id: 8,
      title: "Unit 8",
      subtitle: "Programming",
      topics: [
        { id: 1, title: "Programming Concepts", file: "8.1 PROGRAMMING CONCEPTS.docx", type: "docx", folder: "notes" },
        { id: 2, title: "Programming", file: "Unit8_Part1_Programming.docx", type: "docx", folder: "notes" },
        { id: 3, title: "String & File Handling", file: "Unit8_Part2_String_AND_FileHandling.docx", type: "docx", folder: "notes" },
        { id: 4, title: "Library Routines", file: "Unit8_Part3_LibraryRoutines.docx", type: "docx", folder: "notes" },
        { id: 5, title: "Arrays", file: "Unit8_Part4_Arrays.docx", type: "docx", folder: "notes" }
      ]
    }
  ];

  const importantTopics = [
    { id: 1, title: "Algorithm & Array", file: "Algorithm_array.docx", type: "docx", folder: "important_topics" },
    { id: 2, title: "Boolean Logic", file: "Boolean_Logic.docx", type: "docx", folder: "important_topics" },
    { id: 3, title: "Database", file: "Database.docx", type: "docx", folder: "important_topics" },
    { id: 4, title: "Error Finding", file: "Error_finding.docx", type: "docx", folder: "important_topics" },
    { id: 5, title: "File Handling", file: "File_Handling.docx", type: "docx", folder: "important_topics" },
    { id: 6, title: "Program Development Life Cycle", file: "Program_development_Life_Cycle.docx", type: "docx", folder: "important_topics" },
    { id: 7, title: "Scenario Based", file: "Scenario_Based.docx", type: "docx", folder: "important_topics" },
    { id: 8, title: "String Handlers", file: "String_Handlers.docx", type: "docx", folder: "important_topics" },
    { id: 9, title: "Structure Diagram", file: "Structure_diagram.docx", type: "docx", folder: "important_topics" },
    { id: 10, title: "Test Data", file: "Test_Data.docx", type: "docx", folder: "important_topics" },
    { id: 11, title: "Trace Table", file: "Trace_Table.docx", type: "docx", folder: "important_topics" },
    { id: 12, title: "Validation & Verification", file: "Validation_verificaiton.docx", type: "docx", folder: "important_topics" }
  ];

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
    setShowTopicModal(true);
  };

  const handleTopicClick = async (topic) => {
    setSelectedDocument(topic);
    setShowTopicModal(false);
    setShowDocumentModal(true);
    setIsLoadingDocument(true);
    setDocumentContent(null);

    try {
      const response = await fetch('/api/convert-document-p2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: topic.file,
          folder: topic.folder
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

  const handleImportantTopicClick = async (topic) => {
    setSelectedDocument(topic);
    setShowDocumentModal(true);
    setIsLoadingDocument(true);
    setDocumentContent(null);

    try {
      const response = await fetch('/api/convert-document-p2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: topic.file,
          folder: topic.folder
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

  const closeModals = () => {
    setShowTopicModal(false);
    setShowDocumentModal(false);
    setSelectedDocument(null);
    setSelectedUnit(null);
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
                  O Level Paper 2
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Excel in O Level Paper 2
                  <span className="block text-[#f7991B] mt-2">Practical Applications</span>
                </h1>
                <p className="text-base md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Master practical problem-solving with hands-on programming experience. 
                  Focus on algorithm design, coding, and computational thinking.
                </p>
              </div>
            </div>
          </section>

          {/* Tabs Section */}
          <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === 'notes'
                      ? 'bg-[#f7991B] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Notes</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('important')}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === 'important'
                      ? 'bg-[#f7991B] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span>Important Topics</span>
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* Notes Tab Content */}
          {activeTab === 'notes' && (
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={addToContentRef} className="mb-16">
                  <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Units & Study Materials</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {units.map((unit) => (
                      <div
                        key={unit.id}
                        onClick={() => handleUnitClick(unit)}
                        className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-[#f7991B] to-[#e6890a] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#f7991B] transition-colors">{unit.title}</h3>
                          <p className="text-gray-600 text-center mb-4">{unit.subtitle}</p>
                          <div className="bg-[#f7991B]/10 px-4 py-2 rounded-full">
                            <span className="text-[#f7991B] font-semibold text-sm">{unit.topics.length} Topics</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Important Topics Tab Content */}
          {activeTab === 'important' && (
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={addToContentRef} className="mb-16">
                  <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Important Topics</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {importantTopics.map((topic) => (
                      <div
                        key={topic.id}
                        onClick={() => handleImportantTopicClick(topic)}
                        className="bg-white p-6 rounded-lg hover:bg-[#f7991B]/10 hover:border-[#f7991B] border border-gray-200 cursor-pointer transition-all duration-200 group shadow-md hover:shadow-lg"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-[#f7991B]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#f7991B]/30 transition-colors">
                            <svg className="w-6 h-6 text-[#f7991B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </div>
                          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#f7991B] transition-colors">{topic.title}</h3>
                          <div className="mt-2">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                              DOCX
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

        {/* Topic Selection Modal */}
        {showTopicModal && selectedUnit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4" data-lenis-prevent>
            <div className="bg-white rounded-xl sm:rounded-2xl max-w-6xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-y-auto" data-lenis-prevent>
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900">{selectedUnit.title} - {selectedUnit.subtitle}</h2>
                  <button
                    onClick={closeModals}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600 mt-2">Select a topic to view detailed notes</p>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {selectedUnit.topics.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => handleTopicClick(topic)}
                      className="bg-gray-50 p-4 rounded-lg hover:bg-[#f7991B]/10 hover:border-[#f7991B] border border-gray-200 cursor-pointer transition-all duration-200 group"
                    >
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-[#f7991B]/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-[#f7991B]/30 transition-colors">
                          <svg className="w-4 h-4 text-[#f7991B]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#f7991B] transition-colors line-clamp-2">{topic.title}</h3>
                          <div className="flex items-center mt-1 space-x-2">
                            <p className="text-xs text-gray-500">Topic {topic.id}</p>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                              DOCX
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full-screen Document Viewer Modal */}
        {showDocumentModal && selectedDocument && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col" data-lenis-prevent>
            <div className="bg-white border-b border-gray-200 p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setShowDocumentModal(false);
                    setShowTopicModal(true);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h2 className="text-sm sm:text-lg font-semibold text-gray-900 line-clamp-1">{selectedDocument.title}</h2>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {selectedUnit ? `${selectedUnit.title} - Topic ${selectedDocument.id}` : 'Important Topic'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="bg-red-100 px-2 sm:px-3 py-1 rounded-full">
                  <span className="text-red-600 text-xs sm:text-sm font-medium">Read Only</span>
                </div>
                <button
                  onClick={closeModals}
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
                      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{selectedDocument.title}</h1>
                      <p className="text-sm sm:text-base text-gray-600">
                        {selectedUnit ? `${selectedUnit.title} - ${selectedUnit.subtitle}` : 'Important Topic'}
                      </p>
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
                        <p className="text-sm sm:text-base text-gray-500 mb-4">Please try selecting the document again.</p>
                        <button
                          onClick={() => handleTopicClick(selectedDocument)}
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
        </main>
      </div>
    </SmoothScroll>
  );
}