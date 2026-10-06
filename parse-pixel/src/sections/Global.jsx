import Heading from "../components/Heading";
const POINTS = [
  ["Global collaboration", "Clear communication, shared tooling and overlap with your working hours."],
  ["Transparent process", "Regular demos, written scopes and visibility into every milestone."],
  ["Designed to scale", "Architecture and design systems that grow with your product and team."],
];
// unlabeled network points on a 360x180 world grid (lon+180, 90-lat)
const NODES = [[58, 53], [106, 49], [180, 39], [235, 65], [253, 71], [284, 89], [331, 124]];
const HUB = 4;
const LINKS = [[4, 2], [4, 3], [4, 5], [4, 1], [4, 6], [2, 1], [1, 0]];
const arc = ([x1, y1], [x2, y2]) => `M${x1} ${y1}Q${(x1 + x2) / 2} ${(y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.25} ${x2} ${y2}`;

export default function Global() {
  return (
    <section className="mx-auto max-w-[min(92vw,96rem)] px-5 py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Heading eyebrow="Global" title="Built for a global digital world." sub="Building digital experiences for ambitious brands worldwide." />
          <div className="space-y-4">
            {POINTS.map(([t, d], i) => (
              <div key={t} data-reveal data-delay={i * 0.1} className="glass rounded-2xl p-6">
                <h3 className="text-xl font-bold">{t}</h3>
                <p className="mt-2 text-lg text-slate-300">{d}</p>
              </div>
            ))}
          </div>
        </div>
        <svg data-reveal viewBox="0 0 360 180" role="img" aria-label="Network of connected points across the world" className="w-full">
          <defs>
            <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r=".8" fill="rgba(148,163,184,.3)" /></pattern>
            <radialGradient id="fade"><stop offset="55%" stopColor="#fff" /><stop offset="100%" stopColor="#000" /></radialGradient>
            <mask id="m"><rect width="360" height="180" fill="url(#fade)" /></mask>
          </defs>
          <rect width="360" height="180" fill="url(#dots)" mask="url(#m)" />
          {LINKS.map(([a, b]) => <path key={`${a}${b}`} d={arc(NODES[a], NODES[b])} fill="none" stroke="#6366f1" strokeOpacity=".7" strokeWidth=".7" strokeDasharray="3 5" style={{ animation: "dash 2.5s linear infinite" }} />)}
          {NODES.map(([x, y], i) => (
            <g key={i}>
              {i === HUB && <circle cx={x} cy={y} r="3" fill="none" stroke="#22d3ee" style={{ transformOrigin: `${x}px ${y}px`, animation: "ping 2.4s ease-out infinite" }} />}
              <circle cx={x} cy={y} r={i === HUB ? 2.6 : 1.8} fill={i === HUB ? "#22d3ee" : "#a5b4fc"} />
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
