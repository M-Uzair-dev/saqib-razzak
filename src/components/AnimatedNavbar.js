'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AnimatedNavbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial navbar slide down animation
      gsap.set(navRef.current, { y: -100, opacity: 0 });
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });

      // Logo animation
      gsap.set(logoRef.current, { scale: 0, rotation: -180 });
      gsap.to(logoRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.5
      });

      // Stagger link animations
      gsap.set(linksRef.current, { y: 20, opacity: 0 });
      gsap.to(linksRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.7
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const addToLinksRef = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  return (
    <nav ref={navRef} className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2" ref={logoRef}>
              <Image
                src="/logo.jpg"
                alt="Saqib Razzak Logo"
                width={36}
                height={36}
                className="rounded-full hover:scale-110 transition-transform duration-300"
              />
              <span className="font-semibold text-gray-900 text-lg hover:text-[#f7991B] transition-colors duration-300">
                Saqib Razzak
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link
                ref={addToLinksRef}
                href="/"
                className="text-gray-700 hover:text-[#f7991B] px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                Home
              </Link>
              
              <div className="relative" ref={addToLinksRef}>
                <button
                  onClick={() => handleDropdownToggle('olevel')}
                  className="text-gray-700 hover:text-[#f7991B] px-3 py-2 text-sm font-medium transition-all duration-300 flex items-center hover:scale-105"
                >
                  O Level
                  <svg className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                    activeDropdown === 'olevel' ? 'rotate-180' : ''
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'olevel' && (
                  <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 animate-slideDown">
                    <Link href="/olevel/p1" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#f7991B]/5 hover:text-[#f7991B] first:rounded-t-lg transition-all duration-200 hover:translate-x-1">
                      P1
                    </Link>
                    <Link href="/olevel/p2" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#f7991B]/5 hover:text-[#f7991B] last:rounded-b-lg transition-all duration-200 hover:translate-x-1">
                      P2
                    </Link>
                  </div>
                )}
              </div>
              
              <div className="relative" ref={addToLinksRef}>
                <button
                  onClick={() => handleDropdownToggle('alevel')}
                  className="text-gray-700 hover:text-[#8457A4] px-3 py-2 text-sm font-medium transition-all duration-300 flex items-center hover:scale-105"
                >
                  A Level
                  <svg className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                    activeDropdown === 'alevel' ? 'rotate-180' : ''
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'alevel' && (
                  <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 animate-slideDown">
                    <Link href="/alevel/as" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#8457A4]/5 hover:text-[#8457A4] first:rounded-t-lg transition-all duration-200 hover:translate-x-1">
                      AS
                    </Link>
                    <Link href="/alevel/a2" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#8457A4]/5 hover:text-[#8457A4] last:rounded-b-lg transition-all duration-200 hover:translate-x-1">
                      A2
                    </Link>
                  </div>
                )}
              </div>
              
              <div className="relative" ref={addToLinksRef}>
                <button
                  onClick={() => handleDropdownToggle('intermediate')}
                  className="text-gray-700 hover:text-[#f7991B] px-3 py-2 text-sm font-medium transition-all duration-300 flex items-center hover:scale-105"
                >
                  Intermediate
                  <svg className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                    activeDropdown === 'intermediate' ? 'rotate-180' : ''
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'intermediate' && (
                  <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 animate-slideDown">
                    <Link href="/intermediate/xi" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#f7991B]/5 hover:text-[#f7991B] first:rounded-t-lg transition-all duration-200 hover:translate-x-1">
                      XI
                    </Link>
                    <Link href="/intermediate/xii" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#f7991B]/5 hover:text-[#f7991B] last:rounded-b-lg transition-all duration-200 hover:translate-x-1">
                      XII
                    </Link>
                  </div>
                )}
              </div>
              
              <Link
                ref={addToLinksRef}
                href="/contact"
                className="bg-[#8457A4] hover:bg-[#6d4589] text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 hover:-translate-y-0.5"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}