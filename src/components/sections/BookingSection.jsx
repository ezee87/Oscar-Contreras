import SectionShell from '../layout/SectionShell.jsx';
import Reveal from '../ui/Reveal.jsx';
import { booking } from '../../data/content.js';
import usePartialLeadCapture from '../../hooks/usePartialLeadCapture.js';

// Calendario real. Contenedor id="agenda" (destino de todos los CTA).
// El script form_embed.js se carga una sola vez.
export default function BookingSection({ landingVariant }) {
  usePartialLeadCapture(landingVariant);

  const iframeUrl = new URL(booking.iframeSrc);
  iframeUrl.searchParams.set('landing_variant', landingVariant);

  return (
    <SectionShell id="agenda" tabIndex={-1} variant="white" className="booking">
      <Reveal className="booking__head" stagger>
        <h2 className="booking__title">{booking.title}</h2>
        <p className="booking__emphasis">{booking.emphasis}</p>
      </Reveal>
      <div className="booking__layout">
        <aside className="booking__info" aria-label="Detalle de la reunión">
          <h3 className="booking__info-title">
            Reunión de Evaluación Programa Impulso Laboral
          </h3>
          <p className="booking__info-meta">(Zoom)</p>
          <p className="booking__info-duration">30 min</p>
          <p className="booking__info-description">
            Esta evaluación es gratuita y se realiza una sola vez, por lo que
            agradecemos tu asistencia y puntualidad. Está dirigida a ejecutivos,
            gerentes y profesionales con trayectoria en roles de alta responsabilidad.
          </p>
        </aside>

        <div className="booking__calendar">
          <div className="booking__calendar-scroll">
            <iframe
              src={iframeUrl.toString()}
              id={booking.iframeId}
              title="Agenda tu evaluación estratégica gratuita"
              className="booking__iframe"
              loading="lazy"
              scrolling="yes"
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
