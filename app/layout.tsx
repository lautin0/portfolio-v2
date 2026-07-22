import type { Metadata } from "next";
import Orbs from "@/components/Orbs";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

/* runs before first paint so a saved/system light preference never flashes dark */
const themeInit =
  'try{var t=localStorage.getItem("theme");if(t==="light"||(!t&&matchMedia("(prefers-color-scheme: light)").matches))document.documentElement.dataset.theme="light"}catch(e){}';

export const metadata: Metadata = {
  title: "Tinsley Lau -- Portfolio",
  description:
    "Tinsley Lau -- software engineer building web experiences across Web3, DeFi, and fintech. Frontend, real-time UI, and agentic tooling.",
};

const navLink =
  "text-muted transition-colors duration-150 ease-[ease] hover:text-cyan hover:no-underline";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth motion-reduce:scroll-auto"
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <noscript>
          <style>{`.reveal { opacity: 1; transform: none; }`}</style>
        </noscript>

        <Orbs />
        <div className="grid-layer" aria-hidden="true"></div>
        <div className="scanlines" aria-hidden="true"></div>

        <nav
          aria-label="Main"
          className="fixed inset-x-0 top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-nav px-7 py-3.5 backdrop-blur-md"
        >
          <a
            className="font-mono text-[15px] font-bold tracking-[0.04em] text-fg hover:no-underline"
            href="#top"
          >
            tinsley<span className="text-violet">.lau</span>
          </a>
          <div className="flex gap-[22px] font-mono text-[13px] max-[860px]:gap-[15px] max-[860px]:text-[12px]">
            <a className={navLink} href="#about">
              ~/about
            </a>
            <a className={navLink} href="#work">
              ~/work
            </a>
            {/* keep ~/contact reachable; drop the least critical link instead */}
            <a className={`${navLink} max-[480px]:hidden`} href="#stack">
              ~/stack
            </a>
            <a className={navLink} href="#contact">
              ~/contact
            </a>
            <ThemeToggle />
          </div>
        </nav>

        {children}

        <footer className="relative z-[1] mx-auto flex max-w-content flex-wrap justify-between gap-x-6 gap-y-2.5 px-7 pt-14 pb-11 font-mono text-[12.5px] text-faint">
          <span>© 2026 Tinsley Lau</span>
          <span>Canada · Eastern Time</span>
          <span>Built with Claude Code</span>
        </footer>
      </body>
    </html>
  );
}
