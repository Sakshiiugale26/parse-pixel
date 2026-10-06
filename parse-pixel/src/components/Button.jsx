import { useRef } from "react";
export default function Button({ href, type, onClick, disabled, variant = "primary", className = "", children }) {
  const ref = useRef();
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
  };
  const Tag = href ? "a" : "button";
  return (
    <Tag ref={ref} href={href} type={type} onClick={onClick} disabled={disabled} onPointerMove={move}
      onPointerLeave={() => (ref.current.style.transform = "")} className={`btn ${variant} ${className}`}>
      {children}
    </Tag>
  );
}
