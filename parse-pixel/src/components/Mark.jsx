const CELLS = [[0,0],[1,0],[2,0],[0,1],[3,1],[0,2],[1,2],[2,2],[0,3],[0,4]];
export default function Mark({ className = "h-9 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 28 33" aria-hidden>
      {CELLS.map(([c, r]) => <rect key={`${c}${r}`} x={c * 7} y={r * 7} width="5.5" height="5.5" rx="1" fill="#6366f1" />)}
      <rect x="21" y="28" width="5.5" height="5.5" rx="1" fill="#22d3ee" />
    </svg>
  );
}
