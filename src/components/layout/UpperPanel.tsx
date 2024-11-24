export default function UpperPanel() {
  return (
    <header className="upper_panel" role="banner">
      <a href="#main-content" className="skip-link">
        skip to main content
      </a>
      <section className="left_dock">
        <button>Zoom in</button>
        <button>Zoom out</button>
      </section>
    </header>
  );
}
