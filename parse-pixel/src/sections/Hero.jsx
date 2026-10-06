import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import { gsap, reduced } from "../animations/gsap";
const DigitalCore = lazy(() => import("../three/DigitalCore"));
const SYMBOLS = [["</>", "6%", "14%", 0.5], ["{ }", "86%", "10%", 1], ["API", "92%", "56%", 0.7], ["AI", "8%", "78%", 1.2], ["01", "50%", "92%", 0.5], ["→", "72%", "28%", 0.9]];
const STAGES = ["Code", "System", "Experience", "Pixel"];

export default function Hero() {
  const root = useRef();
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState(reduced() ? 3 : 0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(root.current);
    const ctx = gsap.context(() => {
      if (!reduced()) gsap.fromTo(".hl > span", { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.12, ease: "power4.out", delay: 0.15 });
    }, root);
    const timers = reduced() ? [] : [1, 2, 3].map((i) => setTimeout(() => setStage(i), i * 900));
    return () => { io.disconnect(); ctx.revert(); timers.forEach(clearTimeout); };
  }, []);
  const track = (e) => {
    root.current.style.setProperty("--mx", e.clientX / innerWidth - 0.5);
    root.current.style.setProperty("--my", e.clientY / innerHeight - 0.5);
  };
  return (
    <section id="top" ref={root} onPointerMove={track} aria-label="Introduction"
      className="relative mx-auto grid min-h-screen max-w-[min(92vw,96rem)] items-center gap-6 px-5 pb-16 pt-28 lg:grid-cols-[1.1fr_.9fr]">
      <div>
        <div data-reveal className="glass mb-8 inline-flex items-center gap-3 rounded-full px-4 py-2 text-base text-slate-200">
          <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]" /> Available for selected projects
        </div>
        <h1 className="text-[7.2vw] font-extrabold uppercase leading-[.95] tracking-tight sm:text-[clamp(2rem,4vw,4.8rem)]">
          <span className="hl block overflow-hidden pb-1"><span className="block">Where <span className="grad">Technology</span></span></span>
          <span className="hl block overflow-hidden pb-2"><span className="block">Meets <span className="grad">Imagination.</span></span></span>
        </h1>
        <p data-reveal data-delay="0.3" className="mt-8 max-w-xl text-xl text-slate-300 md:text-2xl">
          We build digital products and AI-powered visual experiences for ambitious brands worldwide.
        </p>
        <div data-reveal data-delay="0.45" className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="#contact">Start a Project</Button>
          <Button href="#work" variant="ghost">Explore Our Work</Button>
        </div>
        <p data-reveal data-delay="0.6" className="mt-10 font-mono text-base uppercase tracking-[.25em] text-slate-400">Apps · Web · AI Motion</p>
      </div>
      <div className="relative order-first h-[300px] sm:h-[400px] lg:order-last lg:h-[680px]">
        <Suspense fallback={null}><DigitalCore active={visible} /></Suspense>
        {SYMBOLS.map(([s, x, y, d]) => (
          <span key={s} aria-hidden className="absolute hidden sm:block" style={{ left: x, top: y, transform: `translate(calc(var(--mx,0)*${40 * d}px),calc(var(--my,0)*${40 * d}px))` }}>
            <span className="block font-mono text-lg text-cyan-200/50" style={{ animation: `drift ${5 + d * 2}s ease-in-out infinite` }}>{s}</span>
          </span>
        ))}
        <div aria-hidden className="absolute inset-x-0 bottom-0 flex justify-center gap-4 font-mono text-sm uppercase tracking-[.3em]">
          {STAGES.map((s, i) => <span key={s} className={`transition-colors duration-500 ${i === stage ? "text-cyan-300" : i < stage ? "text-slate-400" : "text-slate-700"}`}>{s}</span>)}
        </div>
      </div>
    </section>
  );
}
