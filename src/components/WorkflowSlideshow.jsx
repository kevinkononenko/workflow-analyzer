import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { workflowStages } from "../data/workflowStages";
import WorkflowStageCard from "./WorkflowStageCard";

export default function WorkflowSlideshow({
  workflow,
  activeStageId,
  onStageChange,
}) {
  const swipeRef = useRef(null);
  const recordsByStage = new Map(workflow.map((record) => [record.stageId, record]));
  const requestedIndex = workflowStages.findIndex((stage) => stage.id === activeStageId);
  const activeIndex = requestedIndex >= 0 ? requestedIndex : 0;
  const stage = workflowStages[activeIndex];
  const record = recordsByStage.get(stage.id);
  const previousStage = workflowStages[activeIndex - 1];
  const nextStage = workflowStages[activeIndex + 1];

  useEffect(() => {
    const navigateWithKeyboard = (event) => {
      const target = event.target;
      const isSlideshowControl =
        target instanceof HTMLElement &&
        target.closest(".workflow-slide-progress, .workflow-slideshow-controls");
      const isInteractive =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT", "A"].includes(target.tagName) ||
          (target.tagName === "BUTTON" && !isSlideshowControl));

      if (isInteractive || event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key === "ArrowLeft" && previousStage) {
        event.preventDefault();
        onStageChange(previousStage.id);
        requestAnimationFrame(() => {
          document.querySelector(`[data-slide-stage="${previousStage.id}"]`)?.focus();
        });
      }

      if (event.key === "ArrowRight" && nextStage) {
        event.preventDefault();
        onStageChange(nextStage.id);
        requestAnimationFrame(() => {
          document.querySelector(`[data-slide-stage="${nextStage.id}"]`)?.focus();
        });
      }
    };

    window.addEventListener("keydown", navigateWithKeyboard);
    return () => window.removeEventListener("keydown", navigateWithKeyboard);
  }, [nextStage, onStageChange, previousStage]);

  const beginSwipe = (event) => {
    if (
      event.pointerType !== "touch" ||
      event.target.closest(".workflow-screenshot, a, button, input")
    ) {
      return;
    }

    swipeRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  };

  const finishSwipe = (event) => {
    const swipe = swipeRef.current;
    if (!swipe || swipe.pointerId !== event.pointerId) return;

    swipeRef.current = null;
    const deltaX = event.clientX - swipe.x;
    const deltaY = event.clientY - swipe.y;

    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    if (deltaX > 0 && previousStage) onStageChange(previousStage.id);
    if (deltaX < 0 && nextStage) onStageChange(nextStage.id);
  };

  return (
    <div
      className="workflow-slideshow"
      aria-label="Workflow slideshow"
      onPointerDown={beginSwipe}
      onPointerUp={finishSwipe}
      onPointerCancel={() => {
        swipeRef.current = null;
      }}
    >
      <div className="workflow-slideshow-heading" aria-live="polite">
        <div>
          <span>{stage.number} of {String(workflowStages.length).padStart(2, "0")}</span>
          <h3>{stage.name}</h3>
        </div>
        <p>{stage.description}</p>
      </div>

      <nav className="workflow-slide-progress" aria-label="Choose a workflow stage">
        {workflowStages.map((item, index) => (
          <button
            key={item.id}
            type="button"
            data-slide-stage={item.id}
            className={index === activeIndex ? "is-active" : ""}
            aria-current={index === activeIndex ? "step" : undefined}
            aria-label={`Stage ${item.number}: ${item.name}`}
            onClick={() => onStageChange(item.id)}
          >
            <span>{item.number}</span>
            <strong>{item.name}</strong>
          </button>
        ))}
      </nav>

      <div className="workflow-slideshow-stage">
        <WorkflowStageCard key={stage.id} stage={stage} record={record} />
      </div>

      <nav className="workflow-slideshow-controls" aria-label="Slideshow navigation">
        <button
          type="button"
          disabled={!previousStage}
          onClick={() => previousStage && onStageChange(previousStage.id)}
        >
          <ChevronLeft aria-hidden="true" size={18} />
          <span>{previousStage ? previousStage.name : "Previous"}</span>
        </button>
        <span>Use ← → keys to navigate</span>
        <button
          type="button"
          disabled={!nextStage}
          onClick={() => nextStage && onStageChange(nextStage.id)}
        >
          <span>{nextStage ? nextStage.name : "Next"}</span>
          <ChevronRight aria-hidden="true" size={18} />
        </button>
      </nav>
    </div>
  );
}
