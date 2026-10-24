import React, { useState } from 'react';
import { portfolioData, ServiceItem } from '../data/portfolioData';
import { CheckCircle2, ChevronDown } from 'lucide-react';

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
      className="relative text-zinc-900 pt-16 md:pt-24 pb-0 px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f5f5f9_40%,#ebebf3_80%,#ffffff_100%)]"
    >
      {/* Light Ambient Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,0,0,0.02)_0%,transparent_80%)] pointer-events-none z-0" />
      
      {/* Section Header: Left on Mobile, Right on Desktop */}
      <div className="max-w-[1600px] mx-auto w-full flex flex-col items-start md:items-end justify-start md:justify-end pb-8 md:pb-14">
        <div className="text-left md:text-right">
          <span className="text-[11px] md:text-xs uppercase tracking-[0.32em] text-zinc-500 font-mono font-bold block mb-2">
            Capabilities & Focus Areas
          </span>
          <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-black via-zinc-900 to-zinc-700 leading-none uppercase">
            Services
          </h2>
        </div>
      </div>

      {/* Accordion List */}
      <div className="w-full flex flex-col">
        {portfolioData.services.map((item) => {
          const isExpanded = activeId === item.id;
          const isHovered = hoveredId === item.id;
          const isLit = isExpanded || isHovered;

          return (
            <div
              key={item.id}
              data-service-row="true"
              className={`service-row relative py-5 sm:py-6 md:py-8 px-4 sm:px-6 md:px-12 lg:px-16 cursor-pointer transition-colors duration-400 ease-out select-none ${
                isLit ? 'bg-black text-white' : 'text-zinc-900 hover:bg-zinc-100'
              }`}
              onClick={() => toggleRow(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-3 sm:gap-4">
                
                {/* Left Side: Dot Indicator + Title + Accordion Content */}
                <div className="flex items-start justify-between w-full lg:w-7/12 gap-3 sm:gap-4">
                  <div className="flex items-start gap-3 sm:gap-5 md:gap-10 w-full min-w-0">
                    {/* Circle / Dot Shape Indicator */}
                    <div className="h-7 sm:h-8 md:h-10 flex items-center shrink-0 pt-0.5 sm:pt-0">
                      <span
                        className={`relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border transition-all duration-300 ${
                          isLit
                            ? 'border-white bg-white/20'
                            : 'border-zinc-300 bg-zinc-100'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                            isLit ? 'bg-white scale-110' : 'bg-black'
                          }`}
                        />
                      </span>
                    </div>

                    {/* Service Title & Expandable Capabilities */}
                    <div className="flex flex-col w-full min-w-0">
                      <div className="min-h-7 sm:min-h-8 md:min-h-10 flex items-center justify-between gap-3 w-full">
                        <h3
                          className={`text-sm sm:text-base md:text-xl lg:text-2xl font-black uppercase tracking-wider leading-snug transition-colors duration-300 ${
                            isLit ? 'text-white' : 'text-zinc-900'
                          }`}
                        >
                          {item.title}
                        </h3>
                        <ChevronDown
                          className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ml-auto transition-transform duration-300 lg:hidden ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>

                      {/* Expandable Accordion Body */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out w-full ${
                          isExpanded ? 'max-h-[600px] opacity-100 pt-4 sm:pt-6' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p
                          className={`text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-5 font-normal ${
                            isLit ? 'text-zinc-300' : 'text-zinc-700'
                          }`}
                        >
                          {item.description}
                        </p>

                        <div className="space-y-2.5">
                          <span
                            className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold block ${
                              isLit ? 'text-white' : 'text-zinc-900'
                            }`}
                          >
                            Key Deliverables:
                          </span>
                          <ul className="space-y-2">
                            {item.capabilities.map((cap, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm leading-snug">
                                <CheckCircle2
                                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 mt-0.5 ${
                                    isLit ? 'text-white' : 'text-black'
                                  }`}
                                />
                                <span className={isLit ? 'text-zinc-200' : 'text-zinc-800'}>
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

                {/* Right Side: Tagline summary */}
                <div className="w-full lg:w-4/12 flex flex-col lg:items-end justify-between pt-1 sm:pt-2 lg:pt-0 gap-3 sm:gap-4 pl-8 sm:pl-11 lg:pl-0">
                  <p
                    className={`text-xs sm:text-sm font-normal leading-relaxed max-w-sm ${
                      isLit ? 'text-zinc-300' : 'text-zinc-600'
                    }`}
                  >
                    {item.tagline}
                  </p>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
