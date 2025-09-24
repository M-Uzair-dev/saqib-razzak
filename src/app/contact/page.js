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

export default function Contact() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(formRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.from(infoRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToInfoRef = (el) => {
    if (el && !infoRef.current.includes(el)) {
      infoRef.current.push(el);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        message: ""
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <SmoothScroll>
      <div ref={containerRef} className="min-h-screen bg-white">
        <AnimatedNavbar />

        <main className="relative overflow-hidden">
          <LightRays
            raysOrigin="top-center"
            raysColor="#8457A4"
            raysSpeed={0.3}
            lightSpread={0.8}
            rayLength={1.2}
            saturation={0.3}
            fadeDistance={1.0}
          />

          {/* Hero Section */}
          <section className="relative z-10 bg-gradient-to-br from-[#8457A4]/5 to-white py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div ref={heroRef} className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-[#8457A4]/10 rounded-full text-[#8457A4] font-medium text-sm mb-6">
                  <span className="w-2 h-2 bg-[#8457A4] rounded-full mr-2 animate-pulse"></span>
                  Get In Touch
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Contact Me
                  <span className="block text-[#8457A4] mt-2">Start Your Learning Journey</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Ready to excel in your studies? Get in touch with me to discuss your educational 
                  goals and find the perfect course for your success.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-8">
                
                {/* Contact Form */}
                <div ref={formRef} className="bg-white p-8 rounded-2xl shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send me a Message</h2>
                  
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-600">Thank you for your inquiry. I&apos;ll get back to you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="cursor-text w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8457A4] focus:border-transparent transition-all duration-300"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="cursor-text w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8457A4] focus:border-transparent transition-all duration-300"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="cursor-text w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8457A4] focus:border-transparent transition-all duration-300"
                            placeholder="+92 XXX XXXXXXX"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Course Interest
                          </label>
                          <select
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            className="cursor-pointer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8457A4] focus:border-transparent transition-all duration-300"
                          >
                            <option value="">Select a course</option>
                            <option value="olevel-p1">O Level Paper 1</option>
                            <option value="olevel-p2">O Level Paper 2</option>
                            <option value="alevel-as">A Level AS</option>
                            <option value="alevel-a2">A Level A2</option>
                            <option value="intermediate-xi">Intermediate Class XI</option>
                            <option value="intermediate-xii">Intermediate Class XII</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="cursor-text w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8457A4] focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="Tell me about your goals and how I can help you..."
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className="cursor-pointer w-full bg-[#8457A4] hover:bg-[#6d4589] text-white py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-1"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-3 gap-6">
                  
                  {/* Contact Cards */}
                  <div ref={addToInfoRef} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#8457A4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-[#8457A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                      <p className="text-gray-600 text-sm">info@saqibrazzak.com</p>
                    </div>
                  </div>

                  <div ref={addToInfoRef} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#f7991B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-[#f7991B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                      <p className="text-gray-600 text-sm">+92 XXX XXXXXXX</p>
                    </div>
                  </div>

                  <div ref={addToInfoRef} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#8457A4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-[#8457A4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                      <p className="text-gray-600 text-sm">Karachi, Pakistan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </SmoothScroll>
  );
}