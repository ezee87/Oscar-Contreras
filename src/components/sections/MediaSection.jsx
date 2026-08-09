import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import SectionShell from '../layout/SectionShell.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { media } from '../../data/content.js';

// Miniatura de YouTube (privacidad mejorada al reproducir). Lazy: el iframe
// solo se monta al abrir el modal.
function thumb(id) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export default function MediaSection() {
  const [active, setActive] = useState(null);
  const lastFocused = useRef(null);
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  const open = (video, e) => {
    lastFocused.current = e.currentTarget;
    setActive(video);
  };

  const close = useCallback(() => {
    setActive(null);
    if (lastFocused.current) lastFocused.current.focus();
  }, []);

  useEffect(() => {
    if (!active) return;
    // enfoca el botón cerrar al abrir
    closeBtnRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key === 'Tab') {
        // focus trap simple
        const focusables = dialogRef.current?.querySelectorAll(
          'button, iframe, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close]);

  return (
    <SectionShell variant="navy" className="media">
      <div className="media__header">
        <SectionHeading align="center" invert className="media__heading">
          {media.title}
        </SectionHeading>
      </div>
      <div className="media__grid">
        {media.videos.map((video) => (
          <button
            type="button"
            className="mcard"
            key={video.id}
            onClick={(e) => open(video, e)}
            aria-label={`Reproducir video: ${video.title}`}
          >
            <span className="mcard__frame">
              <img
                className="mcard__thumb"
                src={thumb(video.id)}
                alt=""
                loading="lazy"
                decoding="async"
                width="480"
                height="270"
              />
              <span className="mcard__overlay" aria-hidden="true" />
              <span className="mcard__play" aria-hidden="true">
                ▶
              </span>
            </span>
            <span className="mcard__footer" aria-hidden="true">
              <span className="mcard__caption">{video.title}</span>
            </span>
          </button>
        ))}
      </div>

      {active && createPortal(
        <div
          className="vmodal"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="vmodal__box" ref={dialogRef}>
            <div className="vmodal__bar">
              <span className="vmodal__title">{active.title}</span>
              <button
                type="button"
                className="vmodal__close"
                ref={closeBtnRef}
                onClick={close}
                aria-label="Cerrar video"
              >
                ✕
              </button>
            </div>
            <div className="vmodal__frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </SectionShell>
  );
}
