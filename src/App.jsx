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
    description: "Plan, assign, and track work from backlog to delivery.",
    icon: siJira,
    color: "#2684FF",
    code: "01",
    slug: "jira",
  },
  {
    name: "Google Drive",
    description: "Create, share, and collaborate on files from one place.",
    icon: siGoogledrive,
    color: "#4285F4",
    code: "02",
    slug: "google-drive",
  },
  {
    name: "GitHub",
    description: "Build, review, and ship software with your team.",
    icon: siGithub,
    color: "#F0F2F5",
    code: "03",
    slug: "github",
  },
  {
    name: "Salesforce",
    description: "Manage customer relationships from lead to renewal.",
    icon: siSalesforce,
    color: "#00A1E0",
    code: "04",
    slug: "salesforce",
  },
  {
    name: "Zoom",
    description: "Meet, collaborate, and make decisions across distance.",
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
