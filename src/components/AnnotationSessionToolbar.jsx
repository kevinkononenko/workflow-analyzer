import { useState } from "react";
import { ClipboardCheck, Trash2 } from "lucide-react";
import { getSessionCalibration } from "../data/annotationSession";

export default function AnnotationSessionToolbar({ productSlug, workflow }) {
  const [status, setStatus] = useState("Edits last until refresh unless exported");

  const saveAllCoordinates = async () => {
    const stages = Object.fromEntries(
      workflow
        .filter((record) => !record.outsideProduct && record.screenshot.src)
        .map((record) => {
          const session = getSessionCalibration(record.id);

          return [
            record.stageId,
            {
              zoom: session?.zoom ?? record.screenshot.scale,
              panX: session?.panX ?? record.screenshot.panX,
              panY: session?.panY ?? record.screenshot.panY,
              highlights: session?.highlights ?? record.screenshot.highlights,
            },
          ];
        }),
    );

    const exportData = {
      productSlug,
      savedAt: new Date().toISOString(),
      stages,
    };
    const serialized = JSON.stringify(exportData, null, 2);

    try {
      await navigator.clipboard.writeText(serialized);
      setStatus(`${Object.keys(stages).length} screenshots exported and copied`);
    } catch {
      setStatus("Could not copy the calibration JSON");
    }
  };

  const clearAllBoxes = () => {
    window.dispatchEvent(new CustomEvent("workflow-inspector:clear-all-annotations"));
    setStatus("All boxes cleared for this session");
  };

  return (
    <aside className="annotation-session-toolbar" aria-label="Annotation calibration session">
      <div>
        <strong>Calibration mode</strong>
        <span>{status}</span>
      </div>
      <div className="annotation-session-actions">
        <button className="is-secondary" type="button" onClick={clearAllBoxes}>
          <Trash2 aria-hidden="true" size={16} />
          Clear all boxes
        </button>
        <button type="button" onClick={saveAllCoordinates}>
          <ClipboardCheck aria-hidden="true" size={17} />
          Save all coordinates
        </button>
      </div>
    </aside>
  );
}
