'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.jpg"
                alt="Saqib Razzak Logo"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="font-semibold text-gray-900 text-lg">Saqib Razzak</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>
              
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('olevel')}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                >
                  O Level
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'olevel' && (
                  <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100">
                    <Link href="/olevel/p1" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg">
                      P1
                    </Link>
                    <Link href="/olevel/p2" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 last:rounded-b-lg">
                      P2
                    </Link>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('alevel')}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                >
                  A Level
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'alevel' && (
                  <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100">
                    <Link href="/alevel/as" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg">
                      AS
                    </Link>
                    <Link href="/alevel/a2" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 last:rounded-b-lg">
                      A2
                    </Link>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('intermediate')}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                >
                  Intermediate
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'intermediate' && (
                  <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100">
                    <Link href="/intermediate/xi" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg">
                      XI
                    </Link>
                    <Link href="/intermediate/xii" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 last:rounded-b-lg">
                      XII
                    </Link>
                  </div>
                )}
              </div>
              
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
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