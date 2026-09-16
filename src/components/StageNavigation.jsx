import { ChevronDown, ChevronUp } from "lucide-react";

export default function StageNavigation({
  stageName,
  previousStageId,
  nextStageId,
}) {
  const scrollToStage = (event, stageId) => {
    event.preventDefault();
    event.stopPropagation();
    if (!stageId) return;

    const target = document.getElementById(`workflow-stage-${stageId}`);
    if (!target) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  return (
    <nav className="workflow-stage-navigation" aria-label={`${stageName} stage navigation`}>
      <button
        type="button"
        aria-label="Previous workflow stage"
        title="Previous stage"
        disabled={!previousStageId}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => scrollToStage(event, previousStageId)}
      >
        <ChevronUp aria-hidden="true" size={18} />
      </button>
      <button
        type="button"
        aria-label="Next workflow stage"
        title="Next stage"
        disabled={!nextStageId}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => scrollToStage(event, nextStageId)}
      >
        <ChevronDown aria-hidden="true" size={18} />
      </button>
    </nav>
  );
}
