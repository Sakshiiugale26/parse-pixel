import { useEffect } from "react";
import { gsap, reduced } from "../animations/gsap";
export default function useReveal() {
  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) =>
        gsap.from(el, {
          y: 44, opacity: 0, duration: 0.9, ease: "power3.out", delay: Number(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }));
    });
    return () => ctx.revert();
  }, []);
}
