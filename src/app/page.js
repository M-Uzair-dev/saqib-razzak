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
    const coursesSection = document.querySelector('.courses-section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
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
                      className="rounded-2xl shadow-2xl object-cover object-center hover:shadow-3xl transition-shadow duration-500"
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
                    <div className="w-8 h-8 bg-[#f7991B] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">f</span>
                    </div>
                    <div className="w-8 h-8 bg-[#8457A4] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">t</span>
                    </div>
                    <div className="w-8 h-8 bg-[#f7991B] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">in</span>
                    </div>
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
                    <li>Email: info@saqibrazzak.com</li>
                    <li>Phone: +92 XXX XXXXXXX</li>
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#8457A4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#8457A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get In Touch</h3>
                <p className="text-gray-600">Ready to start your learning journey with me?</p>
              </div>

              <div className="space-y-4">
                <Link
                  href="/contact"
                  className="cursor-pointer w-full bg-[#8457A4] hover:bg-[#6d4589] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  Contact Form
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border border-gray-200 rounded-lg hover:border-[#8457A4] transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-[#f7991B]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-[#f7991B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600">Call Me</p>
                  </div>
                  
                  <div className="text-center p-4 border border-gray-200 rounded-lg hover:border-[#8457A4] transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-[#8457A4]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-[#8457A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600">WhatsApp</p>
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
