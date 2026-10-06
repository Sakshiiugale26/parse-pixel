export default function Heading({ title, sub }) {
  return (
    <div data-reveal className="mb-14 max-w-3xl">
      <h2 className="text-[clamp(2rem,4.6vw,4.2rem)] font-extrabold leading-[1.05] tracking-tight">{title}</h2>
      {sub && <p className="mt-5 text-xl text-slate-300">{sub}</p>}
    </div>
  );
}
