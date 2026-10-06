import { useEffect, useState } from "react";
import Button from "./Button";
import Mark from "./Mark";
const LINKS = [["Services", "#services"], ["About", "#about"], ["Process", "#process"], ["Contact", "#contact"]];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(scrollY > 24);
    on(); addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  const bar = "block h-0.5 w-6 bg-white transition-all duration-300";
  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled || open ? "border-white/10 bg-[#050816]/80 backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
      <nav aria-label="Primary" className="mx-auto flex max-w-[min(92vw,96rem)] items-center justify-between px-5 py-5">
        <a href="#top" className="flex items-center gap-3 text-2xl font-bold tracking-tight md:text-3xl">
          <Mark className="h-12 w-auto md:h-14" /> <span>Parse <span className="text-cyan-300">&amp;</span> Pixel<span className="hidden font-medium text-slate-400 lg:inline"> Technologies</span></span>
        </a>
        <div className="hidden items-center gap-8 md:flex xl:gap-11">
          {LINKS.map(([l, h]) => <a key={l} href={h} className="link text-lg text-slate-300 lg:text-xl xl:text-2xl transition-colors hover:text-white">{l}</a>)}
          <Button href="#contact" className="!px-7 !py-3 text-lg xl:!px-9 xl:text-xl">Start a Project</Button>
        </div>
        <button className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className={`${bar} ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`${bar} ${open ? "opacity-0" : ""}`} />
          <span className={`${bar} ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>
      <div className={`grid transition-[grid-template-rows] duration-300 md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="flex flex-col gap-5 px-5 pb-8 pt-2">
            {LINKS.map(([l, h]) => <a key={l} href={h} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className="text-2xl">{l}</a>)}
            <Button href="#contact" onClick={() => setOpen(false)}>Start a Project</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
