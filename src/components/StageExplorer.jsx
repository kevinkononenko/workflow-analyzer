import { useMemo, useState } from "react";
import { findSolutionsByStages } from "../data/solutions";
import { workflowStageIds, workflowStages } from "../data/workflowStages";

function getInitialStages() {
  if (typeof window === "undefined") return [];

  const stages = new URLSearchParams(window.location.search).get("stages");
  if (!stages) return [];

  return [...new Set(stages.split(",").filter((stage) => workflowStageIds.has(stage)))];
}

function updateStageQuery(selectedStages) {
  const url = new URL(window.location.href);

  if (selectedStages.length > 0) {
    url.searchParams.set("stages", selectedStages.join(","));
  } else {
    url.searchParams.delete("stages");
  }

  window.history.replaceState({}, "", url);
}

function StageExplorer() {
  const [selectedStages, setSelectedStages] = useState(getInitialStages);
  const matches = useMemo(
    () => findSolutionsByStages(selectedStages),
    [selectedStages],
  );

  function toggleStage(stageId) {
    const nextStages = selectedStages.includes(stageId)
      ? selectedStages.filter((id) => id !== stageId)
      : [...selectedStages, stageId];

    setSelectedStages(nextStages);
    updateStageQuery(nextStages);
  }

  function clearStages() {
    setSelectedStages([]);
    updateStageQuery([]);
  }

  return (
    <section className="stage-explorer" aria-labelledby="stage-explorer-title">
      <div className="stage-explorer-heading">
        <div>
          <p className="section-kicker">Search across products</p>
          <h2 id="stage-explorer-title">Explore by workflow stage</h2>
        </div>
        <p>
          Select one or more stages to compare how products help customers move real work
          forward.
        </p>
      </div>

      <div className="stage-filter" aria-label="Filter by workflow stage">
        {workflowStages.map((stage) => {
          const isSelected = selectedStages.includes(stage.id);

          return (
            <button
              className="stage-filter-button"
              type="button"
              key={stage.id}
              aria-pressed={isSelected}
              onClick={() => toggleStage(stage.id)}
            >
              <span className="stage-number">{stage.number}</span>
              <span>{stage.name}</span>
            </button>
          );
        })}
      </div>

      <div className="results-bar" aria-live="polite">
        <span>
          {selectedStages.length === 0
            ? "No stages selected"
            : `${selectedStages.length} ${selectedStages.length === 1 ? "stage" : "stages"} selected`}
        </span>
        {selectedStages.length > 0 && (
          <button type="button" onClick={clearStages}>
            Clear selection
          </button>
        )}
      </div>

      <div className="solution-results">
        {matches.length === 0 && (
          <div className="solution-empty">
            <span className="empty-glyph" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="10.5" cy="10.5" r="6.75" />
                <path d="m15.5 15.5 5 5" />
              </svg>
            </span>
            <div>
              <h3>
                {selectedStages.length === 0
                  ? "Select a stage to begin"
                  : "Solution cards will appear here"}
              </h3>
              <p>
                {selectedStages.length === 0
                  ? "Choose any part of the workflow to search across all five products."
                  : "The filters are ready. Add the card format and product examples next."}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default StageExplorer;
