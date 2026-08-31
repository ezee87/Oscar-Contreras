import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionShell from '../layout/SectionShell.jsx';
import Reveal from '../ui/Reveal.jsx';
import { booking } from '../../data/content.js';

const initialForm = { firstName: '', lastName: '', email: '', phone: '', linkedin: '', roleType: '', currentRole: '', workStatus: '', goal: '', readiness: '', investment: '', source: '' };
const days = [
  { id: '2026-09-01', weekday: 'Mar', date: '01 sept', status: 'Disponible' },
  { id: '2026-09-02', weekday: 'Mié', date: '02 sept', status: 'Pocos horarios' },
  { id: '2026-09-03', weekday: 'Jue', date: '03 sept', status: 'Disponible' },
  { id: '2026-09-04', weekday: 'Vie', date: '04 sept', status: 'Disponible' },
  { id: '2026-09-07', weekday: 'Lun', date: '07 sept', status: 'Últimos cupos' },
];
const times = ['09:00', '10:30', '11:45', '15:00', '16:30', '18:00'];
const textFields = [
  ['firstName', 'Nombre', 'text'], ['lastName', 'Apellidos', 'text'], ['email', 'Correo electrónico', 'email'],
  ['phone', 'Teléfono', 'tel'], ['linkedin', 'Enlace de perfil de LinkedIn', 'url'],
  ['roleType', 'Tipo de rol que desempeñas en tu área', 'text'], ['currentRole', 'Cargo actual o último que ejerciste', 'text'],
];
const selectFields = [
  { name: 'workStatus', label: 'Situación laboral actual', options: ['En búsqueda activa de un nuevo empleo.', 'Estoy empleado, pero busco un cargo/empresa mejor.'] },
  { name: 'goal', label: 'Objetivo que te gustaría alcanzar con la mentoría personalizada', options: ['Acceder a un nuevo empleo en el corto plazo.', 'Reorientar mi carrera hacia un nuevo rubro o industria.', 'Optimizar mi perfil y definir mi próximo movimiento laboral.', 'Fortalecer mi posicionamiento profesional y habilidades clave.'] },
  { name: 'readiness', label: 'Tu disposición hoy', options: ['Listo(a) para iniciar una asesoría y avanzar en mi proceso.', 'En etapa inicial de revisión, sin intención de avanzar por ahora.'] },
  { name: 'investment', label: 'Capacidad económica para invertir en un Programa Premium', options: ['Sí, puedo asumir la inversión.'] },
  { name: 'source', label: '¿Cómo nos conociste?', options: ['LinkedIn', 'Google / Página web', 'Recomendación Directa', 'Instagram', 'Facebook', 'Otro Medio'] },
];

function Label({ children }) { return <>{children} <span className="booking-form__required" aria-hidden="true">*</span></>; }

export default function BookingSection() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [invalid, setInvalid] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [confirming, setConfirming] = useState(false);

  const updateField = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }));
    setInvalid((current) => current.filter((field) => field !== name));
  };
  const continueToCalendar = (event) => {
    event.preventDefault();
    const missing = Object.keys(form).filter((key) => !form[key].trim());
    if (!/^\S+@\S+\.\S+$/.test(form.email)) missing.push('email');
    setInvalid([...new Set(missing)]);
    if (!missing.length) setStep(2);
  };
  const confirmMeeting = () => {
    if (!selectedDay || !selectedTime || confirming) return;
    setConfirming(true);
    window.setTimeout(() => navigate('/proximos-pasos'), 650);
  };

  return <SectionShell id="agenda" tabIndex={-1} variant="white" className="booking">
    <Reveal className="booking__head" stagger><h2 className="booking__title">{booking.title}</h2><p className="booking__emphasis">{booking.emphasis}</p></Reveal>
    <div className="booking__layout">
      <aside className="booking__info" aria-label="Detalle de la reunión">
        <span className="booking__info-kicker">Reunión de evaluación</span><h3 className="booking__info-title">Programa Impulso Laboral</h3>
        <div className="booking__info-tags"><span>(Zoom)</span><span>30 min</span></div>
        <p className="booking__info-description">Esta evaluación es gratuita y se realiza una sola vez, por lo que agradecemos tu asistencia y puntualidad. Está dirigida a ejecutivos, gerentes y profesionales con trayectoria en roles de alta responsabilidad.</p>
      </aside>
      <div className="booking__panel">
        <div className="booking__progress" aria-label={`Paso ${step} de 2`}><span className={step === 1 ? 'is-active' : 'is-complete'}>1 <b>Tus datos</b></span><i aria-hidden="true" /><span className={step === 2 ? 'is-active' : ''}>2 <b>Tu evaluación</b></span></div>
        {step === 1 ? <form className="booking-form" onSubmit={continueToCalendar} noValidate>
          <div className="booking-form__grid">
            {textFields.map(([name, label, type]) => <label className="booking-form__field" key={name}><span><Label>{label}</Label></span><input name={name} type={type} value={form[name]} onChange={updateField} aria-invalid={invalid.includes(name)} /></label>)}
            {selectFields.map(({ name, label, options }) => <label className="booking-form__field" key={name}><span><Label>{label}</Label></span><select name={name} value={form[name]} onChange={updateField} aria-invalid={invalid.includes(name)}><option value="">Selecciona una opción</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>)}
          </div>
          <div className="booking-form__footer">{invalid.length > 0 && <span className="booking-form__hint" role="status">Revisa los campos marcados.</span>}<button className="booking-form__primary" type="submit">Elegir día y hora <span aria-hidden="true">→</span></button></div>
        </form> : <div className="booking-schedule">
          <div className="booking-schedule__picker">
            <div className="booking-schedule__heading"><div><span>Selecciona una fecha</span><h3>Septiembre 2026</h3></div><button type="button" onClick={() => setStep(1)}>Editar datos</button></div>
            <div className="booking-days">{days.map((day) => <button type="button" key={day.id} className={selectedDay?.id === day.id ? 'is-selected' : ''} onClick={() => { setSelectedDay(day); setSelectedTime(''); }}><b>{day.weekday}</b><span>{day.date}</span><small>{day.status}</small></button>)}</div>
            {selectedDay ? <div className="booking-times"><span>Horarios disponibles</span><div>{times.map((time) => <button type="button" key={time} className={selectedTime === time ? 'is-selected' : ''} onClick={() => setSelectedTime(time)}>{time}</button>)}</div></div> : <p className="booking-schedule__prompt">Elige un día para ver los horarios disponibles.</p>}
          </div>
          <aside className="booking-summary"><span className="booking-summary__eyebrow">Resumen de tu evaluación</span><h3>Reunión de Evaluación</h3><p>Programa Impulso Laboral</p><ul><li><span>Día seleccionado</span><b>{selectedDay ? `${selectedDay.weekday} ${selectedDay.date}` : 'Por seleccionar'}</b></li><li><span>Horario seleccionado</span><b>{selectedTime || 'Por seleccionar'}</b></li><li><span>Duración</span><b>30 min</b></li><li><span>Modalidad</span><b>Zoom</b></li></ul><button className="booking-form__primary" type="button" disabled={!selectedDay || !selectedTime || confirming} onClick={confirmMeeting}>{confirming ? 'Confirmando…' : 'Confirmar reunión'}</button></aside>
        </div>}
      </div>
    </div>
  </SectionShell>;
}
