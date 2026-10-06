import Heading from "../components/Heading";
const SIDES = [["Parse", "Logic, systems, data and code.", "from-cyan-300/70"], ["Pixel", "Design, interaction, motion and emotion.", "from-fuchsia-400/70"]];
export default function BrandStory() {
  return (
    <section id="about" className="mx-auto max-w-[min(92vw,96rem)] px-5 py-28">
      <Heading eyebrow="About" title="Where technology meets imagination." />
      <div className="grid items-start gap-14 lg:grid-cols-2">
        <div data-reveal className="space-y-6 text-xl text-slate-300">
          <p><strong className="text-white">Parse</strong> represents the logic behind every digital experience — understanding ideas, systems, data and code.</p>
          <p><strong className="text-white">Pixel</strong> represents the visual layer — design, interaction, motion and emotion.</p>
          <p>Together, Parse &amp; Pixel represents the complete journey from technology and engineering to a finished digital experience.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {SIDES.map(([t, d, g], i) => (
            <div key={t} data-reveal data-delay={i * 0.12} className="glass rounded-2xl p-8">
              <div className={`mb-6 h-1 w-16 rounded-full bg-gradient-to-r ${g} to-indigo-400/70`} />
              <h3 className="text-3xl font-extrabold">{t}</h3>
              <p className="mt-3 text-lg text-slate-300">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
