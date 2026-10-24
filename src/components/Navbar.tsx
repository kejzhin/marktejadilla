import React, { useState, useEffect, useCallback } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Download, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  introDone?: boolean;
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Service', href: '#service' },
  { label: 'Experience', href: '#project' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' }
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, introDone = true }) => {
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
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 py-4 md:px-12 md:py-5">
          {/* Brand Wordmark */}
          <a
            href="#home"
            aria-label={portfolioData.profile.fullName}
            onClick={closeMenu}
            className="group relative z-50 text-white font-black text-lg md:text-xl tracking-widest uppercase leading-none rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <span className="inline-block transition-colors duration-300 group-hover:text-[var(--accent)]">
              {portfolioData.profile.firstName}
              <span className="hidden md:inline-block overflow-hidden align-bottom">
                <span className="inline-block translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 text-gray-400 font-light">
                  &nbsp;{portfolioData.profile.lastName}
                </span>
              </span>
            </span>
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((item) => {
              const secId = item.href.replace('#', '');
              const isActive = activeSection === secId;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative block py-1 text-xs lg:text-sm uppercase tracking-widest font-medium transition-colors duration-300 outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] ${
                      isActive ? 'text-[var(--accent)] font-semibold' : 'text-gray-300 hover:text-[var(--accent)]'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px w-full bg-[var(--accent)] origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
            className="md:hidden relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer"
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
          className={`h-[2px] w-full origin-left bg-[var(--accent)] transition-opacity duration-300 ${
            scrolled ? 'opacity-80' : 'opacity-0'
          }`}
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </nav>

      {/* Mobile Menu Fullscreen Overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-[#0a0a0a]/98 backdrop-blur-2xl px-6 py-24 transition-[opacity,visibility] duration-500 ease-out md:hidden ${
          menuOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-start gap-6 mt-8">
          <span className="text-[11px] uppercase tracking-[0.3em] text-gray-500">Navigation</span>
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
                      isActive ? 'text-[var(--accent)]' : 'text-white hover:text-[var(--accent)]'
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
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{portfolioData.profile.shortLocation}</span>
            <span>{portfolioData.profile.phone}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={portfolioData.profile.cvDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/20 text-xs font-semibold text-white bg-white/[0.04]"
            >
              <Download className="w-4 h-4" />
              <span>Resume PDF</span>
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[var(--accent)] text-black text-xs font-bold uppercase tracking-wider"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
