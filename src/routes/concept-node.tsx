import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { StackPanel, CountUp, makeCascade } from "@/components/site/motion-primitives";

export const Route = createFileRoute("/concept-node")({
  head: () => ({
    meta: [{ title: "Invonics Technologies — Node Concept" }],
  }),
  component: ConceptNodePage,
});

/**
 * Standalone design-system prototype: flat, node-based, industrial-modern.
 * Isolated from the live site's Nav/Hero/Footer and global theme.
 *
 * Motion: theme untouched. Sections are sticky, solid-background "panels" that
 * stack — each new section slides up, overlays the previous one, then pins and
 * replaces it, its content fading + rising in as it arrives. Scroll-linked
 * opacity/translate is driven by MotionValues (no React re-render → smooth).
 * All motion collapses to instant/visible under prefers-reduced-motion.
 */

const BG = "#F8FAFC";
const INK = "#0F172A";

// Hero on-load cascade only — lighter/quicker than the home-v2 default.
const { container: containerVariants, item: itemVariants } = makeCascade({
  stagger: 0.06,
  delayChildren: 0,
  itemY: 12,
  duration: 0.45,
});

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Deployments", href: "#deployments" },
  { label: "Contact", href: "#contact" },
];

const PROCESS_STAGES = [
  { index: "01", name: "Discover", detail: "Scope, constraints, success metrics defined in writing before code." },
  { index: "02", name: "Design", detail: "Wireframes and data models reviewed with the client before build starts." },
  { index: "03", name: "Build", detail: "Weekly shipped increments. No black-box sprints." },
  { index: "04", name: "Automate", detail: "Manual steps replaced with workflows once the core is stable." },
  { index: "05", name: "Scale", detail: "Monitoring, backups, and load headroom added as usage grows." },
];

const DEPLOYMENTS = [
  { name: "AssetFlow", metric: "100+", unit: "active users", note: "School asset & inventory system" },
  { name: "TableWise", metric: "48-hr", unit: "avg response", note: "Restaurant operations console" },
  { name: "Invonics Accounting", metric: "99.9%", unit: "uptime (12mo)", note: "Finance & ledger system" },
  { name: "RSVP Engine", metric: "3", unit: "live deployments", note: "Ticketing & guest management" },
];

// Concept-node's light-theme dressing around the shared StackPanel — keeps the
// flat bg / hairline borders / lighter fade in one place across the panels.
function NodePanel({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <StackPanel
      id={id}
      className="border-t border-[#E2E8F0] px-4 py-20 md:px-8"
      innerClassName="mx-auto w-full max-w-[1400px]"
      style={{ backgroundColor: BG }}
      fromOpacity={0.12}
      fromY={48}
    >
      {children}
    </StackPanel>
  );
}

function NodeButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex min-h-[44px] items-center justify-center px-6 text-sm font-bold uppercase tracking-wide transition-colors duration-150 active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-[#0F172A] text-[#F8FAFC] border border-[#0F172A] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
      : "bg-transparent text-[#0F172A] border border-[#0F172A] hover:bg-[#0F172A] hover:text-[#F8FAFC]";
  return <button className={`${base} ${styles} ${className}`}>{children}</button>;
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#F8FAFC] md:hidden">
      <div className="flex min-h-[56px] items-center justify-between border-b border-[#E2E8F0] px-4">
        <span className="text-sm font-black uppercase tracking-widest text-[#0F172A]">Invonics</span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center border border-[#E2E8F0] text-[#0F172A] active:scale-[0.98]"
        >
          <span className="text-xl leading-none">&times;</span>
        </button>
      </div>
      <nav className="flex flex-1 flex-col divide-y divide-[#E2E8F0]">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="flex min-h-[64px] items-center px-6 text-2xl font-black uppercase tracking-tight text-[#0F172A] active:scale-[0.98]"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="border-t border-[#E2E8F0] p-4">
        <NodeButton className="w-full">Start a Project</NodeButton>
      </div>
    </div>
  );
}

