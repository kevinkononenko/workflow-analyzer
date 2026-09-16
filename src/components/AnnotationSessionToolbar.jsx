import { useState } from "react";
import { ClipboardCheck, Trash2 } from "lucide-react";

function parseSavedValue(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

export default function AnnotationSessionToolbar({ productSlug, workflow }) {
  const [status, setStatus] = useState("Changes autosave while you work");

  const saveAllCoordinates = async () => {
    const stages = Object.fromEntries(
      workflow
        .filter((record) => !record.outsideProduct && record.screenshot.src)
        .map((record) => {
          const screenshotKey = record.screenshot.annotationKey ?? record.screenshot.src;
          const annotationKey = `workflow-inspector:annotations:${record.id}:${screenshotKey}`;
          const zoomKey = `workflow-inspector:zoom:${record.id}:${screenshotKey}`;
          const storedZoom = Number(localStorage.getItem(zoomKey));

          return [
            record.stageId,
            {
              zoom: Number.isFinite(storedZoom) && storedZoom >= 1 ? storedZoom : 1,
              highlights: parseSavedValue(annotationKey, record.screenshot.highlights),
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

    localStorage.setItem(
      `workflow-inspector:calibration-export:${productSlug}`,
      serialized,
    );

    try {
      await navigator.clipboard.writeText(serialized);
      setStatus(`${Object.keys(stages).length} screenshots saved and copied`);
    } catch {
      setStatus(`${Object.keys(stages).length} screenshots saved in this browser`);
    }
  };

  const clearAllBoxes = () => {
    workflow
      .filter((record) => !record.outsideProduct && record.screenshot.src)
      .forEach((record) => {
        const screenshotKey = record.screenshot.annotationKey ?? record.screenshot.src;
        const annotationKey = `workflow-inspector:annotations:${record.id}:${screenshotKey}`;
        localStorage.setItem(annotationKey, "[]");
      });

    window.dispatchEvent(new CustomEvent("workflow-inspector:clear-all-annotations"));
    setStatus("All screenshot boxes cleared");
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
