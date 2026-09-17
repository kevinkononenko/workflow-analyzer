export default function ProductMark({ icon, logoSrc, color, name, className = "" }) {
  return (
    <span
      className={`product-mark ${className}`.trim()}
      style={{ "--brand": color }}
      aria-hidden="true"
    >
      {logoSrc ? (
        <img src={logoSrc} alt="" />
      ) : icon?.path ? (
        <svg viewBox="0 0 24 24">
          <path d={icon.path} />
        </svg>
      ) : (
        <span className="product-mark-monogram">{name.slice(0, 1)}</span>
      )}
      <span className="sr-only">{name}</span>
    </span>
  );
}
