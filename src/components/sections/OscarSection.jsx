import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap.js';
import SectionShell from '../layout/SectionShell.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { oscarSection, oscar } from '../../data/content.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

// Sección de autoridad: retrato editorial + copy con jerarquía.
// Acepta overrides opcionales via props para reutilización en otras páginas.
export default function OscarSection({
  title: titleProp,
  paragraphs: paragraphsProp,
  showInstitutionalLink = false,
} = {}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const title = titleProp ?? oscarSection.title;
  const paragraphs = paragraphsProp ?? oscarSection.paragraphs;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      const portrait = el.querySelector('.oscar__portrait');
      const paras = el.querySelectorAll('.oscar__copy p');

      gsap.fromTo(
        portrait,
        { clipPath: 'inset(0 0 100% 0)', scale: 1.05 },
        {
          clipPath: 'inset(0 0 0% 0)',
          scale: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 74%', once: true },
        }
      );
      gsap.from(paras, {
        opacity: 0,
        y: 22,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.oscar__copy', start: 'top 80%', once: true },
      });
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <SectionShell variant="light" className="oscar">
      <div ref={ref} className="oscar__grid">
        <figure className="oscar__portrait">
          <img
            src={oscar.secondary}
            alt="Oscar Contreras, Fundador y Director de Empodera Consulting Group"
            width="2571"
            height="3849"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="oscar__body">
          <div className="oscar__body-main">
            <SectionHeading className="oscar__heading">
              {title}
            </SectionHeading>
            <div className="oscar__copy">
              <p>
                <span className="oscar__name">{oscarSection.nameHighlight}</span>
                {paragraphs[0].slice(oscarSection.nameHighlight.length)}
              </p>
              <p>{paragraphs[1]}</p>
              <p>{paragraphs[2]}</p>
            </div>
          </div>

          {showInstitutionalLink && (
            <div className="oscar__institutional oscar__institutional--right">
              <p className="oscar__institutional-text">
                Para conocer más sobre la trayectoria de Empodera Consulting Group, podés visitar nuestra web institucional.
              </p>

              <a
                className="oscar__institutional-link"
                href="https://www.empodera.cl/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visitar web institucional
              </a>
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
