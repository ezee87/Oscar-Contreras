import { brand, hero, oscar } from '../../data/content.js';
import PrimaryCTA from '../ui/PrimaryCTA.jsx';

export default function HeroSection() {
  return (
    <header className="hero">
      <span className="hero__ambient hero__ambient--red" aria-hidden="true" />
      <span className="hero__ambient hero__ambient--navy" aria-hidden="true" />
      <span className="hero__dot-grid" aria-hidden="true" />

      <div className="shell hero__inner">
        <img
          className="hero__logo"
          src={brand.logo}
          alt={brand.logoAlt}
          width="200"
          height="64"
        />

        <div className="hero__grid">
          <div className="hero__content">
            <span className="hero__eyebrow">
              <span className="hero__eyebrow-bar" aria-hidden="true" />
              Impulso Laboral
            </span>

            <h1 className="hero__title">
              <span className="hero__title-mask">
                <span className="hero__title-inner">
                  <span className="hero__title-line">Alcanza tu próximo</span>
                  <span className="hero__title-line hero__accent">
                    Cargo Estratégico
                  </span>
                  <span className="hero__title-line">
                    en la mitad del tiempo
                  </span>
                </span>
              </span>
            </h1>

            <p className="hero__subtitle">{hero.subtitle}</p>
            <PrimaryCTA className="hero__cta" disableMotion />

            <figure className="hero__mobile-photo">
              <img
                src={oscar.primary}
                alt="Oscar Contreras, Director de Empodera Consulting Group"
                width="620"
                height="760"
                loading="eager"
              />
            </figure>
          </div>

          <div className="hero__media">
            <span className="hero__photo-bg" aria-hidden="true" />
            <span className="hero__media-outline" aria-hidden="true" />

            <div className="hero__media-frame">
              <figure className="hero__visual">
                <img
                  src={oscar.primary}
                  alt="Oscar Contreras, Director de Empodera Consulting Group"
                  width="620"
                  height="760"
                />
              </figure>

              <div className="hero__proof">
                <span className="hero__proof-mark" aria-hidden="true">
                  “
                </span>

                <span className="hero__proof-copy">
                  <span>Métodos probados.</span>
                  <span>Resultados reales.</span>
                  <span>Impacto duradero.</span>
                </span>
              </div>
            </div>

            <span className="hero__visual-ring" aria-hidden="true" />
            <span
              className="hero__visual-ring hero__visual-ring--2"
              aria-hidden="true"
            />
            <span className="hero__media-dots" aria-hidden="true" />
          </div>
        </div>
      </div>
    </header>
  );
}