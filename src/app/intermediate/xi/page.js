"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
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
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Class XI Foundation
                  <span className="block text-[#f7991B] mt-2">First Year Excellence</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Start your intermediate journey with strong foundations in mathematics, 
                  computer science, and essential subjects for higher education success.
                </p>
              </div>
            </div>
          </section>

          {/* PDF Notes Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* PDF Notes Section */}
              <div ref={addToContentRef} className="mb-16">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Class XI Study Materials</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Mathematics XI", description: "Algebra, trigonometry & calculus", pages: "60 pages" },
                    { title: "Computer Science XI", description: "Programming basics & theory", pages: "45 pages" },
                    { title: "Physics XI", description: "Mechanics and thermal physics", pages: "55 pages" },
                    { title: "Chemistry XI", description: "Atomic structure & bonding", pages: "50 pages" },
                    { title: "English XI", description: "Literature and composition", pages: "40 pages" },
                    { title: "Combined Practice Tests", description: "Mock exams and assessments", pages: "35 pages" }
                  ].map((pdf, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group hover:scale-105">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors">
                          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-[#f7991B] transition-colors">{pdf.title}</h3>
                          <p className="text-xs text-gray-500">{pdf.pages}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{pdf.description}</p>
                      <div className="flex items-center text-sm text-[#f7991B] font-medium">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download PDF
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </SmoothScroll>
  );
}