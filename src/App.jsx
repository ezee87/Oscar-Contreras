import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import ThankYouPage from './pages/ThankYouPage.jsx';
import VideoExplicativoPage from './pages/VideoExplicativoPage.jsx';
import ScrollToTop from './components/ui/ScrollToTop.jsx';

const LANDING_VARIANT_KEY = 'landingVariant';
const CANONICAL_ORIGIN = 'https://f.empodera.cl';

const ROUTE_SEO = {
  '/impulso-laboral': {
    title: 'Impulso Laboral | Empodera Consulting Group',
    description:
      'Impulso Laboral es el programa premium de Empodera para Altos Ejecutivos y Gerentes que buscan un nuevo desafío laboral con un método comprobado. Agenda tu evaluación estratégica gratuita.',
    canonicalPath: '/impulso-laboral',
  },
  '/proximos-pasos': {
    title: 'Próximos Pasos | Impulso Laboral | Empodera Consulting Group',
    description:
      'Tu reunión ya fue agendada. Revisa los pasos previos para aprovechar al máximo tu sesión de evaluación del Programa Impulso Laboral.',
    canonicalPath: '/proximos-pasos',
  },
  '/importante': {
    title: 'Video Explicativo | Impulso Laboral | Empodera Consulting Group',
    description:
      'Mira el video explicativo del Programa Impulso Laboral antes de tu reunión para preparar mejor tu evaluación estratégica.',
    canonicalPath: '/importante',
  },
};

function upsertMeta(selector, attr, value, content) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, value);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function applyRouteSeo(pathname) {
  const seo = ROUTE_SEO[pathname] ?? ROUTE_SEO['/impulso-laboral'];
  const canonicalUrl = `${CANONICAL_ORIGIN}${seo.canonicalPath}`;
  const ogImage = `${CANONICAL_ORIGIN}/og-image.webp`;

  document.documentElement.setAttribute('lang', 'es');
  document.title = seo.title;

  upsertMeta('meta[name="description"]', 'name', 'description', seo.description);
  upsertMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
  upsertMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  upsertMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
  upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
  upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
  upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalUrl);
}

function getVariantFromSearch(search) {
  const value = new URLSearchParams(search).get('variant');
  if (!value) return null;
  const normalized = value.toUpperCase();
  return normalized === 'A' || normalized === 'B' ? normalized : null;
}

function getStoredVariant() {
  const stored = localStorage.getItem(LANDING_VARIANT_KEY);
  return stored === 'A' || stored === 'B' ? stored : null;
}

function resolveLandingVariant(search) {
  const queryVariant = getVariantFromSearch(search);
  if (queryVariant) {
    localStorage.setItem(LANDING_VARIANT_KEY, queryVariant);
    return queryVariant;
  }

  const storedVariant = getStoredVariant();
  if (storedVariant) {
    return storedVariant;
  }

  const randomVariant = Math.random() < 0.5 ? 'A' : 'B';
  localStorage.setItem(LANDING_VARIANT_KEY, randomVariant);
  return randomVariant;
}

function ImpulsoLaboralRoute() {
  const { search } = useLocation();
  const [landingVariant, setLandingVariant] = useState(() => resolveLandingVariant(window.location.search));

  useEffect(() => {
    setLandingVariant(resolveLandingVariant(search));
  }, [search]);

  return <LandingPage landingVariant={landingVariant} />;
}

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    applyRouteSeo(pathname);
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/impulso-laboral" replace />} />
        <Route path="/impulso-laboral" element={<ImpulsoLaboralRoute />} />
        <Route path="/proximos-pasos" element={<ThankYouPage />} />
        <Route path="/importante" element={<VideoExplicativoPage />} />

        <Route path="/thank-you-page" element={<Navigate to="/proximos-pasos" replace />} />
        <Route path="/video-explicativo-page" element={<Navigate to="/importante" replace />} />

        <Route path="*" element={<Navigate to="/impulso-laboral" replace />} />
      </Routes>
    </>
  );
}
