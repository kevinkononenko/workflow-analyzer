export default function ProductMark({ icon, color, name, className = "" }) {
  return (
    <span
      className={`product-mark ${className}`.trim()}
      style={{ "--brand": color }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24">
        <path d={icon.path} />
      </svg>
      <span className="sr-only">{name}</span>
    </span>
  );
}
