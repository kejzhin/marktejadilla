import React, { useEffect, useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { X, Download, FileText, ChevronRight, ChevronLeft } from 'lucide-react';
import { LinkedInIcon } from './LinkedInIcon';

interface ResumeModalProps {
  onClose: () => void;
}

const RESUME_PAGES = [
  { pageNumber: 1, src: '/assets/image/resume-page-1.png', title: 'Curriculum Vitae — Page 1' },
  { pageNumber: 2, src: '/assets/image/resume-page-2.png', title: 'Curriculum Vitae — Page 2' },
];

export const ResumeModal: React.FC<ResumeModalProps> = ({ onClose }) => {
  const [activePage, setActivePage] = useState<number>(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActivePage((p) => Math.min(2, p + 1));
      if (e.key === 'ArrowLeft') setActivePage((p) => Math.max(1, p - 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[95vh] flex flex-col bg-white border border-zinc-200 rounded-2xl sm:rounded-3xl shadow-2xl text-zinc-900 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header with Single Download Button */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-zinc-200 bg-white z-10 shrink-0 gap-2">
          <div className="flex items-center gap-2.5 min-w-0 pr-1">
            <span className="p-1.5 sm:p-2 rounded-xl bg-zinc-100 text-black shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-base md:text-lg font-black uppercase tracking-tight text-zinc-900 truncate">
                {portfolioData.profile.fullName}
              </h3>
              <p className="text-[10px] sm:text-xs text-zinc-500 font-mono truncate">
                Curriculum Vitae (2 Pages)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Single Download PDF Button */}
            <a
              href="/assets/image/resume.pdf"
              download="Mark_Aldrin_Tejadilla_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-black text-white hover:bg-zinc-800 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              aria-label="Close dialog"
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-700 hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Page Switcher Toolbar */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2 bg-zinc-50 border-b border-zinc-200 text-xs font-mono shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActivePage(1)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                activePage === 1
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-zinc-700 hover:text-black border border-zinc-200'
              }`}
            >
              Page 1
            </button>
            <button
              type="button"
              onClick={() => setActivePage(2)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                activePage === 2
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-zinc-700 hover:text-black border border-zinc-200'
              }`}
            >
              Page 2
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActivePage((p) => Math.max(1, p - 1))}
              disabled={activePage === 1}
              aria-label="Previous page"
              className="p-1 rounded-md text-zinc-600 hover:text-black disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-zinc-900 px-1 text-xs">{activePage} / 2</span>
            <button
              type="button"
              onClick={() => setActivePage((p) => Math.min(2, p + 1))}
              disabled={activePage === 2}
              aria-label="Next page"
              className="p-1 rounded-md text-zinc-600 hover:text-black disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Canvas (Renders CV image with 100% fidelity on every phone and screen) */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-zinc-100 flex flex-col items-center">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-zinc-200/80 overflow-hidden">
            <img
              src={RESUME_PAGES[activePage - 1].src}
              alt={RESUME_PAGES[activePage - 1].title}
              className="w-full h-auto object-contain block select-none"
              loading="eager"
            />
          </div>

          {/* Page Navigation at bottom */}
          <div className="mt-4 flex items-center justify-center">
            {activePage === 1 ? (
              <button
                type="button"
                onClick={() => setActivePage(2)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-zinc-50 border border-zinc-300 text-xs font-mono font-bold text-zinc-900 shadow-xs transition-all cursor-pointer"
              >
                <span>View Page 2</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActivePage(1)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-zinc-50 border border-zinc-300 text-xs font-mono font-bold text-zinc-900 shadow-xs transition-all cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back to Page 1</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-t border-zinc-200 bg-white shrink-0">
          <a
            href={portfolioData.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0A66C2] hover:underline"
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
            <span>Connect on LinkedIn</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-zinc-900 text-white hover:bg-black text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
