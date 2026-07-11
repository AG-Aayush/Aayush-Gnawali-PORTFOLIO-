# Aayush Gnawali — Professional Portfolio & Project Showcase

A modern, highly optimized personal portfolio web application built using **Next.js 15**, **React**, and **Tailwind CSS**. This repository serves as a centralized hub to showcase my software engineering journey, technical projects, devops configurations, and academic milestones[cite: 1].

Live Deployment: [aayush-gnawali-portfolio.vercel.app](https://aayush-gnawali-portfolio.vercel.app)[cite: 1]
Custom Domain (Pending Verification): [aayushgnawali.com.np](http://aayushgnawali.com.np)[cite: 1]

---

## Technical Stack & Architecture

- **Core Framework:** Next.js (App Router pipeline)[cite: 1]
- **Component Architecture:** React server components with hydration guards for secure theme switches[cite: 1]
- **Styling Engine:** Tailwind CSS with explicit custom color mappings and translucent backdrop blurs[cite: 1]
- **Styling Fonts:** Integrated Ubuntu typography across all viewports[cite: 1]
- **Deployment & Hosting:** Vercel Global Edge Network with custom directory configuration (`./portfolio`)[cite: 1]

---

##  Core Features & Visual Language

### 1. Unified Responsive UX Architecture
- **Adaptive Dark / Light Mechanics:**
  - **Light Mode (Default):** Soft slate-white (`#f0f4f8`) to cool pastel sky blue (`#abcbee`) background gradients, paired with dark charcoal slate text lines for highly readable contrast[cite: 1].
  - **Dark Mode:** Deep midnight-purple (`#211625`) to near-black indigo (`#0d0b14`) background gradients, paired with soft lavender-gray elements[cite: 1].
- **Hydration Protections:** Safe useEffect guards preventing layout colors flashing during initial client-side mounting[cite: 1].

### 2. High-Fidelity Design Interactions
- **Micro-interactive Avatar Container:** Profile picture engine featuring an infinite CSS revolving ambient gradient border loop, responsive dimensions, and smooth scaling transitions upon hover actions[cite: 1].
- **Animated Status Pill:** Typing script loop outputting key focus disciplines: *Exploring Tech • Building Systems • Automating Workflows*[cite: 1].
- **Vertically Stacked Project Matrices:** Modernized full-width rows splitting content layout between a technical summary block (left) and a clean desktop web browser frame containing application snapshots (right).
- **Deep-Dive Accordions:** Integrated grid views expanding details cleanly into three distinct assessment columns: *Project Summary*, *The Challenge*, and *What I Learned*[cite: 1].

### 3. Comprehensive Navigation & Secure Links
- **Reverse Tabnabbing Mitigation:** Hardened external anchor links using explicit `target="_blank" rel="noopener noreferrer"` parameters across all third-party handles[cite: 1].
- **Unified Contact Banners:** Completely refactored interactive grid composed of elegant, non-duplicated action pill components with zero raw URL text exposed[cite: 1].

---

##  Repository Directory Breakdown

```text
AAYUSH-PORTFOLIO/             # Main Workspace Root
└── portfolio/                # Sub-directory Targeted for Deployment Build Execution
    ├── src/
    │   ├── app/              # Next.js App Router Pages and Layout Files
    │   ├── components/       # Reusable Global UI Elements (Cards, Form, Theme Toggles)
    │   └── data/             # Centralized Mock Arrays (Timeline History, Project Records)
    ├── public/               # Asset Bundles (Profile Avatars, Vector Icons, Resumes)
    ├── next.config.ts        # Framework Setup Routing System
    ├── tailwind.config.ts    # Extended Custom Theming Palettes
    └── package.json          # Node Dependencies Configuration
```[cite: 1]

---

## Local Operations & Execution Guide

### 1. Prerequisites
Ensure you have the latest LTS version of **Node.js** and **npm** installed on your workstation[cite: 1].

### 2. Clone Workspace and Install Dependencies
Navigate into your targeted project folder path and run:
```bash
git clone [https://github.com/AG-Aayush/Aayush-Gnawali-PORTFOLIO-.git](https://github.com/AG-Aayush/Aayush-Gnawali-PORTFOLIO-.git)
cd "Aayush-Gnawali-PORTFOLIO-/portfolio"
npm install
