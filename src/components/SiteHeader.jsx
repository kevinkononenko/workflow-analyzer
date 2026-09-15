import { Link } from "react-router-dom";

export default function SiteHeader({ context = "5 products" }) {
  return (
    <header className="site-header">
      <Link className="wordmark" to="/" aria-label="Workflow Inspector home">
        <span className="wordmark-glyph" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <circle cx="10.5" cy="10.5" r="6.75" />
            <path d="m15.5 15.5 5 5" />
          </svg>
        </span>
        <span>Workflow Inspector</span>
      </Link>
      <div className="header-meta" aria-label="Library context">
        <span>Pattern library</span>
        <span className="meta-divider" aria-hidden="true" />
        <span>{context}</span>
      </div>
    </header>
  );
}
