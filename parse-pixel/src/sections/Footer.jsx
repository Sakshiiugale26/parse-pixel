import Mark from "../components/Mark";
const LINKS = [["Services", "#services"], ["About", "#about"], ["Process", "#process"], ["Contact", "#contact"], ["LinkedIn", "#"], ["Instagram", "#"]];
export default function Footer() {
  return (
    <footer className="glass border-x-0 border-b-0">
      <div className="mx-auto flex max-w-[min(92vw,96rem)] flex-col gap-10 px-5 py-16 md:flex-row md:justify-between">
        <div>
          <div className="flex items-center gap-3 text-2xl font-bold"><Mark className="h-11 w-auto" /> Parse <span className="text-cyan-300">&amp;</span> Pixel Technologies</div>
          <p className="mt-4 text-xl text-slate-300">Engineering digital products. Creating visual experiences.</p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-xl text-slate-200 md:max-w-md">
          {LINKS.map(([l, h]) => <a key={l} href={h} className="transition-colors hover:text-cyan-300">{l}</a>)}
        </nav>
      </div>
      <p className="px-5 pb-10 text-center text-base text-slate-500">© 2026 Parse &amp; Pixel Technologies. All rights reserved.</p>
    </footer>
  );
}
