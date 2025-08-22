"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
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
              y: 50,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.1,
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
                  <p className="text-blue-600 font-medium text-base sm:text-lg animate-shimmer w-max px-4">
                    Educator & Software Engineer
                  </p>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    Guiding the Next Generation of{" "}
                    <span className="text-blue-600 animate-float">
                      Thinkers & Innovators
                    </span>
                  </h1>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  I'm Saqib Razzak, a dedicated teacher for O Levels, A Levels,
                  and Intermediate students, with a strong background in
                  software engineering. My passion lies in making complex
                  concepts simple, nurturing curiosity, and empowering students
                  with the skills they need to excel academically and beyond.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="group bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-1">
                    <span className="group-hover:animate-pulse">
                      Explore Courses
                    </span>
                  </button>
                  <button className="group border border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-md">
                    Learn More
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
                  <div className="absolute -inset-3 bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-indigo-400/30 blur-2xl -z-10 rounded-3xl animate-pulse opacity-70"></div>

                  {/* Floating elements around image */}
                  <div
                    className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/20 rounded-full animate-float"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="absolute -top-2 -right-6 w-4 h-4 bg-purple-500/30 rounded-full animate-float"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute -bottom-4 -right-2 w-6 h-6 bg-indigo-500/25 rounded-full animate-float"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-16 lg:mt-20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                <div
                  ref={addToStatsRef}
                  className="space-y-2 group hover:transform hover:scale-110 transition-all duration-300"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 group-hover:animate-pulse">
                    5+
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    Years of Teaching
                  </div>
                </div>
                <div
                  ref={addToStatsRef}
                  className="space-y-2 group hover:transform hover:scale-110 transition-all duration-300"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 group-hover:animate-pulse">
                    500+
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    Students Mentored
                  </div>
                </div>
                <div
                  ref={addToStatsRef}
                  className="space-y-2 group hover:transform hover:scale-110 transition-all duration-300"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 group-hover:animate-pulse">
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
                  <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    <span className="text-blue-600 font-bold text-lg group-hover:animate-pulse">
                      O
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors duration-300">
                    O Levels
                  </h3>
                </div>

                <div
                  ref={addToSkillsRef}
                  className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-xl text-center transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    <span className="text-green-600 font-bold text-lg group-hover:animate-pulse">
                      A
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-green-600 transition-colors duration-300">
                    A Levels
                  </h3>
                </div>

                <div
                  ref={addToSkillsRef}
                  className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-xl text-center transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    <span className="text-purple-600 font-bold text-lg group-hover:animate-pulse">
                      AK
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-purple-600 transition-colors duration-300">
                    Aga Khan Board
                  </h3>
                </div>

                <div
                  ref={addToSkillsRef}
                  className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-xl text-center transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-red-100 group-hover:bg-red-200 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    <span className="text-red-600 font-bold text-lg group-hover:animate-pulse">
                      FB
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-red-600 transition-colors duration-300">
                    Federal Board
                  </h3>
                </div>

                <div
                  ref={addToSkillsRef}
                  className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-xl text-center transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-indigo-100 group-hover:bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    <span className="text-indigo-600 font-bold text-lg group-hover:animate-pulse">
                      IB
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors duration-300">
                    Intermediate Board
                  </h3>
                </div>

                <div
                  ref={addToSkillsRef}
                  className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-xl text-center transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-orange-100 group-hover:bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                    <span className="text-orange-600 font-bold text-lg group-hover:animate-pulse">
                      11
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-orange-600 transition-colors duration-300">
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
                  Choose from our comprehensive range of courses designed for
                  different educational levels
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* O Level Card */}
                <div
                  ref={addToCoursesRef}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-4 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                      <span className="text-blue-600 font-bold text-2xl group-hover:animate-bounce">
                        O
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 text-center mb-3 transition-colors duration-300">
                      O Level
                    </h3>
                    <p className="text-sm text-gray-600 text-center mb-6 group-hover:text-gray-700">
                      Comprehensive O Level preparation for students aiming for
                      excellence
                    </p>
                    <div className="space-y-3">
                      <div className="bg-gray-50 group-hover:bg-blue-50 p-3 rounded-lg transition-all duration-300 hover:scale-105">
                        <h4 className="font-semibold text-sm text-gray-900">
                          Paper 1 (P1)
                        </h4>
                        <p className="text-xs text-gray-600">
                          Theory and conceptual understanding
                        </p>
                      </div>
                      <div className="bg-gray-50 group-hover:bg-blue-50 p-3 rounded-lg transition-all duration-300 hover:scale-105">
                        <h4 className="font-semibold text-sm text-gray-900">
                          Paper 2 (P2)
                        </h4>
                        <p className="text-xs text-gray-600">
                          Practical applications and problem solving
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* A Level Card */}
                <div
                  ref={addToCoursesRef}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-4 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                      <span className="text-green-600 font-bold text-2xl group-hover:animate-bounce">
                        A
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 text-center mb-3 transition-colors duration-300">
                      A Level
                    </h3>
                    <p className="text-sm text-gray-600 text-center mb-6 group-hover:text-gray-700">
                      Advanced level courses for university preparation and
                      career readiness
                    </p>
                    <div className="space-y-3">
                      <div className="bg-gray-50 group-hover:bg-green-50 p-3 rounded-lg transition-all duration-300 hover:scale-105">
                        <h4 className="font-semibold text-sm text-gray-900">
                          AS Level
                        </h4>
                        <p className="text-xs text-gray-600">
                          Foundation for advanced studies
                        </p>
                      </div>
                      <div className="bg-gray-50 group-hover:bg-green-50 p-3 rounded-lg transition-all duration-300 hover:scale-105">
                        <h4 className="font-semibold text-sm text-gray-900">
                          A2 Level
                        </h4>
                        <p className="text-xs text-gray-600">
                          Advanced concepts and applications
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Intermediate Card */}
                <div
                  ref={addToCoursesRef}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-4 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-purple-100 group-hover:bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                      <span className="text-purple-600 font-bold text-2xl group-hover:animate-bounce">
                        I
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 text-center mb-3 transition-colors duration-300">
                      Intermediate
                    </h3>
                    <p className="text-sm text-gray-600 text-center mb-6 group-hover:text-gray-700">
                      Complete intermediate education support for HSC students
                    </p>
                    <div className="space-y-3">
                      <div className="bg-gray-50 group-hover:bg-purple-50 p-3 rounded-lg transition-all duration-300 hover:scale-105">
                        <h4 className="font-semibold text-sm text-gray-900">
                          Class XI
                        </h4>
                        <p className="text-xs text-gray-600">
                          First year intermediate foundation
                        </p>
                      </div>
                      <div className="bg-gray-50 group-hover:bg-purple-50 p-3 rounded-lg transition-all duration-300 hover:scale-105">
                        <h4 className="font-semibold text-sm text-gray-900">
                          Class XII
                        </h4>
                        <p className="text-xs text-gray-600">
                          Second year completion and exam prep
                        </p>
                      </div>
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
                  Hear from students who have achieved success through our
                  teaching methods
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div
                  ref={addToTestimonialsRef}
                  className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <span className="text-blue-600 font-bold group-hover:animate-pulse">
                          AH
                        </span>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors duration-300">
                          Ahmed Hassan
                        </h4>
                        <p className="text-xs text-gray-500">A Level Student</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      "Sir Saqib's teaching method made complex concepts so easy
                      to understand. I scored A* in Mathematics thanks to his
                      guidance and support."
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
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <span className="text-green-600 font-bold group-hover:animate-pulse">
                          SF
                        </span>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-900 text-sm group-hover:text-green-600 transition-colors duration-300">
                          Sara Fatima
                        </h4>
                        <p className="text-xs text-gray-500">O Level Student</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      "The best teacher I've ever had! His patience and clear
                      explanations helped me improve from C to A grade in just 6
                      months."
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
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <span className="text-purple-600 font-bold group-hover:animate-pulse">
                          MA
                        </span>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-900 text-sm group-hover:text-purple-600 transition-colors duration-300">
                          Muhammad Ali
                        </h4>
                        <p className="text-xs text-gray-500">
                          Intermediate Student
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      "Sir's programming concepts and problem-solving approach
                      prepared me well for university. Highly recommend his
                      classes!"
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
                      src="/logo.jpg"
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
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">f</span>
                    </div>
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">t</span>
                    </div>
                    <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
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
      </div>
    </SmoothScroll>
  );
}
