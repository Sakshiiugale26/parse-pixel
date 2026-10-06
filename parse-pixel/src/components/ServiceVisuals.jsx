const L = ({ i, children }) => <div className="layer" style={{ "--i": i }}>{children}</div>;

export const Phone = () => (
  <>
    <L i={0}><div className="h-48 w-28 rounded-[1.6rem] border border-white/25 bg-gradient-to-b from-[#101a3a] to-[#080d20]" /></L>
    <L i={1}><div className="w-20 space-y-2">
      {["w-full", "w-3/4", "w-1/2"].map((w, k) => <div key={k} className={`h-3 rounded-full bg-gradient-to-r from-cyan-300/70 to-indigo-400/70 ${w}`} />)}
      <div className="mt-3 h-14 rounded-xl border border-white/15 bg-white/5" />
    </div></L>
    <L i={2}><div className="glass absolute right-[22%] top-[10%] h-12 w-12 rounded-2xl" /></L>
    <L i={3}>{[["18%", "70%"], ["76%", "40%"], ["64%", "84%"]].map(([x, y], k) => (
      <span key={k} className="absolute h-1.5 w-1.5 rounded-full bg-fuchsia-300" style={{ left: x, top: y }} />))}</L>
  </>
);

export const Browser = () => (
  <>
    {[0, 1, 2].map((i) => (
      <L key={i} i={i}>
        <div className="h-32 w-52 rounded-xl border border-white/20 bg-[#0b1226]/90" style={{ translate: `${-18 + i * 18}px ${-14 + i * 14}px` }}>
          <div className="flex gap-1.5 border-b border-white/10 p-2.5">
            {["#22d3ee", "#6366f1", "#d946ef"].map((c) => <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />)}
          </div>
          <div className="space-y-2 p-3"><div className="h-2 w-2/3 rounded bg-white/20" /><div className="h-2 w-1/2 rounded bg-white/10" /></div>
        </div>
      </L>
    ))}
  </>
);

export const PixelWave = () => (
  <L i={1}>
    <div className="grid grid-cols-8 gap-2">
      {Array.from({ length: 48 }, (_, k) => {
        const x = k % 8, y = Math.floor(k / 8);
        return <span key={k} className="px h-4 w-4 rounded-[4px]" style={{ "--d": x + y, background: `hsl(${190 + x * 16} 85% 62%)` }} />;
      })}
    </div>
  </L>
);
