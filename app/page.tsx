import Reveal from "@/components/Reveal";
import Terminal from "@/components/Terminal";

const CHIPS = ["SOFTWARE ENGINEER II", "KRAKEN · PRO", "FRONTEND / WEB"];

const WORK = [
  {
    index: "[01]",
    title: "Kraken Pro · Web Trading UI",
    body: "Frontend for Kraken's professional trading platform: account state surfaces, wallet flows, and real-time interfaces where correctness and latency both matter.",
    tags: ["TypeScript", "React", "Real-time"],
  },
  {
    index: "[02]",
    title: "Second Brain · Personal AI Agent",
    body: "An agentic knowledge vault built on Claude Code: custom skills for ingesting, compiling, and querying knowledge, wired to everyday work tools through MCP connectors.",
    tags: ["Claude Code", "MCP", "Automation"],
  },
  {
    index: "[03]",
    title: "Cross-System Context Tooling",
    body: "MCP-powered developer tooling that pulls conversations, tickets, and code reviews into one place -- compressing hours of context rebuilding into a single query.",
    tags: ["MCP", "DX", "AI Agents"],
  },
];

const STACK = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "HTML / CSS", "SQL"],
  },
  {
    group: "Frontend",
    items: ["React", "Real-time data UI", "State management", "Design systems"],
  },
  {
    group: "AI & Tooling",
    items: ["Claude Code", "MCP servers", "Agent workflows", "Cursor"],
  },
  {
    group: "Platform",
    items: ["Node.js", "Git / GitLab CI", "REST APIs", "Monorepos"],
  },
];

const FACTS: [string, React.ReactNode][] = [
  ["ROLE", "Software Engineer II"],
  [
    "ORG",
    <>
      Kraken <span className="text-cyan">·</span> Pro
    </>,
  ],
  [
    "BASE",
    <>
      Toronto <span className="text-cyan">·</span> ET
    </>,
  ],
  ["FOCUS", "Trading web UI"],
  [
    "MODE",
    <>
      Absorb <span className="text-cyan">→</span> ship
    </>,
  ],
  ["TOOLS", "AI-native, MCP-wired"],
];

const eyebrow =
  "mb-[34px] flex items-center gap-3.5 font-mono text-[13px] font-normal tracking-[0.08em] text-cyan after:h-px after:flex-1 after:bg-linear-to-r/srgb after:from-line-bright after:to-transparent after:content-['']";

const aboutP = "mb-5 max-w-[62ch] last:mb-0";

