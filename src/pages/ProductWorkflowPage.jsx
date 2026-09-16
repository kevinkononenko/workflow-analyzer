import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductMark from "../components/ProductMark";
import SiteHeader from "../components/SiteHeader";
import WorkflowTimeline from "../components/WorkflowTimeline";
import { findProductBySlug } from "../data/products";
import { getProductWorkflow } from "../data/productWorkflows";

export default function ProductWorkflowPage() {
  const { productSlug } = useParams();
  const product = findProductBySlug(productSlug);

  useEffect(() => {
    if (!product) return undefined;

    const previousTitle = document.title;
    document.title = `${product.name} Workflow | Workflow Inspector`;
    return () => {
      document.title = previousTitle;
    };
  }, [product]);

  if (!product) return <Navigate to="/" replace />;

  const workflow = getProductWorkflow(product.slug);

  return (
    <main className="workflow-page" style={{ "--brand": product.color }}>
      <SiteHeader context="8 workflow stages" />

      <Link className="back-link" to="/">
        <ArrowLeft aria-hidden="true" size={16} />
        All products
      </Link>

      <section className="workflow-intro" aria-labelledby="workflow-title">
        <div className="workflow-product-lockup">
          <ProductMark {...product} className="product-mark-large" />
          <div>
            <h1 id="workflow-title">{product.name}</h1>
            <p className="workflow-card-description">{product.description}</p>
          </div>
        </div>
        <div className="workflow-summary">
          <dl>
            <div>
              <dt>Core user</dt>
              <dd>{product.persona}</dd>
            </div>
            <div>
              <dt>Product type</dt>
              <dd>{product.productType}</dd>
            </div>
            <div>
              <dt>Journey</dt>
              <dd>8 stages</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="workflow-timeline-section" aria-labelledby="timeline-title">
        <div className="workflow-section-heading">
          <div>
            <p className="section-kicker">Workflow map</p>
            <h2 id="timeline-title">Eight stages, one continuous job</h2>
          </div>
          <p>
            Follow how features support the user from defining the work through concluding it.
          </p>
        </div>

        <WorkflowTimeline workflow={workflow} />
      </section>
    </main>
  );
}
