import WistiaPlayer from '../components/ui/WistiaPlayer.jsx';
import Footer from '../components/layout/Footer.jsx';
import { brand, videoExplicativoPage } from '../data/content.js';
import '../styles/pages.css';

export default function VideoExplicativoPage() {
  const d = videoExplicativoPage;

  // Divide el texto para aplicar énfasis al fragmento indicado.
  const text = d.text;
  const hl = d.textHighlight;
  const hlStart = text.indexOf(hl);
  const before = text.slice(0, hlStart);
  const highlighted = text.slice(hlStart, hlStart + hl.length);
  const after = text.slice(hlStart + hl.length);

  return (
    <div>
      {/* ─── COMPOSICIÓN ÚNICA: logo, título, video, texto ─────────────────── */}
      <main className="vexp-main" role="main">
        <div className="vexp-inner">

          {/* 1. Logo */}
          <div className="vexp-logo-wrap">
            <a href="/" aria-label="Empodera Consulting Group — ir al inicio">
              <img
                src={brand.logo}
                alt={brand.logoAlt}
                className="vexp-logo"
                width="900"
                height="418"
              />
            </a>
          </div>

          {/* 2. Título */}
          <h1 className="vexp-title">{d.title}</h1>

          {/* 3. Línea roja */}
          <div className="vexp-rule" aria-hidden="true" />

          {/* 4. Video Wistia */}
          <div className="vexp-video-wrap">
            <WistiaPlayer mediaId={d.wistiaId} />
          </div>

          {/* 5. Texto explicativo */}
          <p className="vexp-text">
            {before}
            <strong>{highlighted}</strong>
            {after}
          </p>

        </div>
      </main>

      {/* 6. Legal ────────────────────────────────────────────────────────────── */}
      <aside className="page-legal page-legal--vexp" aria-label="Aviso legal">
        <p className="page-legal__text">
          {d.legalLines[0]}
          <br />
          {d.legalLines[1]}
        </p>
      </aside>

      {/* 7. Footer ───────────────────────────────────────────────────────────── */}
      <Footer extended />
    </div>
  );
}

