'use client';

import React, { useState } from 'react';
import { StarfieldCanvas } from '@/components/StarfieldCanvas';
import { SpaceEnvironment } from '@/components/SpaceEnvironment';
import { LostAstronaut } from '@/components/LostAstronaut';
import { OpeningLoader } from '@/components/OpeningLoader';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ScrollRocket } from '@/components/ScrollRocket';

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [shutterOpened, setShutterOpened] = useState(false);

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Astronaut Airlock Opening Animation */}
      {!loaderComplete && (
        <OpeningLoader
          onShutterOpen={() => setShutterOpened(true)}
          onComplete={() => setLoaderComplete(true)}
        />
      )}

      {/* Background Space Environment & Starfield - Revealed when shutter opens */}
      {shutterOpened && (
        <>
          <StarfieldCanvas />
          <SpaceEnvironment />
          {/* Lost Astronaut Background Easter Egg */}
          <LostAstronaut />
        </>
      )}

      {/* Main Portfolio Architecture - Fades/slides into view upon shutter opening */}
      <div
        className={`relative z-10 flex flex-col min-h-screen transition-opacity duration-700 ${
          shutterOpened ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Navbar />
        <ScrollRocket />
        <Hero isRevealed={shutterOpened} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
