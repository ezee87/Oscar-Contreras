import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap.js';
import SectionShell from '../layout/SectionShell.jsx';
import { brand, proposal } from '../../data/content.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

function TextWithHighlight({ text, highlight }) {
  if (!highlight || !text.includes(highlight)) {
    return text;
  }

  const highlightIndex = text.indexOf(highlight);
  const before = text.slice(0, highlightIndex);
  const after = text.slice(highlightIndex + highlight.length);

  return (
    <>
      {before}
      <strong>{highlight}</strong>
      {after}
    </>
  );
}

export default function ProposalSection() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || reduced) return;

      const eyebrow = element.querySelector('.proposal__eyebrow');
      const titleInner = element.querySelector('.proposal__title-inner');
      const divider = element.querySelector('.proposal__divider');
      const texts = element.querySelectorAll('.proposal__text');
      const aura = element.querySelector('.proposal__aura');

      const timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 78%',
          once: true,
        },
      });

      timeline
        .from(eyebrow, {
          opacity: 0,
          y: 14,
          duration: 0.55,
        })
        .from(
          titleInner,
          {
            yPercent: 115,
            duration: 0.88,
            ease: 'expo.out',
          },
          '-=0.28'
        )
        .from(
          divider,
          {
            opacity: 0,
            scaleX: 0,
            duration: 0.55,
            transformOrigin: 'center',
          },
          '-=0.4'
        )
        .from(
          texts,
          {
            opacity: 0,
            y: 16,
            duration: 0.62,
            stagger: 0.12,
          },
          '-=0.28'
        );

      if (aura) {
        gsap.to(aura, {
          scale: 1.04,
          opacity: 0.34,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: 'center',
        });
      }
    },
    {
      scope: ref,
      dependencies: [reduced],
    }
  );

  return (
    <SectionShell variant="navy" className="proposal">
      <span className="proposal__aura" aria-hidden="true" />

      <div className="proposal__inner" ref={ref}>
        <span className="proposal__eyebrow">
          {proposal.eyebrow}
        </span>

        <h2 className="proposal__title">
          <span className="proposal__title-mask">
            <span className="proposal__title-inner">
              {proposal.title}
            </span>
          </span>
        </h2>

        <span className="proposal__divider" aria-hidden="true" />

        <div className="proposal__copy">
          <p className="proposal__text">
            <TextWithHighlight
              text={proposal.text1}
              highlight={proposal.text1Highlight}
            />
          </p>

          <p className="proposal__text">
            <TextWithHighlight
              text={proposal.text2}
              highlight={proposal.text2Highlight}
            />
          </p>
        </div>

        <figure className="proposal__banner">
          <span className="proposal__banner-label">Nuestro equipo</span>
          <img
            src={brand.banner}
            alt="Equipo de Impulso Laboral"
            width="2097"
            height="750"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </SectionShell>
  );
}