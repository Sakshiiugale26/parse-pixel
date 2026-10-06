import { useRef } from "react";
// Sets --rx/--ry (tilt) and --mx/--my (light position) on the element; styles live in index.css (.tilt)
export default function useTilt(max = 14) {
  const ref = useRef();
  const onPointerMove = (e) => {
    const el = ref.current, r = el.getBoundingClientRect();
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * max}deg`);
    el.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * max}deg`);
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const onPointerLeave = () => { ref.current.style.setProperty("--rx", "0deg"); ref.current.style.setProperty("--ry", "0deg"); };
  return { ref, onPointerMove, onPointerLeave };
}
