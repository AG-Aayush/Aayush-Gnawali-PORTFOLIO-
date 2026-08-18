"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Skills } from "@/components/sections/Skills";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Social } from "@/components/sections/Social";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { IntroLoader } from "@/components/ui/IntroLoader";
import { FluidCursor } from "@/components/ui/FluidCursor";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && <IntroLoader onComplete={() => setIntroComplete(true)} />}
      {introComplete && <FluidCursor />}
      {introComplete && (
        <>
          <Navbar />
          <main id="main-content">
            <Hero />
            <About />
            <Experience />
            <Achievements />
            <Projects />
            <Skills />
            <Certifications />
            <Social />
            <Contact />
          </main>
          <Footer />
          <ChatWidget />
        </>
      )}
    </>
  );
}
