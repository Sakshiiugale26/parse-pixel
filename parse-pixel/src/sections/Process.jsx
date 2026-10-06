import { useEffect, useRef, useState } from "react";
import Heading from "../components/Heading";
import { gsap, ScrollTrigger, reduced } from "../animations/gsap";
const STEPS = [
  ["01", "Discover", "Understand the business, audience and objectives."],
  ["02", "Define", "Shape the product, experience and technical direction."],
  ["03", "Build", "Design, engineer and test the experience."],
  ["04", "Launch", "Deploy, optimize and continuously improve."],
];
export default function Process() {
  const wrap = useRef(), line = useRef();
  const [active, setActive] = useState(reduced() ? -1 : 0);
  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(line.current, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: wrap.current, start: "top 70%", end: "bottom 60%", scrub: true } });
      wrap.current.querySelectorAll(".step").forEach((el, i) =>
        ScrollTrigger.create({ trigger: el, start: "top 65%", end: "bottom 65%", onToggle: (s) => s.isActive && setActive(i) }));
    });
    return () => ctx.revert();
  }, []);
  return (
    <section id="process" className="mx-auto max-w-[min(92vw,96rem)] px-5 py-28">
      <Heading eyebrow="Process" title="How we work" />
      <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_.8fr]">
        <div ref={wrap} className="relative pl-10 md:pl-16">
          <div className="absolute bottom-0 left-3 top-0 w-px bg-white/10 md:left-5" />
          <div ref={line} className="absolute bottom-0 left-3 top-0 w-px origin-top bg-gradient-to-b from-cyan-300 to-fuchsia-400 md:left-5" />
          {STEPS.map(([n, t, d], i) => (
            <div key={n} className={`step relative transition-opacity duration-500 ${i < 3 ? "pb-16" : ""} ${active < 0 || i === active ? "opacity-100" : "opacity-40"}`}>
              <span className={`absolute -left-[2.35rem] top-2 h-3 w-3 rounded-full transition-all duration-500 md:-left-[3.6rem] ${i === active ? "scale-150 bg-cyan-300 shadow-[0_0_16px_#22d3ee]" : "bg-slate-500"}`} />
              <div data-reveal>
                <h3 className="text-4xl font-extrabold tracking-tight md:text-5xl">{t}</h3>
                <p className="mt-3 max-w-xl text-xl text-slate-300">{d}</p>
              </div>
            </div>
          ))}
        </div>
        <div aria-hidden className="stage hidden h-96 lg:block"><div className="plates">{[0, 1, 2, 3].map((i) => <span key={i} className={`plate ${i <= active ? "on" : ""}`} style={{ "--i": i }} />)}</div></div>
      </div>
    </section>
  );
}
