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
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [introDone, setIntroDone] = useState<boolean>(false);
  const [showResumeModal, setShowResumeModal] = useState<boolean>(false);

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
    <div className="relative min-h-screen bg-white text-zinc-900 selection:bg-black selection:text-white overflow-x-hidden">
      {/* Top Fixed Header with dynamic scroll state */}
      <Navbar
        activeSection={activeSection}
        introDone={introDone}
        onOpenResume={() => setShowResumeModal(true)}
      />

      {/* Main Sections Stack */}
      <main className="w-full">
        {/* Hero Section with takeoff sequence, portrait, and action triggers */}
        <Hero
          onPreloadComplete={() => setIntroDone(true)}
          onOpenResume={() => setShowResumeModal(true)}
        />

        {/* Intro / About Section */}
        <About />

        {/* Services & Capabilities Section */}
        <Services />

        {/* Work Experience Section */}
        <Projects />

        {/* Credentials, Education & References Section */}
        <Credentials />

        {/* Direct Contact Channels */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Secure Resume Preview & Download Modal */}
      {showResumeModal && (
        <ResumeModal onClose={() => setShowResumeModal(false)} />
      )}
    </div>
  );
}
