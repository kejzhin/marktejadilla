import React, { useState } from 'react';
import { portfolioData, ServiceItem } from '../data/portfolioData';
import { ArrowUpRight, CheckCircle2, ChevronDown } from 'lucide-react';

interface ServicesProps {
  onSelectService?: (service: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeId, setActiveId] = useState<string | null>('01');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="service"
      className="bg-[#050505] text-white pt-16 md:pt-24 pb-0 px-6 md:px-12 lg:px-16 flex flex-col relative overflow-hidden"
    >
      {/* Section Header: Aligned Right */}
      <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row items-end justify-end pb-10 md:pb-14">
        <div className="text-right">
          <span className="text-[11px] md:text-xs uppercase tracking-[0.32em] text-gray-400 font-mono font-medium block mb-3">
            Expertise & Capabilities
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter drop-shadow-2xl leading-[1.05] md:leading-[0.9] uppercase text-right">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800">
                WHAT WE
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800">
                CAN DO
              </span>
            </span>
          </h2>
        </div>
      </div>

      {/* Interactive Service Rows */}
      <div className="relative mt-0 -mx-6 md:-mx-12 lg:-mx-16 border-t border-white/20">
        {portfolioData.services.map((item) => {
          const isExpanded = activeId === item.id;
          const isHovered = hoveredId === item.id;
          const isLit = isExpanded || isHovered;

          return (
            <div
              key={item.id}
              data-service-row="true"
              className={`service-row relative py-6 md:py-8 px-6 md:px-12 lg:px-16 cursor-pointer transition-colors duration-400 ease-out select-none ${
                isLit ? 'bg-[var(--surface-lit)] text-[var(--surface-lit-ink)]' : 'text-white hover:bg-white/[0.03]'
              }`}
              onClick={() => toggleRow(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-4">
                
                {/* Left Side: ID + Title + Accordion Content */}
                <div className="flex items-start justify-between w-full lg:w-7/12 gap-4">
                  <div className="flex items-start gap-4 sm:gap-8 md:gap-14 w-full min-w-0">
                    {/* Numerical ID */}
                    <div className="h-8 md:h-10 flex items-center shrink-0">
                      <span
                        className={`text-xl sm:text-2xl md:text-3xl font-mono font-bold leading-none transition-colors duration-300 ${
                          isLit ? 'text-[var(--surface-lit-ink)]' : 'text-gray-400'
                        }`}
                      >
                        {item.id}
                      </span>
                    </div>

                    {/* Service Title & Expandable Capabilities */}
                    <div className="flex flex-col w-full min-w-0">
                      <div className="min-h-8 md:min-h-10 flex items-center justify-between gap-2">
                        <h3
                          className={`text-xs sm:text-base md:text-xl lg:text-2xl font-black uppercase tracking-wider leading-snug transition-colors duration-300 ${
                            isLit ? 'text-[var(--surface-lit-ink)]' : 'text-white'
                          }`}
                        >
                          {item.title}
                        </h3>
                        <ChevronDown
                          className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 lg:hidden ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>

                      {/* Expandable Accordion Body */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out w-full ${
                          isExpanded ? 'max-h-[600px] opacity-100 pt-6' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p
                          className={`text-sm md:text-base leading-relaxed mb-5 font-light ${
                            isLit ? 'text-[var(--surface-lit-ink-soft)]' : 'text-gray-300'
                          }`}
                        >
                          {item.description}
                        </p>

                        <div className="space-y-2.5">
                          <span
                            className={`text-[11px] font-mono uppercase tracking-widest font-semibold block ${
                              isLit ? 'text-[var(--surface-lit-ink)]' : 'text-gray-400'
                            }`}
                          >
                            Key Deliverables:
                          </span>
                          <ul className="space-y-2">
                            {item.capabilities.map((cap, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm leading-snug">
                                <CheckCircle2
                                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                                    isLit ? 'text-black' : 'text-[var(--accent)]'
                                  }`}
                                />
                                <span className={isLit ? 'text-[var(--surface-lit-ink)]' : 'text-gray-200'}>
                                  {cap}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Tagline summary & Action Button */}
                <div className="w-full lg:w-4/12 flex flex-col lg:items-end justify-between pt-2 lg:pt-0 gap-4">
                  <p
                    className={`text-xs sm:text-sm font-light leading-relaxed max-w-sm ${
                      isLit ? 'text-[var(--surface-lit-ink-soft)]' : 'text-gray-400'
                    }`}
                  >
                    {item.tagline}
                  </p>

                  <div className="flex items-center gap-3">
                    <a
                      href="#project"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectService) onSelectService(item);
                      }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                        isLit
                          ? 'bg-black text-white hover:bg-neutral-800'
                          : 'bg-white/10 text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      <span>{item.buttonText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
