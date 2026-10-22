/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Credentials } from './components/Credentials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [introDone, setIntroDone] = useState<boolean>(false);

  // Track active section for the top navbar indicators
  useEffect(() => {
    const sectionIds = ['home', 'about', 'service', 'project', 'credentials', 'contact'];
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f3f3f3] selection:bg-[#e8e4dc] selection:text-[#050505] overflow-x-hidden">
      {/* Top Fixed Header with dynamic scroll state and synchronized reveal */}
      <Navbar activeSection={activeSection} introDone={introDone} />

      {/* Main Sections Stack */}
      <main className="w-full">
        {/* Hero Section with cloned physics ball-drop wordmark loader, scramble transition, portrait and marquee */}
        <Hero onPreloadComplete={() => setIntroDone(true)} />

        {/* About Section with 'Intro' headline, bio narrative, stats, and multi-row stack marquees */}
        <About />

        {/* Services Section with 'WHAT WE CAN DO' right aligned headline and interactive row lighting */}
        <Services />

        {/* Selected Work Section with alternating project showcases */}
        <Projects />

        {/* Credentials, Aviation Seminars, Education & References Carousel */}
        <Credentials />

        {/* Contact / Get In Touch Section (Strictly NO contact form, NO verified label, direct channels) */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
