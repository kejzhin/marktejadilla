import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp, Download } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#030303] text-gray-400 border-t border-white/10 py-12 md:py-16 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
        
        {/* Brand Lockup */}
        <div className="flex flex-col">
          <a
            href="#home"
            className="text-white font-black text-xl md:text-2xl tracking-widest uppercase hover:text-[var(--accent)] transition-colors"
          >
            {portfolioData.profile.fullName}
          </a>
          <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">
            {portfolioData.profile.role.bold} {portfolioData.profile.role.light} · {portfolioData.profile.shortLocation}
          </p>
        </div>

        {/* Links Navigation */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono uppercase tracking-wider">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#service" className="hover:text-white transition-colors">Service</a>
          <a href="#project" className="hover:text-white transition-colors">Experience</a>
          <a href="#credentials" className="hover:text-white transition-colors">Credentials</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Back to Top Button */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-xs font-mono uppercase tracking-wider text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all cursor-pointer"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Copyright Notice */}
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono text-gray-400">
        <p>© 2026 {portfolioData.profile.fullName}. All rights reserved.</p>
        <p>Aviation Flying Graduate · Airlink International Aviation College</p>
      </div>
    </footer>
  );
};
