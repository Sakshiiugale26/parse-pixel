import useTilt from "../hooks/useTilt";
export default function ServiceCard({ n, title, text, tags, delay, children }) {
  const tilt = useTilt(18);
  return (
    <article data-reveal data-delay={delay}>
      <div {...tilt} className="tilt card glass flex h-full flex-col rounded-2xl p-8 hover:border-cyan-300/30">
        <span className="text-7xl font-extrabold leading-none text-white/10">{n}</span>
        <div className="stage my-6 h-56"><div className="rig relative h-full w-full">{children}</div></div>
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        <p className="mt-3 text-lg text-slate-300">{text}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {tags.map((t) => <li key={t} className="rounded-md border border-white/10 px-3.5 py-1.5 text-sm text-slate-300">{t}</li>)}
        </ul>
      </div>
    </article>
  );
}
