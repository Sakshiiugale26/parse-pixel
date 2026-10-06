import Heading from "../components/Heading";
import useTilt from "../hooks/useTilt";
const WORK = [
  { cat: "Mobile Applications", title: "Fintech companion app", text: "A cross-platform product concept exploring onboarding, dashboards and secure payments.", tech: "React Native · Node.js", h: [195, 245] },
  { cat: "Web Platforms", title: "SaaS analytics platform", text: "A web application concept with real-time dashboards, roles and a scalable component system.", tech: "React · TypeScript · Cloud", h: [225, 275] },
  { cat: "Business Websites", title: "Consulting firm website", text: "A fast, editorial-style business website concept built around clear storytelling.", tech: "Next.js · Headless CMS", h: [200, 260] },
  { cat: "AI Visual Experiences", title: "Generative brand film", text: "A motion concept combining generative visuals, kinetic typography and sound design.", tech: "AI video · Motion design", h: [265, 320] },
];
function Project({ cat, title, text, tech, h, i }) {
  const tilt = useTilt(6);
  return (
    <article data-reveal>
      <div {...tilt} className="tilt glass group grid rounded-2xl hover:border-cyan-300/30 md:grid-cols-[1.3fr_1fr]">
        <div className={`relative h-64 overflow-hidden md:h-96 ${i % 2 ? "md:order-2" : ""}`} style={{ background: `linear-gradient(135deg,hsl(${h[0]} 80% 22%),hsl(${h[1]} 70% 12%))` }}>
          <div className="absolute inset-0 opacity-30 transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.18) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.18) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          <span className="absolute left-5 top-5 rounded-md bg-black/40 px-3 py-1 font-mono text-xs uppercase tracking-widest text-slate-200">Concept project</span>
          <span className="absolute bottom-3 right-6 text-[8rem] font-extrabold leading-none text-white/10">0{i + 1}</span>
        </div>
        <div className="flex flex-col justify-center p-8 md:p-12">
          <p className="font-mono text-sm uppercase tracking-[.2em] text-cyan-300/80">{cat}</p>
          <h3 className="mt-3 text-3xl font-bold">{title}</h3>
          <p className="mt-4 text-lg text-slate-300">{text}</p>
          <p className="mt-5 font-mono text-sm text-slate-400">{tech}</p>
          <a href="#contact" className="link mt-7 inline-block self-start text-lg font-semibold text-white">Discuss a similar project →</a>
        </div>
      </div>
    </article>
  );
}
export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-[min(92vw,96rem)] px-5 py-28">
      <Heading eyebrow="Work" title="Selected work" sub="Concept projects that show how we approach product, platform and visual storytelling." />
      <div className="space-y-6">{WORK.map((w, i) => <Project key={w.title} {...w} i={i} />)}</div>
    </section>
  );
}
