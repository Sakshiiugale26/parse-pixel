import Heading from "../components/Heading";
import ServiceCard from "../components/ServiceCard";
import { Phone, Browser, PixelWave } from "../components/ServiceVisuals";
const ITEMS = [
  { n: "01", title: "Custom App Development", text: "High-performance mobile applications designed around your users, your product and your business goals.", tags: ["iOS", "Android", "Cross-platform", "React Native", "Scalable architecture"], Visual: Phone },
  { n: "02", title: "Web Development", text: "Modern websites and web applications engineered for speed, scalability and exceptional digital experiences.", tags: ["Web applications", "Business websites", "SaaS platforms", "Modern UI/UX", "Performance"], Visual: Browser },
  { n: "03", title: "AI Motion & Graphic Design", text: "AI-powered motion graphics and visual experiences that turn ideas into memorable digital stories.", tags: ["AI video", "Motion graphics", "Brand films", "Social creatives", "Generative visuals"], Visual: PixelWave },
];
export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-[min(92vw,96rem)] px-5 py-28">
      <Heading eyebrow="Services" title="What we build" sub="Technology, engineering and visual creativity working together." />
      <div className="grid gap-6 lg:grid-cols-3">
        {ITEMS.map(({ Visual, ...i }, k) => <ServiceCard key={i.n} {...i} delay={k * 0.12}><Visual /></ServiceCard>)}
      </div>
    </section>
  );
}
