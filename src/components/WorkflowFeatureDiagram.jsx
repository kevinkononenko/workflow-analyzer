export default function WorkflowFeatureDiagram({ diagram }) {
  if (!diagram) return null;

  return (
    <section className="workflow-feature-diagram" aria-labelledby="feature-diagram-title">
      <div className="workflow-section-heading">
        <h2 id="feature-diagram-title">DIAGRAM</h2>
      </div>
      <div className="feature-diagram-frame">
        <img src={diagram.src} alt={diagram.alt} />
      </div>
    </section>
  );
}
