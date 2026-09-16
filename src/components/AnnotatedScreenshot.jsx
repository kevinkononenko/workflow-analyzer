import { useEffect, useMemo, useState } from "react";
import {
  Annotorious,
  ImageAnnotator,
  UserSelectAction,
  useAnnotator,
} from "@annotorious/react";
import "@annotorious/react/annotorious-react.css";

const annotationStyle = {
  fill: "#e7ff56",
  fillOpacity: 0.035,
  stroke: "#dfff2f",
  strokeOpacity: 1,
  strokeWidth: 2,
};

function toAnnotation(highlight, image) {
  const x = (highlight.x / 100) * image.naturalWidth;
  const y = (highlight.y / 100) * image.naturalHeight;
  const width = (highlight.width / 100) * image.naturalWidth;
  const height = (highlight.height / 100) * image.naturalHeight;

  return {
    id: highlight.id,
    bodies: [],
    target: {
      annotation: highlight.id,
      selector: {
        type: "RECTANGLE",
        geometry: {
          x,
          y,
          w: width,
          h: height,
          bounds: {
            minX: x,
            minY: y,
            maxX: x + width,
            maxY: y + height,
          },
        },
      },
    },
  };
}

function toHighlight(annotation, image) {
  const { geometry } = annotation.target.selector;
  const round = (value) => Math.round(value * 1000) / 1000;

  return {
    id: annotation.id,
    x: round((geometry.x / image.naturalWidth) * 100),
    y: round((geometry.y / image.naturalHeight) * 100),
    width: round((geometry.w / image.naturalWidth) * 100),
    height: round((geometry.h / image.naturalHeight) * 100),
  };
}

function readSavedHighlights(storageKey) {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function AnnotationController({
  highlights,
  storageKey,
  editing,
  zoom,
  onZoomChange,
}) {
  const annotator = useAnnotator();
  const [status, setStatus] = useState("Ready");

  useEffect(() => {
    if (!annotator) return;

    const image = annotator.element.querySelector("img");
    if (!image?.naturalWidth || !image?.naturalHeight) return;

    const savedHighlights = readSavedHighlights(storageKey);
    const annotations = (savedHighlights ?? highlights).map((highlight) =>
      toAnnotation(highlight, image),
    );

    annotator.setAnnotations(annotations);

    if (!editing) return undefined;

    const save = () => {
      const normalized = annotator
        .getAnnotations()
        .map((annotation) => toHighlight(annotation, image));
      localStorage.setItem(storageKey, JSON.stringify(normalized));
      setStatus(`Saved ${normalized.length} region${normalized.length === 1 ? "" : "s"}`);
    };

    annotator.on("createAnnotation", save);
    annotator.on("updateAnnotation", save);
    annotator.on("deleteAnnotation", save);

    const clearAll = () => {
      annotator.clearAnnotations();
      localStorage.setItem(storageKey, "[]");
      setStatus("Cleared");
    };
    window.addEventListener("workflow-inspector:clear-all-annotations", clearAll);

    return () => {
      annotator.off("createAnnotation", save);
      annotator.off("updateAnnotation", save);
      annotator.off("deleteAnnotation", save);
      window.removeEventListener("workflow-inspector:clear-all-annotations", clearAll);
    };
  }, [annotator, editing, highlights, storageKey]);

  if (!editing || !annotator) return null;

  const getImage = () => annotator.element.querySelector("img");

  const reset = () => {
    const image = getImage();
    if (!image) return;
    localStorage.removeItem(storageKey);
    annotator.setAnnotations(highlights.map((highlight) => toAnnotation(highlight, image)));
    setStatus("Reset to defaults");
  };

  const clear = () => {
    annotator.clearAnnotations();
    localStorage.setItem(storageKey, "[]");
    setStatus("Cleared");
  };

  const deleteSelected = () => {
    const selected = annotator.getSelected();
    if (!selected.length) {
      setStatus("Select a box first");
      return;
    }

    selected.forEach((annotation) => annotator.removeAnnotation(annotation.id));
    setStatus("Selected box deleted");
  };

  return (
    <div className="annotation-editor-toolbar">
      <span>{status}</span>
      <div className="annotation-zoom-control">
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => onZoomChange(zoom - 0.1)}
        >
          −
        </button>
        <label>
          Zoom
          <input
            type="range"
            min="1"
            max="2.5"
            step="0.05"
            value={zoom}
            onChange={(event) => onZoomChange(Number(event.target.value))}
          />
          <output>{Math.round(zoom * 100)}%</output>
        </label>
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => onZoomChange(zoom + 0.1)}
        >
          +
        </button>
        <button type="button" onClick={() => onZoomChange(1)}>Fit</button>
      </div>
      <button type="button" onClick={deleteSelected}>Delete selected</button>
      <button type="button" onClick={reset}>Reset</button>
      <button type="button" onClick={clear}>Clear</button>
    </div>
  );
}

export default function AnnotatedScreenshot({
  screenshot,
  annotationId,
}) {
  const editing = useMemo(() => {
    if (!import.meta.env.DEV) return false;
    return new URLSearchParams(window.location.search).get("annotate") === "1";
  }, []);
  const screenshotKey = screenshot.annotationKey ?? screenshot.src;
  const storageKey = `workflow-inspector:annotations:${annotationId}:${screenshotKey}`;
  const zoomStorageKey = `workflow-inspector:zoom:${annotationId}:${screenshotKey}`;
  const [zoom, setZoom] = useState(() => {
    const saved = Number(localStorage.getItem(zoomStorageKey));
    return Number.isFinite(saved) && saved >= 1 ? saved : screenshot.scale;
  });

  const updateZoom = (nextZoom) => {
    const clamped = Math.min(2.5, Math.max(1, nextZoom));
    const rounded = Math.round(clamped * 20) / 20;
    setZoom(rounded);
    localStorage.setItem(zoomStorageKey, String(rounded));
  };

  return (
    <Annotorious>
      <AnnotationController
        highlights={screenshot.highlights}
        storageKey={storageKey}
        editing={editing}
        zoom={zoom}
        onZoomChange={updateZoom}
      />
      <div
        className="annotation-zoom-layer"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: screenshot.objectPosition,
        }}
      >
        <ImageAnnotator
          containerClassName="annotorious-screenshot"
          drawingEnabled={editing}
          userSelectAction={editing ? UserSelectAction.EDIT : UserSelectAction.NONE}
          style={annotationStyle}
        >
          <img
            className="workflow-screenshot-image"
            src={screenshot.src}
            alt={screenshot.alt}
          />
        </ImageAnnotator>
      </div>
    </Annotorious>
  );
}
