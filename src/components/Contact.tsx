import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, Phone, MapPin, Copy, Check, MessageSquare, Clock } from 'lucide-react';

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
      className="relative min-h-screen text-zinc-900 font-sans flex flex-col justify-center overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 px-6 md:px-12 lg:px-16 bg-[radial-gradient(ellipse_at_50%_80%,#ffffff_0%,#f5f5f8_45%,#ebebf3_85%)]"
    >
      {/* Light Ambient Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_80%)] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto flex-1 flex items-center">
        <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">
          
          {/* Left Column: Headline & Primary Actions */}
          <div className="w-full lg:w-7/12 flex flex-col items-start text-left">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.32em] text-zinc-500 font-mono font-bold block mb-3">
              Direct Contact & Inquiry
            </span>

            <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter uppercase leading-[0.92] text-zinc-900 mb-6">
              Let&apos;s build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-black via-zinc-900 to-zinc-700 font-serif italic lowercase font-light">
                accuracy together.
              </span>
            </h2>

            <p className="text-zinc-700 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl mb-8">
              Available for Data Entry, Virtual Assistant, YouTube Scheduling, and Operations roles. Reach out directly via WhatsApp, email, or direct telephone call.
            </p>

            {/* Quick Channel Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3.5 rounded-full bg-black text-white text-sm font-bold inline-flex items-center gap-2.5 shadow-md hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <span>Message on WhatsApp</span>
                <MessageSquare className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              </a>

              {/* Email Direct Button */}
              <a
                href={`mailto:${portfolioData.profile.email}`}
                className="group px-6 py-3.5 rounded-full border border-zinc-300 bg-white text-zinc-900 text-sm font-bold inline-flex items-center gap-2.5 hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer shadow-xs"
              >
                <span>Send an Email</span>
                <Mail className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Frosted Glass Contact Details Card */}
          <div className="w-full lg:w-5/12 flex items-center">
            <div className="w-full rounded-3xl border border-zinc-200/90 bg-white shadow-xl shadow-zinc-900/5 overflow-hidden divide-y divide-zinc-200">
              
              {/* Email Block */}
              <div className="p-6 sm:p-7 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block mb-1">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${portfolioData.profile.email}`}
                    className="text-sm sm:text-base font-bold text-zinc-900 hover:text-black truncate block"
                  >
                    {portfolioData.profile.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-xs font-mono font-bold text-zinc-800 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-black" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-600" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone / WhatsApp Block */}
              <div className="p-6 sm:p-7 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block mb-1">
                    Direct Phone / Mobile
                  </span>
                  <a
                    href={`tel:${portfolioData.profile.phoneClean}`}
                    className="text-sm sm:text-base font-bold text-zinc-900 hover:text-black block"
                  >
                    {portfolioData.profile.phone}
                  </a>
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-black" />
                </div>
              </div>

              {/* Location Block */}
              <div className="p-6 sm:p-7 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block mb-1">
                    Location & Time Zone
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug">
                    {portfolioData.profile.shortLocation}
                  </p>
                  <span className="text-[11px] font-mono text-zinc-500 block mt-0.5 font-medium">
                    GMT+8 (Manila Standard Time)
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-black" />
                </div>
              </div>

              {/* Response SLA Notice */}
              <div className="p-5 sm:p-6 bg-zinc-50 flex items-center gap-3 text-xs text-zinc-700 font-medium">
                <Clock className="w-4 h-4 text-black shrink-0" />
                <span>Typical response time: Within 2–4 hours during business hours.</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