export default function Home() {
  return (
    <main id="top" className="relative z-[1]">
      <header className="mx-auto grid min-h-svh max-w-content grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center gap-14 px-7 pt-[140px] pb-16 max-[860px]:min-h-[auto] max-[860px]:grid-cols-1 max-[860px]:gap-11 max-[860px]:pt-[120px]">
        <div>
          <div className="mb-7 inline-flex items-center gap-[9px] rounded-full border border-line bg-[rgba(18,12,34,0.6)] px-3.5 py-1.5 font-mono text-[12.5px] tracking-[0.06em] text-muted">
            <span
              className="h-2 w-2 animate-pulse-dot rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)] motion-reduce:animate-none"
              aria-hidden="true"
            ></span>
            ONLINE · NEW YORK · ET
          </div>
          <h1 className="mb-[22px] font-mono text-[clamp(44px,7.5vw,84px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-balance [text-shadow:0_0_28px_rgba(167,139,250,0.35),0_0_80px_rgba(124,92,240,0.25)]">
            Tinsley
            <br />
            <span className="animate-flicker text-violet motion-reduce:animate-none">
              Lau
            </span>
          </h1>
          <p className="mb-[34px] max-w-[34ch] text-[clamp(17px,2.1vw,21px)] text-muted text-balance">
            I build{" "}
            <strong className="font-semibold text-fg">
              web-based applications
            </strong>{" "}
            for a crypto exchange -- the interfaces traders actually touch.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded border border-[rgba(167,139,250,0.35)] bg-[rgba(124,92,240,0.08)] px-3 py-1.5 font-mono text-[12.5px] tracking-[0.05em] text-violet"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
        <Terminal />
      </header>

      <Reveal id="about">
        <h2 className={eyebrow}>~/about</h2>
        <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start gap-12 max-[860px]:grid-cols-1">
          <div>
            <p className={aboutP}>
              I&apos;m a software engineer on Kraken&apos;s Pro team, building
              the web surfaces of a professional crypto trading platform --
              account state, wallet flows, real-time market UI. The
              self-description hasn&apos;t changed since day one:{" "}
              <em>I build web-based applications for a crypto exchange.</em>
            </p>
            <p className={aboutP}>
              My operating mode is absorb-first. I front-load deep reading of a
              codebase, its history, and its context before writing a line --
              then the contribution curve bends sharply upward once the system
              clicks. Understanding is the investment; velocity is the return.
            </p>
            <p className={aboutP}>
              I work AI-native: agents, custom skills, and MCP integrations
              wired into everything from my editor to my knowledge base. If a
              workflow can be compressed, I&apos;ve probably already built the
              tool that compresses it.
            </p>
          </div>
          <div
            className="rounded-[10px] border border-line bg-card px-6 py-[22px] font-mono text-[13px]"
            role="group"
            aria-label="Quick facts"
          >
            <dl className="grid grid-cols-[auto_1fr] gap-x-[18px] gap-y-2.5">
              {FACTS.map(([label, value]) => (
                <div key={label} className="contents">
                  <dt className="tracking-[0.05em] text-faint">{label}</dt>
                  <dd className="text-fg">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>

      <Reveal id="work">
        <h2 className={eyebrow}>~/work</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-[22px]">
          {WORK.map((w) => (
            <article
              key={w.index}
              className="flex flex-col gap-3.5 rounded-[10px] border border-line bg-card px-[26px] pt-[26px] pb-6 transition-[transform,border-color,box-shadow] duration-[220ms] ease-[ease] hover:-translate-y-[5px] hover:border-line-bright hover:shadow-[0_16px_44px_rgba(0,0,0,0.45),0_0_34px_rgba(34,211,238,0.1)] motion-reduce:transition-none motion-reduce:hover:translate-none"
            >
              <div className="font-mono text-[12px] tracking-[0.08em] text-magenta">
                {w.index}
              </div>
              <h3 className="font-mono text-[18.5px] font-bold leading-[1.35] tracking-[-0.01em]">
                {w.title}
              </h3>
              <p className="flex-1 text-[15.5px] text-muted">{w.body}</p>
              <div className="flex flex-wrap gap-2">
                {w.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-[rgba(34,211,238,0.28)] bg-[rgba(34,211,238,0.06)] px-[9px] py-[3px] font-mono text-[11.5px] text-cyan"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal id="stack">
        <h2 className={eyebrow}>~/stack</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[22px]">
          {STACK.map((g) => (
            <div
              key={g.group}
              className="rounded-[10px] border border-line bg-card px-6 py-[22px]"
            >
              <h3 className="mb-4 font-mono text-[12.5px] font-bold uppercase tracking-[0.12em] text-violet">
                {g.group}
              </h3>
              <ul className="flex flex-col gap-[9px] text-[15px] text-muted">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="before:font-mono before:text-cyan before:content-['▸_']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-[26px] flex flex-wrap items-baseline gap-x-[26px] gap-y-2 rounded-[10px] border border-line border-l-[3px] border-l-violet bg-card px-[26px] py-[22px]">
          <span className="font-mono text-[13px] tracking-[0.05em] text-cyan">
            2026 -- NOW
          </span>
          <span className="font-semibold">Software Engineer II</span>
          <span className="text-muted">
            Kraken (Payward) · Pro team · web trading interfaces
          </span>
        </div>
      </Reveal>

      <Reveal id="contact">
        <h2 className={eyebrow}>~/contact</h2>
        <div className="rounded-[14px] border border-line bg-card bg-[radial-gradient(ellipse_80%_120%_at_50%_-20%,rgba(124,92,240,0.16),transparent_60%)] px-8 py-16 text-center">
          <h2 className="mb-3.5 font-mono text-[clamp(28px,4.4vw,44px)] font-extrabold tracking-[-0.02em] text-balance">
            Signal me on <span className="text-violet">any channel</span>
          </h2>
          <p className="mx-auto mb-[34px] max-w-[46ch] text-muted">
            Interesting frontend problems, agentic tooling, or anything at the
            intersection of trading UI and AI -- my inbox is open.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <a
              className="rounded-md border border-[rgba(167,139,250,0.6)] bg-[rgba(124,92,240,0.18)] px-[26px] py-[13px] font-mono text-[14px] tracking-[0.04em] text-[#d8ccff] transition-[box-shadow,background-color,transform] duration-200 ease-[ease] hover:-translate-y-0.5 hover:bg-[rgba(124,92,240,0.3)] hover:no-underline hover:shadow-[0_0_30px_rgba(124,92,240,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-none"
              href="mailto:tinsley.lau@kraken.com"
            >
              tinsley.lau@kraken.com
            </a>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
