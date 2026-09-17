import { useEffect, useMemo, useRef, useState } from "react";
import {
  Annotorious,
  ImageAnnotator,
  UserSelectAction,
  useAnnotator,
} from "@annotorious/react";
import "@annotorious/react/annotorious-react.css";
import { updateSessionCalibration } from "../data/annotationSession";

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

function AnnotationController({
  highlights,
  annotationId,
  editing,
  zoom,
  onZoomChange,
  panMode,
  onPanModeChange,
  onFit,
}) {
  const annotator = useAnnotator();
  const [status, setStatus] = useState("Ready");

  useEffect(() => {
    if (!editing) return;
    setStatus(panMode ? "Pan mode: drag the image" : "Draw mode: drag to add a box");
  }, [editing, panMode]);

  useEffect(() => {
    if (!annotator) return;

    const image = annotator.element.querySelector("img");
    if (!image?.naturalWidth || !image?.naturalHeight) return;

    const annotations = highlights.map((highlight) =>
      toAnnotation(highlight, image),
    );

    annotator.setAnnotations(annotations);

    if (!editing) return undefined;

    const save = () => {
      const normalized = annotator
        .getAnnotations()
        .map((annotation) => toHighlight(annotation, image));
      updateSessionCalibration(annotationId, { highlights: normalized });
      setStatus(`${normalized.length} region${normalized.length === 1 ? "" : "s"} in this session`);
    };

    annotator.on("createAnnotation", save);
    annotator.on("updateAnnotation", save);
    annotator.on("deleteAnnotation", save);

    const clearAll = () => {
      annotator.clearAnnotations();
      updateSessionCalibration(annotationId, { highlights: [] });
      setStatus("Cleared for this session");
    };
    window.addEventListener("workflow-inspector:clear-all-annotations", clearAll);

    return () => {
      annotator.off("createAnnotation", save);
      annotator.off("updateAnnotation", save);
      annotator.off("deleteAnnotation", save);
      window.removeEventListener("workflow-inspector:clear-all-annotations", clearAll);
    };
  }, [annotator, annotationId, editing, highlights]);

  if (!editing || !annotator) return null;

  const getImage = () => annotator.element.querySelector("img");

  const reset = () => {
    const image = getImage();
    if (!image) return;
    annotator.setAnnotations(highlights.map((highlight) => toAnnotation(highlight, image)));
    updateSessionCalibration(annotationId, { highlights });
    setStatus("Reset to stored defaults");
  };

  const clear = () => {
    annotator.clearAnnotations();
    updateSessionCalibration(annotationId, { highlights: [] });
    setStatus("Cleared for this session");
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
        <button type="button" onClick={onFit}>Fit</button>
        <button
          className={panMode ? "is-active" : ""}
          type="button"
          aria-pressed={panMode}
          title={panMode ? "Switch to drawing boxes" : "Switch to panning the image"}
          onClick={() => onPanModeChange(!panMode)}
        >
          {panMode ? "Pan mode" : "Draw mode"}
        </button>
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
  const [zoom, setZoom] = useState(screenshot.scale);
  const [pan, setPan] = useState({
    x: screenshot.panX ?? 0,
    y: screenshot.panY ?? 0,
  });
  const [panMode, setPanMode] = useState(false);
  const zoomLayerRef = useRef(null);
  const dragRef = useRef(null);

  const updateZoom = (nextZoom) => {
    const clamped = Math.min(2.5, Math.max(1, nextZoom));
    const rounded = Math.round(clamped * 20) / 20;
    setZoom(rounded);
    updateSessionCalibration(annotationId, { zoom: rounded });
  };

  const updatePan = (nextPan, persist = true) => {
    const rounded = {
      x: Math.round(nextPan.x * 1000) / 1000,
      y: Math.round(nextPan.y * 1000) / 1000,
    };
    setPan(rounded);
    if (persist) {
      updateSessionCalibration(annotationId, {
        panX: rounded.x,
        panY: rounded.y,
      });
    }
  };

  const fitImage = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    updateSessionCalibration(annotationId, { zoom: 1, panX: 0, panY: 0 });
  };

  const startPan = (event) => {
    if (!editing || !panMode || event.button !== 0) return;

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const movePan = (event) => {
    const drag = dragRef.current;
    const layer = zoomLayerRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !layer) return;

    event.preventDefault();
    event.stopPropagation();
    const width = layer.offsetWidth || 1;
    const height = layer.offsetHeight || 1;
    updatePan(
      {
        x: drag.panX + ((event.clientX - drag.startX) / width) * 100,
        y: drag.panY + ((event.clientY - drag.startY) / height) * 100,
      },
      false,
    );
  };

  const finishPan = (event) => {
    const drag = dragRef.current;
    const layer = zoomLayerRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !layer) return;

    event.preventDefault();
    event.stopPropagation();
    const width = layer.offsetWidth || 1;
    const height = layer.offsetHeight || 1;
    const finalPan = {
      x: drag.panX + ((event.clientX - drag.startX) / width) * 100,
      y: drag.panY + ((event.clientY - drag.startY) / height) * 100,
    };
    dragRef.current = null;
    updatePan(finalPan);
  };

  return (
    <Annotorious>
      <AnnotationController
        highlights={screenshot.highlights}
        annotationId={annotationId}
        editing={editing}
        zoom={zoom}
        onZoomChange={updateZoom}
        panMode={panMode}
        onPanModeChange={setPanMode}
        onFit={fitImage}
      />
      <div
        ref={zoomLayerRef}
        className={`annotation-zoom-layer${panMode ? " is-panning" : ""}`}
        style={{
          transform: `translate(${pan.x}%, ${pan.y}%) scale(${zoom})`,
          transformOrigin: screenshot.objectPosition,
        }}
        onPointerDownCapture={startPan}
        onPointerMoveCapture={movePan}
        onPointerUpCapture={finishPan}
        onPointerCancelCapture={finishPan}
      >
        <ImageAnnotator
          containerClassName="annotorious-screenshot"
          drawingEnabled={editing && !panMode}
          userSelectAction={editing && !panMode ? UserSelectAction.EDIT : UserSelectAction.NONE}
          style={annotationStyle}
        >
          <img
            className="workflow-screenshot-image"
            src={screenshot.src}
            alt={screenshot.alt}
            draggable="false"
          />
        </ImageAnnotator>
      </div>
    </Annotorious>
  );
}
