import { personal } from "@/data/resume";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-[var(--color-text-tertiary)] sm:flex-row lg:px-8">
        <p>
          © {new Date().getFullYear()} {personal.name}. Built with Next.js & Tailwind.
        </p>
        <p className="font-mono-tag">designed &amp; built from scratch, kathmandu</p>
      </div>
    </footer>
  );
}