function Nav({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-[#F8FAFC]">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:h-20 md:px-8">
        <span className="text-base font-black uppercase tracking-widest text-[#0F172A] md:text-lg">
          Invonics
        </span>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-bold uppercase tracking-wide text-[#0F172A] transition-colors duration-150 hover:text-[#0F172A]/50"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <NodeButton>Start a Project</NodeButton>
        </div>
        <button
          onClick={onMenuOpen}
          aria-label="Open menu"
          className="flex h-11 w-11 items-center justify-center border border-[#E2E8F0] text-[#0F172A] active:scale-[0.98] md:hidden"
        >
          <span className="flex flex-col gap-[3px]">
            <span className="h-[2px] w-5 bg-[#0F172A]" />
            <span className="h-[2px] w-5 bg-[#0F172A]" />
          </span>
        </button>
      </div>
    </header>
  );
}

function Hero() {
  // First panel: solid bg, and its content plays an on-load cascade.
  return (
    <section
      className="sticky top-0 flex min-h-[100svh] flex-col justify-center px-4 py-20 md:px-8"
      style={{ backgroundColor: BG }}
    >
      <motion.div
        className="mx-auto w-full max-w-[1400px]"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={itemVariants}
          className="mb-4 text-sm font-bold uppercase tracking-widest text-[#0F172A]/60 md:mb-6"
        >
          Software Engineering — Nairobi, Kenya
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="max-w-3xl text-[36px] font-extrabold leading-[1.05] tracking-tight text-[#0F172A] md:text-[64px]"
        >
          We build the systems your business runs on.
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-xl text-base leading-relaxed text-[#0F172A]/80 md:text-lg"
        >
          Custom software, AI automation, and infrastructure — engineered, deployed, and
          maintained. No templates. No black boxes.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
          <NodeButton>Book a Consultation</NodeButton>
          <NodeButton variant="ghost">View Deployments</NodeButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Deployments() {
  return (
    <NodePanel id="deployments">
      <h2 className="mb-8 text-2xl font-extrabold uppercase tracking-tight text-[#0F172A] md:mb-10 md:text-3xl">
        Live Deployments
      </h2>
      <div className="grid grid-cols-1 border border-[#E2E8F0] sm:grid-cols-2 lg:grid-cols-4">
        {DEPLOYMENTS.map((d, i) => (
          <div
            key={d.name}
            className={`min-h-[44px] p-6 md:p-8 ${
              i % 2 === 0 ? "sm:border-r sm:border-[#E2E8F0]" : ""
            } ${i < DEPLOYMENTS.length - (DEPLOYMENTS.length % 2 === 0 ? 2 : 1) ? "border-b border-[#E2E8F0] sm:border-b lg:border-b-0" : ""} ${
              i > 0 ? "border-t border-[#E2E8F0] sm:border-t-0 lg:border-l lg:border-t-0" : ""
            }`}
          >
            <CountUp
              value={d.metric}
              className="block text-3xl font-extrabold tracking-tight text-[#0F172A] md:text-4xl"
            />
            <div className="mt-1 text-xs font-bold uppercase tracking-widest text-[#0F172A]/50">
              {d.unit}
            </div>
            <div className="mt-4 text-sm font-bold uppercase tracking-wide text-[#0F172A]">
              {d.name}
            </div>
            <div className="mt-1 text-sm leading-snug text-[#0F172A]/70">{d.note}</div>
          </div>
        ))}
      </div>
    </NodePanel>
  );
}

function Process() {
  return (
    <NodePanel id="process">
      <h2 className="mb-8 text-2xl font-extrabold uppercase tracking-tight text-[#0F172A] md:mb-10 md:text-3xl">
        How We Work
      </h2>
      <div className="grid grid-cols-1 border border-[#E2E8F0] md:grid-cols-5">
        {PROCESS_STAGES.map((stage, i) => (
          <div
            key={stage.index}
            className={`min-h-[44px] p-6 md:p-8 ${
              i > 0 ? "border-t border-[#E2E8F0] md:border-l md:border-t-0" : ""
            }`}
          >
            <div className="text-xs font-bold tracking-widest text-[#0F172A]/40">{stage.index}</div>
            <div className="mt-3 text-lg font-extrabold uppercase tracking-tight text-[#0F172A]">
              {stage.name}
            </div>
            <div className="mt-2 text-sm leading-relaxed text-[#0F172A]/70">{stage.detail}</div>
          </div>
        ))}
      </div>
    </NodePanel>
  );
}

function Contact() {
  return (
    <NodePanel id="contact">
      <div className="border border-[#E2E8F0] p-8 md:p-14">
        <h2 className="max-w-2xl text-3xl font-extrabold uppercase tracking-tight text-[#0F172A] md:text-5xl">
          Let's scope the build.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#0F172A]/70 md:text-lg">
          Tell us what the system needs to do. We'll respond within 48 hours with next steps.
        </p>
        <div className="mt-8">
          <NodeButton>Start a Project</NodeButton>
        </div>
      </div>
    </NodePanel>
  );
}

function Footer() {
  return (
    <footer
      className="relative z-10 border-t border-[#E2E8F0] px-4 py-8 md:px-8"
      style={{ backgroundColor: BG }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-bold uppercase tracking-wide text-[#0F172A]">
          Invonics Technologies
        </span>
        <span className="text-sm text-[#0F172A]/60">Nairobi, Kenya — est. build node v1</span>
      </div>
    </footer>
  );
}

function ConceptNodePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: BG, color: INK }}>
      <Nav onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Hero />
        <Deployments />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
