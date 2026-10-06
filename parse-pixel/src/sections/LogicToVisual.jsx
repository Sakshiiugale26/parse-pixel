import { useEffect, useRef, useState } from "react";
import Heading from "../components/Heading";
import { ScrollTrigger, reduced } from "../animations/gsap";
const STAGES = ["Code", "System", "Experience", "Pixel"];
const GLYPHS = ["{", "}", "</>", "=>", "01", "();", "[]", "&&", "#", "//", "fn", "<>"];
const CELLS = 72;

export default function LogicToVisual() {
  const ref = useRef();
  const [p, setP] = useState(0);
  useEffect(() => {
    if (reduced()) { setP(1); return; }
    const st = ScrollTrigger.create({ trigger: ref.current, start: "top 70%", end: "bottom 50%", scrub: true, onUpdate: (s) => setP(s.progress) });
    return () => st.kill();
  }, []);
  const stage = Math.min(3, Math.floor(p * 4));
  return (
    <section ref={ref} className="mx-auto max-w-[min(92vw,96rem)] px-5 py-28">
      <Heading eyebrow="Transformation" title="From logic to visual." />
      <div className="glass rounded-2xl p-6 sm:p-10">
        <ol className="mb-10 grid grid-cols-2 gap-4 font-mono text-lg uppercase tracking-widest sm:grid-cols-4">
          {STAGES.map((s, i) => (
            <li key={s} className={`border-t pt-3 transition-colors duration-500 ${i === stage ? "border-cyan-300 text-white" : i < stage ? "border-white/30 text-slate-400" : "border-white/10 text-slate-600"}`}>
              {s}
            </li>
          ))}
        </ol>
        <div className="grid grid-cols-9 gap-2 sm:grid-cols-12" aria-hidden>
          {Array.from({ length: CELLS }, (_, i) => (i / CELLS < p
            ? <span key={i} className="aspect-square rounded-md transition-all duration-500" style={{ background: `hsl(${195 + (i % 12) * 7} 85% 60%)`, boxShadow: "0 0 14px rgba(99,102,241,.3)" }} />
            : <span key={i} className="flex aspect-square items-center justify-center font-mono text-xs text-slate-500 sm:text-sm">{GLYPHS[i % GLYPHS.length]}</span>))}
        </div>
      </div>
    </section>
  );
}
