"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Moon, SunMedium, SunMediumIcon, MoonIcon } from "lucide-react";
import { personal } from "@/data/resume";
import { useTheme } from "@/components/layout/ThemeProvider";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [activeId, setActiveId] = useState<string>("about");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8"
      >
        <a
          href="#home"
          className="font-mono-tag text-sm font-medium text-[var(--color-text-primary)]"
        >
          aayush<span className="text-[var(--color-accent-bright)]">.</span>gnawali
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                className={cn(
                  "relative block px-3 py-2 text-sm transition-colors duration-200",
                  activeId === item.id
                    ? "text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {item.label}
                {activeId === item.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-3 -bottom-[1px] h-[1.5px] bg-[var(--color-accent-bright)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg)] text-[var(--color-text-secondary)] transition duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <SunMedium size={16} /> : <Moon size={16} />}
          </button>
          <a
            href={personal.resumeFile}
            download
            className="font-mono-tag inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border-strong)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent-dim)] hover:text-[var(--color-text-primary)]"
          >
            <Download size={13} aria-hidden="true" />
            Resume
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 text-[var(--color-text-primary)] md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)] md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block py-3 text-sm",
                      activeId === item.id
                        ? "text-[var(--color-text-primary)]"
                        : "text-[var(--color-text-secondary)]"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
                    <li className="pt-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="font-mono-tag inline-flex items-center gap-2 rounded-md border border-[var(--color-border-strong)] px-3 py-2 text-xs text-[var(--color-text-secondary)] transition duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
                >
                  {theme === "light" ? <SunMedium size={14} /> : <Moon size={14} />}
                  {theme === "light" ? "Dark mode" : "Light mode"}
                </button>
              </li>
              <li className="pt-2">
                <a
                  href={personal.resumeFile}
                  download
                  className="font-mono-tag inline-flex items-center gap-1.5 text-xs text-[var(--color-accent-bright)]"
                >
                  <Download size={13} aria-hidden="true" />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
