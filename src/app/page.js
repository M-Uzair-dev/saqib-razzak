"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import LightRays from "@/components/LightRays";
import SmoothScroll from "@/components/SmoothScroll";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);
  const statsRef = useRef([]);
  const skillsRef = useRef([]);
  const coursesRef = useRef([]);
  const testimonialsRef = useRef([]);
  const [showContactDialog, setShowContactDialog] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure all refs are populated
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Hero section animations
        const tl = gsap.timeline({ delay: 0.5 });

        // Animate hero text with advanced easing
        tl.from(heroTextRef.current.children, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
        })
          // Animate hero image with 3D effect
          .from(
            heroImageRef.current,
            {
              scale: 0.8,
              opacity: 0,
              rotationY: -45,
              duration: 1.2,
              ease: "power3.out",
            },
            "-=0.5"
          )
          // Stats counter animation
          .from(
            statsRef.current,
            {
              y: 30,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.1,
              clearProps: "all",
            },
            "-=0.3"
          );

        // ScrollTrigger animations for sections - only animate if elements exist

        // Skills section animation
        if (skillsRef.current.length > 0) {
          gsap.set(skillsRef.current, { y: 80, opacity: 0 });
          gsap.to(skillsRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".skills-section",
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // Course cards animation with 3D rotation
        if (coursesRef.current.length > 0) {
          gsap.set(coursesRef.current, { y: 100, opacity: 0, rotationX: -15 });
          gsap.to(coursesRef.current, {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".courses-section",
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // Testimonials animation with slide effect
        if (testimonialsRef.current.length > 0) {
          gsap.set(testimonialsRef.current, { x: -100, opacity: 0 });
          gsap.to(testimonialsRef.current, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: ".testimonials-section",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // Parallax effect for hero section
        gsap.to(heroImageRef.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }, containerRef);

      return () => ctx.revert();
    }, 100); // Small delay to ensure refs are populated

    return () => clearTimeout(timer);
  }, []);

  const addToStatsRef = (el) => {
    if (el && !statsRef.current.includes(el)) {
      statsRef.current.push(el);
    }
  };

  const addToSkillsRef = (el) => {
    if (el && !skillsRef.current.includes(el)) {
      skillsRef.current.push(el);
    }
  };

  const addToCoursesRef = (el) => {
    if (el && !coursesRef.current.includes(el)) {
      coursesRef.current.push(el);
    }
  };

  const addToTestimonialsRef = (el) => {
    if (el && !testimonialsRef.current.includes(el)) {
      testimonialsRef.current.push(el);
    }
  };

  const scrollToCourses = () => {
    const coursesSection = document.querySelector(".courses-section");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openContactDialog = () => {
    setShowContactDialog(true);
  };

  const closeContactDialog = () => {
    setShowContactDialog(false);
  };

  return (
    <SmoothScroll>
      <div ref={containerRef} className="min-h-screen bg-white">
        <AnimatedNavbar />

        <main className="relative overflow-hidden min-h-[calc(100vh-64px)]">
          <LightRays
            raysOrigin="top-center"
            raysColor="#9ca3af"
            raysSpeed={0.5}
            lightSpread={1}
            rayLength={1.5}
            saturation={0.4}
            fadeDistance={1.2}
          />

          <section className="hero-section relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div ref={heroTextRef} className="space-y-6 lg:space-y-8">
                <div className="space-y-2">
                  <p className="text-[#f7991B] font-medium text-base sm:text-lg animate-shimmer w-max px-4 ">
                    Educator & Software Engineer
                  </p>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    Guiding the Next Generation of{" "}
                    <span className="text-[#8457A4] animate-float">
                      Thinkers & Innovators
                    </span>
                  </h1>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  I&apos;m Saqib Razzak, a dedicated teacher for O Levels, A
                  Levels, and Intermediate students, with a strong background in
                  software engineering. My passion lies in making complex
                  concepts simple, nurturing curiosity, and empowering students
                  with the skills they need to excel academically and beyond.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={scrollToCourses}
                    className="cursor-pointer group bg-[#f7991B] hover:bg-[#e6850f] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-1"
                  >
                    <span className="group-hover:animate-pulse">
                      Explore Courses
                    </span>
                  </button>
                  <button
                    onClick={openContactDialog}
                    className="cursor-pointer group border border-gray-300 hover:border-[#8457A4] text-gray-700 hover:text-[#8457A4] px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-md"
                  >
                    Contact
                  </button>
                </div>
              </div>

              <div
                ref={heroImageRef}
                className="relative flex justify-center lg:justify-end perspective-1000"
              >
                <div className="relative transform hover:scale-105 transition-all duration-500">
                  <div className="w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[420px] relative">
                    <Image
                      src="/main.jpg"
                      alt="Saqib Razzak - Educator & Software Engineer"
                      fill
                      priority
                      className="rounded-2xl shadow-2xl object-cover object-right hover:shadow-3xl transition-shadow duration-500"
                    />
                  </div>
                  <div className="absolute -inset-3 bg-gradient-to-br from-[#f7991B]/30 via-[#8457A4]/20 to-[#8457A4]/30 blur-2xl -z-10 rounded-3xl animate-pulse opacity-70"></div>

                  {/* Floating elements around image */}
                  <div
                    className="absolute -top-4 -left-4 w-8 h-8 bg-[#f7991B]/20 rounded-full animate-float"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="absolute -top-2 -right-6 w-4 h-4 bg-[#8457A4]/30 rounded-full animate-float"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute -bottom-4 -right-2 w-6 h-6 bg-[#8457A4]/25 rounded-full animate-float"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-16 lg:mt-20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
                <div
                  ref={addToStatsRef}
                  className="group hover:transform hover:scale-110 transition-all duration-300 py-4 opacity-100"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-[#f7991B] group-hover:animate-pulse mb-2">
                    10+
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    Years of Teaching
                  </div>
                </div>
                <div
                  ref={addToStatsRef}
                  className="group hover:transform hover:scale-110 transition-all duration-300 py-4 opacity-100"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-[#f7991B] group-hover:animate-pulse mb-2">
                    2500+
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    Students Mentored
                  </div>
                </div>
                <div
                  ref={addToStatsRef}
                  className="group hover:transform hover:scale-110 transition-all duration-300 py-4 opacity-100"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-[#f7991B] group-hover:animate-pulse mb-2">
                    95%
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    Success Rate
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="skills-section relative z-10 bg-gray-50 py-16 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 animate-fadeInUp">
                  Teaching Expertise
                </h2>
                <p
                  className="text-sm text-gray-600 max-w-2xl mx-auto animate-fadeInUp"
                  style={{ animationDelay: "0.2s" }}
                >
                  With 11 years of dedicated experience, I specialize in various
                  educational boards and levels
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <div
                  ref={addToSkillsRef}
                  className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-xl text-center transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-[#f7991B]/10 group-hover:bg-[#f7991B]/20 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    <span className="text-[#f7991B] font-bold text-lg group-hover:animate-pulse">
                      O
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#f7991B] transition-colors duration-300">
                    O Levels
                  </h3>
                </div>

                <div
                  ref={addToSkillsRef}
                  className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-xl text-center transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-[#8457A4]/10 group-hover:bg-[#8457A4]/20 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    <span className="text-[#8457A4] font-bold text-lg group-hover:animate-pulse">
                      A
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#8457A4] transition-colors duration-300">
                    A Levels
                  </h3>
                </div>

                <div
                  ref={addToSkillsRef}
                  className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-xl text-center transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-[#f7991B]/10 group-hover:bg-[#f7991B]/20 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    <span className="text-[#f7991B] font-bold text-lg group-hover:animate-pulse">
                      AK
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#f7991B] transition-colors duration-300">
                    Aga Khan Board
                  </h3>
                </div>

                <div
                  ref={addToSkillsRef}
                  className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-xl text-center transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-[#8457A4]/10 group-hover:bg-[#8457A4]/20 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    <span className="text-[#8457A4] font-bold text-lg group-hover:animate-pulse">
                      FB
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#8457A4] transition-colors duration-300">
                    Federal Board
                  </h3>
                </div>

                <div
                  ref={addToSkillsRef}
                  className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-xl text-center transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-[#f7991B]/10 group-hover:bg-[#f7991B]/20 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    <span className="text-[#f7991B] font-bold text-lg group-hover:animate-pulse">
                      IB
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#f7991B] transition-colors duration-300">
                    Intermediate Board
                  </h3>
                </div>

                <div
                  ref={addToSkillsRef}
                  className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-xl text-center transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-[#8457A4]/10 group-hover:bg-[#8457A4]/20 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    <span className="text-[#8457A4] font-bold text-lg group-hover:animate-pulse">
                      11
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#8457A4] transition-colors duration-300">
                    Years Experience
                  </h3>
                </div>
              </div>
            </div>
          </section>

          {/* Courses Cards Section */}
          <section className="courses-section relative z-10 py-16 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 animate-fadeInUp">
                  Available Courses
                </h2>
                <p
                  className="text-sm text-gray-600 max-w-2xl mx-auto animate-fadeInUp"
                  style={{ animationDelay: "0.2s" }}
                >
                  Choose from my comprehensive range of courses designed for
                  different educational levels
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* O Level Card */}
                <div
                  ref={addToCoursesRef}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-4 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f7991B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-[#f7991B]/10 group-hover:bg-[#f7991B]/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                      <span className="text-[#f7991B] font-bold text-2xl group-hover:animate-bounce">
                        O
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#f7991B] text-center mb-3 transition-colors duration-300">
                      O Level
                    </h3>
                    <p className="text-sm text-gray-600 text-center mb-6 group-hover:text-gray-700">
                      Comprehensive O Level preparation for students aiming for
                      excellence
                    </p>
                    <div className="space-y-3">
                      <Link href="/olevel/p1" className="block">
                        <div className="bg-gray-50 group-hover:bg-[#f7991B]/5 p-3 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer hover:bg-[#f7991B]/10">
                          <h4 className="font-semibold text-sm text-gray-900">
                            Paper 1 (P1)
                          </h4>
                          <p className="text-xs text-gray-600">
                            Theory and conceptual understanding
                          </p>
                        </div>
                      </Link>
                      <Link href="/olevel/p2" className="block">
                        <div className="bg-gray-50 group-hover:bg-[#f7991B]/5 p-3 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer hover:bg-[#f7991B]/10">
                          <h4 className="font-semibold text-sm text-gray-900">
                            Paper 2 (P2)
                          </h4>
                          <p className="text-xs text-gray-600">
                            Practical applications and problem solving
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* A Level Card */}
                <div
                  ref={addToCoursesRef}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-4 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8457A4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-[#8457A4]/10 group-hover:bg-[#8457A4]/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                      <span className="text-[#8457A4] font-bold text-2xl group-hover:animate-bounce">
                        A
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#8457A4] text-center mb-3 transition-colors duration-300">
                      A Level
                    </h3>
                    <p className="text-sm text-gray-600 text-center mb-6 group-hover:text-gray-700">
                      Advanced level courses for university preparation and
                      career readiness
                    </p>
                    <div className="space-y-3">
                      <Link href="/alevel/as" className="block">
                        <div className="bg-gray-50 group-hover:bg-[#8457A4]/5 p-3 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer hover:bg-[#8457A4]/10">
                          <h4 className="font-semibold text-sm text-gray-900">
                            AS Level
                          </h4>
                          <p className="text-xs text-gray-600">
                            Foundation for advanced studies
                          </p>
                        </div>
                      </Link>
                      <Link href="/alevel/a2" className="block">
                        <div className="bg-gray-50 group-hover:bg-[#8457A4]/5 p-3 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer hover:bg-[#8457A4]/10">
                          <h4 className="font-semibold text-sm text-gray-900">
                            A2 Level
                          </h4>
                          <p className="text-xs text-gray-600">
                            Advanced concepts and applications
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Intermediate Card */}
                <div
                  ref={addToCoursesRef}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-4 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f7991B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-[#f7991B]/10 group-hover:bg-[#f7991B]/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                      <span className="text-[#f7991B] font-bold text-2xl group-hover:animate-bounce">
                        I
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#f7991B] text-center mb-3 transition-colors duration-300">
                      Intermediate
                    </h3>
                    <p className="text-sm text-gray-600 text-center mb-6 group-hover:text-gray-700">
                      Complete intermediate education support for HSC students
                    </p>
                    <div className="space-y-3">
                      <Link href="/intermediate/xi" className="block">
                        <div className="bg-gray-50 group-hover:bg-[#f7991B]/5 p-3 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer hover:bg-[#f7991B]/10">
                          <h4 className="font-semibold text-sm text-gray-900">
                            Class XI
                          </h4>
                          <p className="text-xs text-gray-600">
                            First year intermediate foundation
                          </p>
                        </div>
                      </Link>
                      <Link href="/intermediate/xii" className="block">
                        <div className="bg-gray-50 group-hover:bg-[#f7991B]/5 p-3 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer hover:bg-[#f7991B]/10">
                          <h4 className="font-semibold text-sm text-gray-900">
                            Class XII
                          </h4>
                          <p className="text-xs text-gray-600">
                            Second year completion and exam prep
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials-section relative z-10 bg-gray-50 py-16 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 animate-fadeInUp">
                  What Students Say
                </h2>
                <p
                  className="text-sm text-gray-600 max-w-2xl mx-auto animate-fadeInUp"
                  style={{ animationDelay: "0.2s" }}
                >
                  Hear from students who have achieved success through my
                  teaching methods
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div
                  ref={addToTestimonialsRef}
                  className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f7991B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[#f7991B]/10 group-hover:bg-[#f7991B]/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <span className="text-[#f7991B] font-bold group-hover:animate-pulse">
                          AH
                        </span>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-900 text-sm group-hover:text-[#f7991B] transition-colors duration-300">
                          Ahmed Hassan
                        </h4>
                        <p className="text-xs text-gray-500">A Level Student</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      &ldquo;Sir Saqib&apos;s teaching method made complex
                      concepts so easy to understand. I scored A* in Mathematics
                      thanks to his guidance and support.&rdquo;
                    </p>
                    <div className="flex text-yellow-400 mt-3 group-hover:scale-110 transition-transform duration-300">
                      ★★★★★
                    </div>
                  </div>
                </div>

                <div
                  ref={addToTestimonialsRef}
                  className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8457A4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[#8457A4]/10 group-hover:bg-[#8457A4]/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <span className="text-[#8457A4] font-bold group-hover:animate-pulse">
                          SF
                        </span>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-900 text-sm group-hover:text-[#8457A4] transition-colors duration-300">
                          Sara Fatima
                        </h4>
                        <p className="text-xs text-gray-500">O Level Student</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      &ldquo;The best teacher I&apos;ve ever had! His patience
                      and clear explanations helped me improve from C to A grade
                      in just 6 months.&rdquo;
                    </p>
                    <div className="flex text-yellow-400 mt-3 group-hover:scale-110 transition-transform duration-300">
                      ★★★★★
                    </div>
                  </div>
                </div>

                <div
                  ref={addToTestimonialsRef}
                  className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f7991B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[#f7991B]/10 group-hover:bg-[#f7991B]/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <span className="text-[#f7991B] font-bold group-hover:animate-pulse">
                          MA
                        </span>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-900 text-sm group-hover:text-[#f7991B] transition-colors duration-300">
                          Muhammad Ali
                        </h4>
                        <p className="text-xs text-gray-500">
                          Intermediate Student
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      &ldquo;Sir&apos;s programming concepts and problem-solving
                      approach prepared me well for university. Highly recommend
                      his classes!&rdquo;
                    </p>
                    <div className="flex text-yellow-400 mt-3 group-hover:scale-110 transition-transform duration-300">
                      ★★★★★
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <Image
                      src="/logo.png"
                      alt="Saqib Razzak"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="font-semibold text-lg">Saqib Razzak</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-4 max-w-md">
                    Dedicated educator and software engineer committed to
                    guiding students towards academic excellence and innovative
                    thinking.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.facebook.com/share/1CRQk323eL/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="https://api.whatsapp.com/send/?phone=%2B923352126988&text&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/saqibrazzak_soft_eng?utm_source=qr&igsh=cDBvM3V0MXFhbm9k"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Courses</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>O Level (P1, P2)</li>
                    <li>A Level (AS, A2)</li>
                    <li>Intermediate (XI, XII)</li>
                    <li>Programming</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Contact</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>Email: saqibrazzak85@gmail.com</li>
                    <li>Phone: +92 3352126988</li>
                    <li>Location: Karachi, Pakistan</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                <p className="text-sm text-gray-400">
                  © 2024 Saqib Razzak. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </main>

        {/* Contact Dialog */}
        {showContactDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-auto relative animate-fadeIn">
              <button
                onClick={closeContactDialog}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#8457A4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#8457A4]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Get In Touch
                </h3>
                <p className="text-gray-600">
                  Ready to start your learning journey with me?
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="tel:+923352126988"
                    className="text-center p-4 border border-gray-200 rounded-lg hover:border-[#f7991B] hover:bg-[#f7991B]/5 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-[#f7991B]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-4 h-4 text-[#f7991B]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">Call Me</p>
                  </a>

                  <a
                    href="mailto:saqibrazzak85@gmail.com"
                    className="text-center p-4 border border-gray-200 rounded-lg hover:border-[#8457A4] hover:bg-[#8457A4]/5 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-[#8457A4]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-4 h-4 text-[#8457A4]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">
                      Email Me
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating WhatsApp Button */}
        <a
          href="https://api.whatsapp.com/send/?phone=%2B923352126988&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse"
          aria-label="Contact via WhatsApp"
        >
          <svg
            className="w-7 h-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </SmoothScroll>
  );
}
