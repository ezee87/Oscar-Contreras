import { useRef } from 'react';
import { ScrollTrigger, useGSAP } from '../lib/gsap.js';
import SectionShell from '../components/layout/SectionShell.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import OscarSection from '../components/sections/OscarSection.jsx';
import MediaSection from '../components/sections/MediaSection.jsx';
import TestimonialsSection from '../components/sections/TestimonialsSection.jsx';
import YouTubeEmbed from '../components/ui/YouTubeEmbed.jsx';
import Footer from '../components/layout/Footer.jsx';
import { brand, thankYouPage } from '../data/content.js';
import '../styles/pages.css';
import '../styles/sections.css';

export default function ThankYouPage() {
  const pageRef = useRef(null);
  const d = thankYouPage;

  useGSAP(() => {
    const onLoad = () => ScrollTrigger.refresh();

    window.addEventListener('load', onLoad);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => window.removeEventListener('load', onLoad);
  });

  return (
    <div ref={pageRef} className="thankyou-page">
      {/* 1. HERO DE CONFIRMACIÓN */}
      <header className="page-header" role="banner">
        <div className="shell">
          <div className="page-header__logo-wrap">
            <a href="/" aria-label="Empodera Consulting Group — ir al inicio">
              <img
                src={brand.logo}
                alt={brand.logoAlt}
                className="page-header__logo"
              />
            </a>
          </div>

          <h1 className="page-header__title">
            <span className="page-header__title-red">
              {d.header.titlePrefix}
            </span>{' '}
            {d.header.titleRest}
          </h1>

          <p className="page-header__subtitle">
            {d.header.subtitle1}
          </p>

          <p className="page-header__subtitle">
            {d.header.subtitle2Lines[0]}
            <br />
            {d.header.subtitle2Lines[1]}
          </p>

          <div
            className="page-header__accent-bar"
            aria-hidden="true"
          />
        </div>
      </header>

      <main>
        {/* 2. PASO 1 — VIDEO INTRODUCTORIO */}
        <SectionShell variant="navy" className="ty-paso ty-paso--1">
          <SectionHeading align="center" invert>
            <span className="ty-paso__prefix">
              {d.step1.prefix}
            </span>{' '}
            {d.step1.titleBody}
          </SectionHeading>

          <p className="ty-step-video__text">
            <span className="ty-step-video__text-block">
              {d.step1.textLines[0]}
              <br />
              {d.step1.textLines[1]}
            </span>

            <span className="ty-step-video__text-block">
              <strong>{d.step1.textBoldPrefix}</strong>
              <br />
              {d.step1.textAfterBold}
            </span>
          </p>

          <div className="yt-wrap">
            <YouTubeEmbed
              videoId={d.step1.videoId}
              title="Paso 1: Video introductorio de Impulso Laboral"
            />
          </div>
        </SectionShell>

        {/* 3. PASO 2 — PERFIL DEL PROGRAMA */}
        <SectionShell variant="light" className="ty-paso ty-paso--2">
          <SectionHeading>
            <span className="ty-paso__prefix">
              {d.step2.prefix}
            </span>{' '}
            {d.step2.titleBody}{' '}
            <span className="ty-paso__prefix">
              {d.step2.titleHighlight}
            </span>{' '}
            {d.step2.titleEnd}
          </SectionHeading>

          <ol className="ty-list" aria-label="Perfil del programa">
            {d.step2.items.map((item, i) => (
              <li key={item} className="ty-list__item">
                <div
                  className="ty-list__num-wrap"
                  aria-hidden="true"
                >
                  <span className="ty-list__num">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="ty-list__rule" />
                </div>

                <p className="ty-list__text">{item}</p>
              </li>
            ))}
          </ol>

          <p className="ty-audience__closing">
            {d.step2.closing}
          </p>
        </SectionShell>

        {/* 4. PASO 3 — AVISOS IMPORTANTES */}
        <SectionShell variant="navy" className="ty-paso ty-paso--3">
          <SectionHeading align="center" invert>
            <span className="ty-paso__prefix">
              {d.step3.prefix}
            </span>{' '}
            {d.step3.titleBody}
          </SectionHeading>

          <ol
            className="ty-notices__list"
            aria-label="Avisos importantes"
          >
            {d.step3.items.map((item, i) => (
              <li key={item} className="ty-notice">
                <span
                  className="ty-notice__num"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>

                <span className="ty-notice__text">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </SectionShell>

        {/* 5. PASO 4 — VIDEO RECOMENDACIONES */}
        <SectionShell variant="white" className="ty-paso ty-paso--4">
          <SectionHeading align="center">
            <span className="ty-paso__prefix">
              {d.step4.prefix}
            </span>{' '}
            {d.step4.titleBody}
          </SectionHeading>

          <div className="yt-wrap">
            <YouTubeEmbed
              videoId={d.step4.videoId}
              title="Paso 4: Recomendaciones de nuestros clientes"
            />
          </div>
        </SectionShell>

        {/* 6. TESTIMONIOS */}
        <div className="ty-testimonials-wrap">
          <TestimonialsSection
            title={d.testimonialsTitle}
            showCta={false}
          />
        </div>

        <div
          className="ty-testi-oscar-separator"
          aria-hidden="true"
        />

        {/* 7. SECCIÓN DE OSCAR */}
        <div className="ty-oscar-wrap">
          <OscarSection showInstitutionalLink />
        </div>

        {/* 8. APARICIONES EN MEDIOS */}
        <div className="ty-media-wrap">
          <MediaSection />
        </div>

        {/* 9. CIERRE */}
        <SectionShell
          variant="light"
          className="ty-closing-section"
        >
          <div className="ty-closing">
            <div
              className="ty-closing__bar"
              aria-hidden="true"
            />

            <p className="ty-closing__headline">
              {d.closing.headline}
            </p>
          </div>
        </SectionShell>
      </main>

      {/* 10. LEGAL */}
      <aside
        className="page-legal page-legal--thankyou"
        aria-label="Aviso legal"
      >
        <p className="page-legal__text">
          {d.legalLines[0]}
          <br />
          {d.legalLines[1]}
        </p>
      </aside>

      {/* 11. FOOTER */}
      <Footer extended />
    </div>
  );
}