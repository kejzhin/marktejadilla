import React, { useEffect } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { X, CheckCircle2, Building2, Calendar, Sparkles, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem;
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d0d0d] border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 text-xs font-mono text-gray-400 mb-3">
          <span className="text-[var(--accent)] font-semibold inline-flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            {project.company}
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {project.period}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2">
          {project.role}
        </h3>
        <p className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-wider mb-6">
          {project.title} {project.accentWord} — {project.subtitle}
        </p>

        {/* Narrative Description */}
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
          {project.description}
        </p>

        {/* Responsibilities list from CV */}
        <div className="mb-8">
          <h4 className="text-xs uppercase tracking-widest font-mono text-gray-400 mb-4 font-semibold">
            Key Responsibilities & Contributions (from CV):
          </h4>
          <ul className="space-y-3">
            {project.bulletPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-1" />
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Metrics Grid */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-8">
            {project.metrics.map((m, i) => (
              <div key={i} className="text-center">
                <div className="text-lg sm:text-xl font-black font-mono text-white">
                  {m.value}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tools and Systems */}
        <div className="mb-8">
          <h4 className="text-xs uppercase tracking-widest font-mono text-gray-400 mb-3 font-semibold">
            Tools & Platforms Handled:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10 flex-wrap gap-4">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Close Window
          </button>
          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--accent)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--accent-hover)] transition-all cursor-pointer"
          >
            <span>Inquire About This Role</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
