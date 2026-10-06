import { useState } from "react";
import Button from "../components/Button";
import FormField from "../components/FormField";
import Heading from "../components/Heading";
const WHATSAPP_NUMBER = "918888126270"; // country code + number, digits only
const TYPES = ["Mobile App", "Web Development", "AI Motion & Graphic Design", "UI/UX Design", "Other"];
const COUNTRIES = ["India", "United States", "United Kingdom", "Canada", "Australia", "UAE", "Saudi Arabia", "Singapore", "Germany", "France", "Other"];
const BUDGETS = {
  INR: ["Under ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000 – ₹3,00,000", "₹3,00,000 – ₹5,00,000", "₹5,00,000 – ₹10,00,000", "₹10,00,000+"],
  USD: ["Under $1,000", "$1,000 – $2,500", "$2,500 – $5,000", "$5,000 – $10,000", "$10,000 – $25,000", "$25,000+"],
};
const initialCurrency = () => {
  try { const s = localStorage.getItem("pp-currency"); if (s in BUDGETS) return s; } catch { /* storage unavailable */ }
  return navigator.language?.endsWith("-IN") ? "INR" : "USD";
};
const field = (bad) => `mt-2 w-full rounded-lg border bg-[#050816]/70 px-5 py-3.5 text-lg text-slate-100 placeholder:text-slate-500 transition-shadow focus:outline-none focus:shadow-[0_0_0_3px_rgba(99,102,241,.25)] ${bad ? "border-rose-400/60" : "border-white/10 focus:border-cyan-300/60"}`;

export default function Contact() {
  const [cur, setCur] = useState(initialCurrency);
  const [f, setF] = useState({ name: "", email: "", company: "", country: "", type: TYPES[0], budget: BUDGETS[cur][0], brief: "" });
  const [errs, setErrs] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | done
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const pick = (c) => {
    setCur(c); setF({ ...f, budget: BUDGETS[c][0] });
    try { localStorage.setItem("pp-currency", c); } catch { /* storage unavailable */ }
  };
  const props = (k) => ({ id: k, value: f[k], onChange: set(k), "aria-invalid": !!errs[k], "aria-describedby": errs[k] ? `${k}-err` : undefined });
  const submit = (e) => {
    e.preventDefault();
    const v = {};
    if (!f.name.trim()) v.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) v.email = "Please enter a valid work email.";
    if (f.brief.trim().length < 10) v.brief = "Please share a short brief (at least 10 characters).";
    setErrs(v);
    if (Object.keys(v).length) return;
    const text = ["New project inquiry", `Name: ${f.name.trim()}`, `Email: ${f.email.trim()}`, `Company: ${f.company.trim() || "-"}`, `Country: ${f.country || "-"}`,
      `Project type: ${f.type}`, `Budget (${cur}): ${f.budget}`, `Brief: ${f.brief.trim()}`].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setStatus("loading");
    setTimeout(() => setStatus("done"), 900);
  };
  return (
    <section id="contact" className="mx-auto max-w-[min(92vw,96rem)] px-5 py-28">
      <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <Heading eyebrow="Contact" title={<>Let's build<br />what's next.</>} sub="Have an idea, product or visual experience in mind? Tell us what you're building." />
        {status === "done" ? (
          <div role="status" className="glass flex flex-col items-start justify-center gap-5 rounded-2xl p-10">
            <h3 className="text-3xl font-bold">Thanks — we've received your project details. We'll be in touch shortly.</h3>
            <p className="text-xl text-slate-300">Press send in the WhatsApp tab that just opened to deliver your message.</p>
            <Button variant="ghost" onClick={() => { setStatus("idle"); setF({ ...f, name: "", email: "", company: "", brief: "" }); }}>Send another inquiry</Button>
          </div>
        ) : (
          <form data-reveal onSubmit={submit} noValidate className="glass grid gap-6 rounded-2xl p-6 shadow-[0_0_80px_rgba(99,102,241,.12)] sm:grid-cols-2 sm:p-10">
            <FormField id="name" label="Name" error={errs.name}><input className={field(errs.name)} autoComplete="name" {...props("name")} /></FormField>
            <FormField id="email" label="Work email" error={errs.email}><input type="email" className={field(errs.email)} autoComplete="email" {...props("email")} /></FormField>
            <FormField id="company" label="Company"><input className={field()} autoComplete="organization" {...props("company")} /></FormField>
            <FormField id="country" label="Country"><select className={field()} {...props("country")}><option value="">Select country</option>{COUNTRIES.map((c) => <option key={c}>{c}</option>)}</select></FormField>
            <FormField id="type" label="Project type" className="sm:col-span-2"><select className={field()} {...props("type")}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></FormField>
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="budget" className="text-base font-medium">Budget</label>
                <div role="group" aria-label="Currency" className="flex rounded-lg border border-white/10 p-1 text-sm">
                  {["INR", "USD"].map((c) => (
                    <button key={c} type="button" aria-pressed={cur === c} onClick={() => pick(c)}
                      className={`rounded-md px-4 py-1.5 font-medium transition-colors ${cur === c ? "bg-white/15 text-white" : "text-slate-400 hover:text-white"}`}>{c === "INR" ? "INR ₹" : "USD $"}</button>
                  ))}
                </div>
              </div>
              <select id="budget" className={field()} value={f.budget} onChange={set("budget")}>{BUDGETS[cur].map((b) => <option key={b}>{b}</option>)}</select>
            </div>
            <FormField id="brief" label="Project brief" error={errs.brief} className="sm:col-span-2">
              <textarea rows={5} className={`${field(errs.brief)} resize-none`} placeholder="What are you building, and what does success look like?" {...props("brief")} />
            </FormField>
            <Button type="submit" className="sm:col-span-2" disabled={status === "loading"}>{status === "loading" ? "Sending…" : "Start a Conversation"}</Button>
          </form>
        )}
      </div>
    </section>
  );
}
