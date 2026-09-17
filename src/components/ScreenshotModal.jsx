import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Minus, Plus, X } from "lucide-react";

export default function ScreenshotModal({ screenshot, onClose }) {
  const [zoom, setZoom] = useState(1);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  const updateZoom = (nextZoom) => {
    setZoom(Math.min(3, Math.max(1, Math.round(nextZoom * 4) / 4)));
  };

  return createPortal(
    <div
      className="screenshot-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Expanded workflow screenshot"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="screenshot-modal-toolbar">
        <div className="screenshot-modal-zoom" role="group" aria-label="Image zoom controls">
          <button
            type="button"
            aria-label="Zoom out"
            disabled={zoom === 1}
            onClick={() => updateZoom(zoom - 0.25)}
          >
            <Minus aria-hidden="true" size={18} />
          </button>
          <output>{Math.round(zoom * 100)}%</output>
          <button
            type="button"
            aria-label="Zoom in"
            disabled={zoom === 3}
            onClick={() => updateZoom(zoom + 0.25)}
          >
            <Plus aria-hidden="true" size={18} />
          </button>
          <button type="button" onClick={() => setZoom(1)}>Fit</button>
        </div>
        <button
          ref={closeButtonRef}
          className="screenshot-modal-close"
          type="button"
          aria-label="Close expanded screenshot"
          onClick={onClose}
        >
          <X aria-hidden="true" size={21} />
        </button>
      </div>

      <div
        className="screenshot-modal-canvas"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div
          className="screenshot-modal-image-frame"
          style={{ width: `${zoom * 100}%` }}
        >
          <img src={screenshot.src} alt={screenshot.alt} />
          {screenshot.highlights.map((highlight) => (
            <span
              key={highlight.id}
              className="screenshot-modal-highlight"
              aria-hidden="true"
              style={{
                left: `${highlight.x}%`,
                top: `${highlight.y}%`,
                width: `${highlight.width}%`,
                height: `${highlight.height}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
