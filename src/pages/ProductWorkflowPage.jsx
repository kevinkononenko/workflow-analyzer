import { useEffect } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AnnotationSessionToolbar from "../components/AnnotationSessionToolbar";
import ProductMark from "../components/ProductMark";
import SiteHeader from "../components/SiteHeader";
import WorkflowFeatureDiagram from "../components/WorkflowFeatureDiagram";
import WorkflowSlideshow from "../components/WorkflowSlideshow";
import WorkflowTimeline from "../components/WorkflowTimeline";
import { getProductDiagram } from "../data/productDiagrams";
import { findProductBySlug } from "../data/products";
import { getProductWorkflow } from "../data/productWorkflows";
import { workflowStageIds, workflowStages } from "../data/workflowStages";

export default function ProductWorkflowPage() {
  const { productSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
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
  const featureDiagram = getProductDiagram(product.slug);
  const workflowView = searchParams.get("view") === "slides" ? "slides" : "timeline";
  const requestedStageId = searchParams.get("stage");
  const activeStageId = workflowStageIds.has(requestedStageId)
    ? requestedStageId
    : workflowStages[0].id;
  const annotationMode =
    import.meta.env.DEV &&
    searchParams.get("annotate") === "1";

  const setWorkflowView = (view) => {
    const nextParams = new URLSearchParams(searchParams);

    if (view === "slides") {
      nextParams.set("view", "slides");
      nextParams.set("stage", activeStageId);
    } else {
      nextParams.delete("view");
      nextParams.delete("stage");
    }

    setSearchParams(nextParams, { replace: true });
  };

  const setActiveStage = (stageId) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("view", "slides");
    nextParams.set("stage", stageId);
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <main className="workflow-page" style={{ "--brand": product.color }}>
      <SiteHeader context="8 workflow stages" />

      <Link className="back-link" to="/">
        <ArrowLeft aria-hidden="true" size={16} />
        All products
      </Link>

      {annotationMode && (
        <AnnotationSessionToolbar productSlug={product.slug} workflow={workflow} />
      )}

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
              <dd>{product.journey ?? "8 stages"}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="workflow-timeline-section" aria-labelledby="timeline-title">
        <div className="workflow-section-heading workflow-map-heading">
          <h2 id="timeline-title">WORKFLOW MAP</h2>
          <div className="workflow-view-toggle" role="group" aria-label="Workflow view">
            <button
              type="button"
              aria-pressed={workflowView === "timeline"}
              onClick={() => setWorkflowView("timeline")}
            >
              Timeline
            </button>
            <button
              type="button"
              aria-pressed={workflowView === "slides"}
              onClick={() => setWorkflowView("slides")}
            >
              Slideshow
            </button>
          </div>
        </div>

        {workflowView === "slides" ? (
          <WorkflowSlideshow
            workflow={workflow}
            activeStageId={activeStageId}
            onStageChange={setActiveStage}
          />
        ) : (
          <WorkflowTimeline workflow={workflow} />
        )}
      </section>

      <WorkflowFeatureDiagram diagram={featureDiagram} />
    </main>
  );
}
