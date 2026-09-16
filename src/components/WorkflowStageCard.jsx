import {
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";
import AnnotatedScreenshot from "./AnnotatedScreenshot";
import StageIcon from "./StageIcon";

export default function WorkflowStageCard({
  stage,
  record,
}) {
  const hasScreenshot = Boolean(record.screenshot.src);
  const hasArticle = Boolean(record.article.url);

  return (
    <div className="workflow-stage-card-shell" id={`workflow-stage-${stage.id}`}>
      <article className="workflow-stage-card">
        <header className="workflow-card-mobile-header">
          <span className="stage-icon-mark">
            <StageIcon stageId={stage.id} />
          </span>
          <div>
            <span>Stage {stage.number}</span>
            <h3>{stage.name}</h3>
          </div>
        </header>

        {!record.outsideProduct && (
          <div className="workflow-screenshot">
            {hasScreenshot ? (
              <AnnotatedScreenshot
                screenshot={record.screenshot}
                annotationId={record.id}
              />
            ) : (
              <div className="screenshot-placeholder">
                <ImageIcon aria-hidden="true" size={24} strokeWidth={1.5} />
                <span>KB screenshot</span>
              </div>
            )}
            {record.screenshot.credit && (
              <a
                className="image-credit"
                href={record.screenshot.creditUrl}
                target="_blank"
                rel="noreferrer"
              >
                Photo: {record.screenshot.credit}
              </a>
            )}
          </div>
        )}

        <div className="workflow-card-body">
          <p className={record.featureName ? "feature-name" : "content-placeholder"}>
            {record.featureName || "Feature name to add"}
          </p>
          <p className={record.description ? "workflow-description" : "content-placeholder"}>
            {record.description || "One-sentence workflow explanation to add."}
          </p>

          {record.frictionRisk && (
            <div className="workflow-friction-risk">
              <span>Friction or risk</span>
              <p>{record.frictionRisk}</p>
            </div>
          )}

          {record.outsideProduct ? (
            <span className="outside-product-note">This stage happens outside Jira</span>
          ) : hasArticle ? (
            <a className="kb-link" href={record.article.url} target="_blank" rel="noreferrer">
              {record.featureName}
              <ExternalLink aria-hidden="true" size={15} />
            </a>
          ) : (
            <span className="kb-link is-disabled" aria-disabled="true">
              KB article link to add
            </span>
          )}
        </div>
      </article>
    </div>
  );
}
