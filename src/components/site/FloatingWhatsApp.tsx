const PHONE = "254786669572";
const MSG = encodeURIComponent("Hi Invonics Technologies 👋 — I'd like to discuss a project.");

export const WA_LINK = `https://wa.me/${PHONE}?text=${MSG}`;

export function FloatingWhatsApp() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Invonics on WhatsApp"
      className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-50 flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full bg-[oklch(0.62_0.18_150)] text-white border-[3px] border-background shadow-xl shadow-[oklch(0.62_0.18_150)]/30 wa-pulse hover:scale-110 active:scale-95 transition-all duration-300"
    >
      <WhatsAppIcon className="h-7 w-7 relative left-[1px]" />
    </a>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.52 3.48A11.86 11.86 0 0012.06 0C5.5 0 .14 5.36.14 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.66a11.93 11.93 0 005.74 1.46h.01c6.56 0 11.92-5.36 11.92-11.92 0-3.18-1.24-6.17-3.45-8.4zM12.05 21.5a9.55 9.55 0 01-4.87-1.34l-.35-.21-3.74.98 1-3.65-.23-.37a9.5 9.5 0 0114.7-11.6 9.43 9.43 0 012.79 6.74c0 5.27-4.3 9.55-9.3 9.45zm5.43-7.13c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.78.96-.95 1.16-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.13.3-.34.45-.5.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.57-.48-.5-.66-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.62.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35z" />
    </svg>
  );
}
