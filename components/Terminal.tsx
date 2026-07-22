"use client";

import { useEffect, useState } from "react";

const LINES = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "tinsley.lau · senior software engineer" },
  { type: "cmd", text: "cat focus.txt" },
  { type: "out", text: "real-time web interfaces · agentic tooling" },
  { type: "cmd", text: "status --now" },
  { type: "ok", text: "● shipping" },
] as const;

const OUTPUT_COLOR = { out: "text-muted", ok: "text-ok" } as const;

/* pos.line === -1: not started (matches the pre-JS static HTML);
   pos.line === LINES.length: finished, show the trailing prompt */
type Pos = { line: number; char: number };

export default function Terminal() {
  const [pos, setPos] = useState<Pos>({ line: -1, char: 0 });

  useEffect(() => {
    if (pos.line === -1) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setPos({ line: LINES.length, char: 0 });
        return;
      }
      const t = setTimeout(() => setPos({ line: 0, char: 0 }), 500);
      return () => clearTimeout(t);
    }

    if (pos.line >= LINES.length) return;

    const l = LINES[pos.line];
    let t: ReturnType<typeof setTimeout>;
    if (l.type === "cmd" && pos.char < l.text.length) {
      t = setTimeout(
        () => setPos({ line: pos.line, char: pos.char + 1 }),
        34 + Math.random() * 46
      );
    } else {
      t = setTimeout(
        () => setPos({ line: pos.line + 1, char: 0 }),
        l.type === "cmd" ? 260 : 320
      );
    }
    return () => clearTimeout(t);
  }, [pos]);

  return (
    <div
      className="force-dark overflow-hidden rounded-[10px] border border-line bg-[rgba(13,9,26,0.85)] font-mono text-[13.5px] leading-[1.9] shadow-[0_0_0_1px_rgba(0,0,0,0.4),0_24px_60px_rgba(0,0,0,0.5),0_0_60px_rgba(124,92,240,0.12)]"
      role="img"
      aria-label="Terminal showing: whoami returns tinsley.lau, senior software engineer; focus is real-time web interfaces and agentic tooling; status is shipping."
    >
      <div
        className="flex items-center gap-2 border-b border-line bg-[rgba(21,14,40,0.9)] px-3.5 py-2.5"
        aria-hidden="true"
      >
        <span className="h-[11px] w-[11px] rounded-full bg-[#f26d78]"></span>
        <span className="h-[11px] w-[11px] rounded-full bg-[#f2c94c]"></span>
        <span className="h-[11px] w-[11px] rounded-full bg-ok"></span>
        <span className="ml-auto text-[11.5px] tracking-[0.06em] text-faint">
          tinsley@portfolio:~
        </span>
      </div>
      <div
        className="min-h-[220px] px-5 pt-[18px] pb-[22px] max-[430px]:min-h-[272px]"
        aria-hidden="true"
      >
        {LINES.slice(0, pos.line + 1).map((l, i) =>
          l.type === "cmd" ? (
            <div key={i}>
              <span className="text-cyan">$ </span>
              <span className="text-fg">
                {i === pos.line ? l.text.slice(0, pos.char) : l.text}
              </span>
            </div>
          ) : (
            <div key={i}>
              <span className={OUTPUT_COLOR[l.type]}>{l.text}</span>
            </div>
          )
        )}
        {pos.line >= LINES.length && (
          <div>
            <span className="text-cyan">$ </span>
            <span className="inline-block h-[15px] w-2 animate-blink bg-cyan align-[-2px] motion-reduce:animate-none"></span>
          </div>
        )}
      </div>
    </div>
  );
}
