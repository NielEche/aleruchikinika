"use client"; // Import necessary hooks and libraries
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import logoImage from '../../assets/aktext.png'; 

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // State for toggling the mobile menu
  const router = useRouter(); // Get the router instance

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu
  };

  const closeMenu = () => {
    setIsOpen(false); // Close the menu
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent p-0">
      <nav className="flex items-center justify-between p-4 lg:px-2">
        <ul className="hidden lg:flex space-x-8 w-full">
          <li>
            <Link href="/about" className={router.pathname === '/about' ? 'active' : ''}>ABOUT</Link>
          </li>
          <li>
            <Link href="/projects" className={router.pathname === '/projects' ? 'active' : ''}>PROJECTS</Link>
          </li>
          <li className='headLogo'>
            <Link href="/">
              <Image src={logoImage} alt="Home" width={80} height={80} />
            </Link>
          </li>
          <li>
            <Link href="/clients" className={router.pathname === '/clients' ? 'active' : ''}>CLIENTS</Link>
          </li>
          <li>
            <Link href="/contact" className={router.pathname === '/contact' ? 'active' : ''}>CONTACT</Link>
          </li>
        </ul>

        {/* Hamburger Menu Icon for Small Screens */}
        <div className="block lg:hidden">
          <Link href="/" onClick={closeMenu}>
            <Image src={logoImage} alt="Home" width={120} height={120} />
          </Link>
        </div>
                
        <button
          className="block lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </nav>

      {/* Overlay Menu for Mobile */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 transition-opacity duration-300 ease-in-out">
          <div className="flex flex-col items-center text-center justify-between mt-32 h-full text-white">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-4xl"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              &times; {/* Close icon */}
            </button>
            <ul className="space-y-12">
              <li>
                <Link href="/" onClick={closeMenu} className={router.pathname === '/' ? 'active' : ''}>HOME</Link>
              </li>
              <li>
                <Link href="/about" onClick={closeMenu} className={router.pathname === '/about' ? 'active' : ''}>ABOUT</Link>
              </li>
              <li>
                <Link href="/projects" onClick={closeMenu} className={router.pathname === '/projects' ? 'active' : ''}>PROJECTS</Link>
              </li>
              <li>
                <Link href="/clients" onClick={closeMenu} className={router.pathname === '/clients' ? 'active' : ''}>CLIENTS</Link>
              </li>
              <li>
                <Link href="/contact" onClick={closeMenu} className={router.pathname === '/contact' ? 'active' : ''}>CONTACT</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
