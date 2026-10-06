export default function FormField({ label, id, error, className = "", children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-base font-medium">{label}</label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="mt-2 text-sm text-rose-300">{error}</p>}
    </div>
  );
}
