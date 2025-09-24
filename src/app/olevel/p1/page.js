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

export default function OLevelP1() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef([]);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentContent, setDocumentContent] = useState(null);
  const [isLoadingDocument, setIsLoadingDocument] = useState(false);

  const chapterOneTopics = [
    { id: 1, title: "Binary Represents Data", file: "Topic1_BinaryRepresentsData.docx" },
    { id: 2, title: "Addition Of Binary", file: "Topic2_AdditionOfBinary.docx" },
    { id: 3, title: "Two's Complement", file: "Topic3_Two'sComplement.docx" },
    { id: 4, title: "Logical Binary Shift", file: "Topic4_LogicalBinaryShift.docx" },
    { id: 5, title: "Uses Of Hexadecimal", file: "Topic5_UsesOfHexa.docx" },
    { id: 6, title: "Data Compression", file: "Topic6_DataCompression.docx" },
    { id: 7, title: "Lossy & Lossless File Compression", file: "Topic7_Lossy_LosslessFileCompression.docx" },
    { id: 8, title: "Sound", file: "Topic8_Sound.docx" },
    { id: 9, title: "ASCII Code & Unicode", file: "Topic9_ASCII_Code_Unicode.docx" },
    { id: 10, title: "Images", file: "Topic10_Images.docx" },
    { id: 11, title: "Measurement of Data Storage", file: "Topic11_MeasurementofDatastorage.docx" },
    { id: 12, title: "Memory Calculation", file: "Topic12_MemoryCalculation.docx" }
  ];

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

  const handleChapterClick = () => {
    setShowTopicModal(true);
  };

  const handleTopicClick = async (topic) => {
    setSelectedDocument(topic);
    setShowTopicModal(false);
    setShowDocumentModal(true);
    setIsLoadingDocument(true);
    setDocumentContent(null);

    try {
      const response = await fetch('/api/convert-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: topic.file }),
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

    if (showDocumentModal) {
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.userSelect = 'auto';
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
                  O Level Paper 1
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Master O Level Paper 1
                  <span className="block text-[#f7991B] mt-2">Theory & Concepts</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Build strong theoretical foundations with comprehensive coverage of all Paper 1 topics. 
                  Focus on conceptual understanding and analytical thinking.
                </p>
              </div>
            </div>
          </section>

          {/* Chapter Notes Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div ref={addToContentRef} className="mb-16">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Chapter Notes & Study Materials</h2>
                <div className="flex justify-center">
                  <div
                    onClick={handleChapterClick}
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 max-w-sm w-full"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#f7991B] to-[#e6890a] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 1v6" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 1v6" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#f7991B] transition-colors">Chapter One</h3>
                      <p className="text-gray-600 text-center mb-4">Data Representation & Number Systems</p>
                      <div className="bg-[#f7991B]/10 px-4 py-2 rounded-full">
                        <span className="text-[#f7991B] font-semibold text-sm">{chapterOneTopics.length} Topics</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Topic Selection Modal */}
        {showTopicModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4" data-lenis-prevent>
            <div className="bg-white rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-y-auto" data-lenis-prevent>
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Chapter One - Data Representation & Number Systems</h2>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {chapterOneTopics.map((topic) => (
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
                          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#f7991B] transition-colors">{topic.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">Topic {topic.id}</p>
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
                  <p className="text-xs sm:text-sm text-gray-500">Chapter One - Topic {selectedDocument.id}</p>
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
                      <p className="text-sm sm:text-base text-gray-600">Chapter One - Data Representation & Number Systems</p>
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
                        onSelectStart={(e) => e.preventDefault()}
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
      </div>
    </SmoothScroll>
  );
}