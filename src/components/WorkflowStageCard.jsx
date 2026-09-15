import { Image as ImageIcon, ExternalLink } from "lucide-react";
import StageIcon from "./StageIcon";

export default function WorkflowStageCard({ stage, record }) {
  const hasScreenshot = Boolean(record.screenshot.src);
  const hasArticle = Boolean(record.article.url);

  return (
    <article className="workflow-stage-card">
      <header className="workflow-card-header">
        <span className="stage-icon-mark">
          <StageIcon stageId={stage.id} />
        </span>
        <div>
          <span>Stage {stage.number}</span>
          <h3>{stage.name}</h3>
        </div>
      </header>

      <div className="workflow-screenshot">
        {hasScreenshot ? (
          <img
            src={record.screenshot.src}
            alt={record.screenshot.alt}
            style={{
              objectPosition: record.screenshot.objectPosition,
              transform: `scale(${record.screenshot.scale})`,
              transformOrigin: record.screenshot.objectPosition,
            }}
          />
        ) : (
          <div className="screenshot-placeholder">
            <ImageIcon aria-hidden="true" size={24} strokeWidth={1.5} />
            <span>KB screenshot</span>
          </div>
        )}
      </div>

      <div className="workflow-card-body">
        <p className="workflow-field-label">Main feature</p>
        <p className={record.featureName ? "feature-name" : "content-placeholder"}>
          {record.featureName || "Feature name to add"}
        </p>
        <p className={record.description ? "workflow-description" : "content-placeholder"}>
          {record.description || "One-sentence workflow explanation to add."}
        </p>

        {hasArticle ? (
          <a className="kb-link" href={record.article.url} target="_blank" rel="noreferrer">
            {record.article.title || "Read the knowledge base article"}
            <ExternalLink aria-hidden="true" size={15} />
          </a>
        ) : (
          <span className="kb-link is-disabled" aria-disabled="true">
            KB article link to add
          </span>
        )}
      </div>
    </article>
  );
}
