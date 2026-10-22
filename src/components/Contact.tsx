import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight, MessageSquare, Download, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappUrl = `https://wa.me/${portfolioData.profile.whatsapp}?text=Hi%20Mark%20Aldrin%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect.`;

  return (
    <section
      id="contact"
      className="relative min-h-screen text-white font-sans flex flex-col justify-center overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 px-6 md:px-12 lg:px-16"
      style={{
        background: 'radial-gradient(circle at 50% 90%, #1a1a1a 0%, #0d0d0d 50%, #050505 90%)'
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto flex-1 flex items-center">
        <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">
          
          {/* Left Column: Direct Call to Action */}
          <div className="w-full lg:w-6/12 flex flex-col items-start">
            {/* Availability Status Badge (NO VERIFIED LABEL) */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md px-4 py-1.5 text-[11px] uppercase tracking-[0.26em] text-gray-300 font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-halo" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span>Available for work</span>
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter drop-shadow-2xl mb-6 leading-[0.95] uppercase">
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600">
                  Get in touch
                </span>
              </span>
            </h2>

            {/* Lead Narrative */}
            <p className="text-gray-300 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-xl mb-10">
              Open for full-time virtual assistant positions, CRM data management contracts, YouTube release scheduling, Canva video editing, and operational roles. Direct messages on WhatsApp or Email receive rapid response.
            </p>

            {/* Direct Action Buttons Strip */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3.5 rounded-full bg-[var(--accent)] text-black text-sm font-bold inline-flex items-center gap-2.5 shadow-lg shadow-black/30 hover:bg-[var(--accent-hover)] transition-all cursor-pointer"
              >
                <span>Message on WhatsApp</span>
                <MessageSquare className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </a>

              {/* Email Direct Button */}
              <a
                href={`mailto:${portfolioData.profile.email}`}
                className="group px-6 py-3.5 rounded-full border border-white/20 text-white text-sm font-medium inline-flex items-center gap-2.5 backdrop-blur-md hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer"
              >
                <span>Send an Email</span>
                <Mail className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>

              {/* Download CV PDF */}
              <a
                href={portfolioData.profile.cvDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full border border-white/10 bg-white/[0.04] text-gray-300 hover:text-white hover:border-white/30 text-sm font-medium inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Frosted Glass Contact Details Card */}
          <div className="w-full lg:w-5/12 flex items-center">
            <div className="w-full rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_24px_70px_-20px_rgba(0,0,0,0.8)] overflow-hidden divide-y divide-white/[0.08]">
              
              {/* Row 1: Email with 1-Click Copy */}
              <div className="p-6 sm:p-7 flex items-center justify-between gap-4 group hover:bg-white/[0.02] transition-colors">
                <div className="min-w-0">
                  <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${portfolioData.profile.email}`}
                    className="text-base sm:text-lg font-bold text-white hover:text-[var(--accent)] transition-colors break-all leading-snug"
                  >
                    {portfolioData.profile.email}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="shrink-0 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-gray-200 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Row 2: Phone Number */}
              <div className="p-6 sm:p-7 flex items-center justify-between gap-4 group hover:bg-white/[0.02] transition-colors">
                <div className="min-w-0">
                  <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                    Phone / Mobile
                  </span>
                  <a
                    href={`tel:${portfolioData.profile.phoneClean}`}
                    className="text-base sm:text-lg font-bold text-white hover:text-[var(--accent)] transition-colors font-mono"
                  >
                    {portfolioData.profile.phone}
                  </a>
                </div>

                <a
                  href={`tel:${portfolioData.profile.phoneClean}`}
                  className="shrink-0 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
                  aria-label="Call phone"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              {/* Row 3: Location */}
              <div className="p-6 sm:p-7 flex items-center justify-between gap-4 group hover:bg-white/[0.02] transition-colors">
                <div className="min-w-0">
                  <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                    Location & Base
                  </span>
                  <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed">
                    {portfolioData.profile.location}
                  </p>
                </div>
                <div className="shrink-0 p-2.5 rounded-xl bg-white/10 text-gray-300">
                  <MapPin className="w-4 h-4 text-[var(--accent)]" />
                </div>
              </div>

              {/* Row 4: Working Hours & Timezone */}
              <div className="p-6 sm:p-7 flex items-center justify-between gap-4 group hover:bg-white/[0.02] transition-colors">
                <div className="min-w-0">
                  <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                    Working Hours
                  </span>
                  <p className="text-sm sm:text-base text-gray-200 font-medium">
                    PHT (UTC+8) · Flexible for Global Time Zones
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Experienced working with US, Australian & Asian client schedules
                  </p>
                </div>
                <div className="shrink-0 p-2.5 rounded-xl bg-white/10 text-gray-300">
                  <Clock className="w-4 h-4 text-[var(--accent)]" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
