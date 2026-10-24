import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';
import { LinkedInIcon } from './LinkedInIcon';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-zinc-950 text-zinc-400 border-t border-zinc-900 py-12 md:py-16 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-zinc-800">
        
        {/* Brand Lockup */}
        <div className="flex flex-col">
          <a
            href="#home"
            className="text-white font-black text-xl md:text-2xl tracking-widest uppercase hover:text-zinc-300 transition-colors"
          >
            {portfolioData.profile.fullName}
          </a>
          <p className="text-xs sm:text-sm text-zinc-400 font-normal mt-1">
            {portfolioData.profile.role.bold} {portfolioData.profile.role.light} · {portfolioData.profile.shortLocation}
          </p>
        </div>

        {/* Links Navigation */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono uppercase tracking-wider font-semibold">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#service" className="hover:text-white transition-colors">Service</a>
          <a href="#project" className="hover:text-white transition-colors">Experience</a>
          <a href="#credentials" className="hover:text-white transition-colors">Credentials</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          <a
            href={portfolioData.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#0A66C2] hover:text-white transition-colors"
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Back to Top Button */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-black hover:bg-white hover:border-white transition-all cursor-pointer"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Copyright Notice */}
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono text-zinc-500 font-medium">
        <p>© 2026 {portfolioData.profile.fullName}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a
            href={portfolioData.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
            <span>LinkedIn Profile</span>
          </a>
          <span>·</span>
          <span>Aviation Flying Graduate & Data Operations</span>
        </div>
      </div>
    </footer>
  );
};
