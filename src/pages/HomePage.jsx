import { Link } from "react-router-dom";
import ProductMark from "../components/ProductMark";
import SiteHeader from "../components/SiteHeader";
import StageExplorer from "../components/StageExplorer";
import { products } from "../data/products";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />

      <section className="intro" aria-labelledby="page-title">
        <p className="eyebrow">B2B product patterns, mapped</p>
        <h1 id="page-title">How do customers actually use this product?</h1>
        <p className="intro-copy">
          Users need to complete a real workflow in B2B—not just use features. See how these
          products help them get real work done.
        </p>
      </section>

      <section className="catalog" aria-labelledby="catalog-title">
        <div className="catalog-heading">
          <h2 id="catalog-title">Workflows</h2>
          <span>Choose a starting point</span>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <Link
              className="product-card"
              to={`/${product.slug}/`}
              key={product.name}
              style={{ "--brand": product.color }}
              aria-label={`Inspect the ${product.name} workflow`}
            >
              <div className="card-topline">
                <ProductMark {...product} />
                <span className="card-code">{product.code}</span>
              </div>
              <div className="card-copy">
                <h3>{product.description}</h3>
                <dl className="card-meta">
                  <div>
                    <dt>Product</dt>
                    <dd>{product.name}</dd>
                  </div>
                  <div>
                    <dt>Persona</dt>
                    <dd>{product.persona}</dd>
                  </div>
                  <div>
                    <dt>Product type</dt>
                    <dd>{product.productType}</dd>
                  </div>
                </dl>
              </div>
              <span className="card-action">Inspect workflow</span>
            </Link>
          ))}
        </div>
      </section>

      <StageExplorer />
    </main>
  );
}
