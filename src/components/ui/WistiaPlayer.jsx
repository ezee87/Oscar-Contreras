// Embed directo de Wistia via iframe con el mismo mediaId.
// Evita dependencias de scripts externos que pueden dejar el player no funcional.
export default function WistiaPlayer({ mediaId }) {
  const src = `https://fast.wistia.net/embed/iframe/${mediaId}?seo=true&videoFoam=true`;

  return (
    <div className="wistia-wrap">
      <div className="wistia-player-container">
        <iframe
          className="wistia-player-frame"
          src={src}
          title="Video explicativo de Impulso Laboral"
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
}
