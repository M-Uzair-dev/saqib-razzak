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

export default function IntermediateXII() {
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
                  Intermediate Class XII
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Class XII Completion
                  <span className="block text-[#f7991B] mt-2">Final Year Success</span>
                </h1>
                <p className="text-base md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Complete your intermediate education with excellence. Master advanced concepts, 
                  ace board exams, and prepare for university admission and career success.
                </p>
              </div>
            </div>
          </section>

          {/* PDF Notes Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

              <div ref={addToContentRef} className="text-center">
                <div className="bg-white rounded-2xl p-12 shadow-lg">
                  <div className="w-24 h-24 bg-[#f7991B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-[#f7991B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
                  <p className="text-xl text-gray-600 mb-2">Notes for <span className="text-[#f7991B] font-semibold">Intermediate XII</span> will be added soon!</p>
                  <p className="text-gray-500">Stay tuned for final year materials and board exam preparation resources.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </SmoothScroll>
  );
}