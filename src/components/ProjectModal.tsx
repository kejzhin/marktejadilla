import React, { useEffect } from 'react';
import { WorkExperienceItem } from '../data/portfolioData';
import { X, CheckCircle2, Building2, Calendar, Briefcase } from 'lucide-react';

interface ProjectModalProps {
  project: WorkExperienceItem;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl text-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-700 hover:text-black transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-600 mb-3">
          <span className="text-black font-extrabold inline-flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-black" />
            {project.company}
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            {project.period}
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1 text-zinc-600 font-medium">
            <Briefcase className="w-3.5 h-3.5" />
            {project.category}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 mb-6">
          {project.role}
        </h3>

        {/* Responsibilities list directly from official CV */}
        <div className="mb-8">
          <h4 className="text-xs uppercase tracking-widest font-mono text-black mb-4 font-black flex items-center gap-2">
            <span>Verified Responsibilities from CV:</span>
          </h4>
          <ul className="space-y-3.5">
            {project.bulletPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-1" />
                <span className="leading-relaxed font-normal">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools and Systems */}
        <div className="mb-8">
          <h4 className="text-xs uppercase tracking-widest font-mono text-zinc-600 mb-3 font-semibold">
            Key Systems & Platforms:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-900 font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex items-center justify-end pt-6 border-t border-zinc-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-black text-white hover:bg-zinc-800 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
