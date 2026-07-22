"use client";

/* Current theme lives on <html data-theme>; the icons swap via CSS so the
   server-rendered markup never depends on client state */
export default function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="Switch between dark and light theme"
      onClick={() => {
        const root = document.documentElement;
        const next = root.dataset.theme === "light" ? "dark" : "light";
        root.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {}
      }}
      className="-my-0.5 cursor-pointer rounded border border-line px-2 py-0.5 font-mono text-[13px] leading-[1.4] text-muted transition-colors duration-150 ease-[ease] hover:border-line-bright hover:text-cyan"
    >
      <span className="[[data-theme=light]_&]:hidden" aria-hidden="true">
        ☀
      </span>
      <span className="hidden [[data-theme=light]_&]:inline" aria-hidden="true">
        ☾
      </span>
    </button>
  );
}
