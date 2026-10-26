import React, { useState, useEffect, useCallback } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Download, ArrowUpRight } from 'lucide-react';
import { LinkedInIcon } from './LinkedInIcon';

interface NavbarProps {
  activeSection: string;
  introDone?: boolean;
  onOpenResume?: () => void;
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Service', href: '#service' },
  { label: 'Experience', href: '#project' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' }
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, introDone = true, onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(currentScroll > 24);
      setScrollProgress(maxScroll > 0 ? Math.min(currentScroll / maxScroll, 1) : 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  // Handle escape key
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 w-full z-50 transition-[transform,opacity,background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          introDone ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${
          menuOpen || scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-zinc-200/80 shadow-md shadow-zinc-900/5'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-center px-6 py-4 md:px-12 md:py-5 relative">
          {/* Desktop Centered Nav Links */}
          <ul className="hidden md:flex items-center justify-center gap-8 lg:gap-11">
            {navLinks.map((item) => {
              const secId = item.href.replace('#', '');
              const isActive = activeSection === secId;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative block py-1 text-xs lg:text-sm uppercase tracking-widest font-medium transition-colors duration-300 outline-none focus-visible:ring-1 focus-visible:ring-black ${
                      isActive ? 'text-black font-extrabold' : 'text-zinc-600 hover:text-black font-semibold'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-0.5 w-full bg-black origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden relative z-50 ml-auto flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-sm text-zinc-900 outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
          >
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? 'translate-y-[4px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? '-translate-y-[4px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <div
          aria-hidden="true"
          className={`h-[2px] w-full origin-left bg-black transition-opacity duration-300 ${
            scrolled ? 'opacity-90' : 'opacity-0'
          }`}
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </nav>

      {/* Mobile Menu Fullscreen Overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-white/98 text-zinc-900 backdrop-blur-2xl px-6 py-24 transition-[opacity,visibility] duration-500 ease-out md:hidden ${
          menuOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-start gap-6 mt-8">
          <span className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 font-semibold">Navigation</span>
          <ul className="flex flex-col gap-5 w-full">
            {navLinks.map((item, idx) => {
              const secId = item.href.replace('#', '');
              const isActive = activeSection === secId;
              return (
                <li
                  key={item.label}
                  className={`transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{ transitionDelay: menuOpen ? `${100 + idx * 50}ms` : '0ms' }}
                >
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className={`block text-3xl font-black uppercase tracking-wider transition-colors duration-300 outline-none ${
                      isActive ? 'text-black font-black' : 'text-zinc-600 hover:text-black'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile Menu Footer Actions */}
        <div className="flex flex-col gap-4 border-t border-zinc-200 pt-6">
          <div className="flex items-center justify-between text-xs text-zinc-600 font-mono">
            <span>{portfolioData.profile.shortLocation}</span>
            <span>{portfolioData.profile.phone}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                onOpenResume?.();
                closeMenu();
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-zinc-300 text-xs font-bold text-zinc-900 bg-zinc-100 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Resume PDF</span>
            </button>
            <a
              href="#contact"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-wider"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <a
            href={portfolioData.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#0A66C2]/40 bg-[#0A66C2]/10 text-[#0A66C2] text-xs font-bold uppercase tracking-wider"
          >
            <LinkedInIcon className="w-4 h-4" />
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </div>
    </>
  );
};
