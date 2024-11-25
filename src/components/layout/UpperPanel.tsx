import { Webview } from "../../lib/webview.ts";

export default function UpperPanel() {
  return (
    <header className="upper_panel" role="banner">
      <a href="#main-content" className="skip-link">
        skip to main contentcle
      </a>
      <section className="left_dock">
        <button onClick={() => Webview.zoomIn()}>Zoom in</button>
        <button onClick={() => Webview.zoomIn()}>Zoom out</button>
      </section>
    </header>
  );
}
