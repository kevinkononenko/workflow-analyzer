import {
  siGithub,
  siGoogledrive,
  siJira,
  siSalesforce,
  siZoom,
} from "simple-icons/icons";

const products = [
  {
    name: "Jira",
    description: "Track my work from assignment to done.",
    icon: siJira,
    color: "#2684FF",
    code: "01",
    slug: "jira",
  },
  {
    name: "Google Drive",
    description: "Create, organize, and share the files my team needs.",
    icon: siGoogledrive,
    color: "#4285F4",
    code: "02",
    slug: "google-drive",
  },
  {
    name: "GitHub",
    description: "Build, review, and ship software with my team.",
    icon: siGithub,
    color: "#F0F2F5",
    code: "03",
    slug: "github",
  },
  {
    name: "Salesforce",
    description: "Know which deal to advance and what I need to do next.",
    icon: siSalesforce,
    color: "#00A1E0",
    code: "04",
    slug: "salesforce",
  },
  {
    name: "Zoom",
    description: "Meet with people, align quickly, and move decisions forward.",
    icon: siZoom,
    color: "#2D8CFF",
    code: "05",
    slug: "zoom",
  },
];

function ProductMark({ icon, color, name }) {
  return (
    <span className="product-mark" style={{ "--brand": color }} aria-hidden="true">
      <svg role="img" viewBox="0 0 24 24" aria-label={`${name} logo`}>
        <path d={icon.path} />
      </svg>
    </span>
  );
}

function App() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="/workflow-analyzer/" aria-label="Workflow Inspector home">
          <span className="wordmark-glyph" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="10.5" cy="10.5" r="6.75" />
              <path d="m15.5 15.5 5 5" />
            </svg>
          </span>
          <span>Workflow Inspector</span>
        </a>
        <div className="header-meta" aria-label="Library status">
          <span>Pattern library</span>
          <span className="meta-divider" aria-hidden="true" />
          <span>5 products</span>
        </div>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <p className="eyebrow">B2B product patterns, mapped</p>
        <h1 id="page-title">What workflow does this product own?</h1>
        <p className="intro-copy">
          Explore the essential customer journey behind the tools teams use to get work done.
        </p>
      </section>

      <section className="catalog" aria-labelledby="catalog-title">
        <div className="catalog-heading">
          <h2 id="catalog-title">Products</h2>
          <span>Choose a starting point</span>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <a
              className="product-card"
              href={`/workflow-analyzer/${product.slug}/`}
              key={product.name}
              style={{ "--brand": product.color }}
              aria-label={`Inspect the ${product.name} workflow`}
            >
              <div className="card-topline">
                <ProductMark {...product} />
                <span className="card-code">{product.code}</span>
              </div>
              <div className="card-copy">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
              <span className="card-action">Inspect workflow</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
