import AccessibilityButton from "../accessibilityButton";
import LanguageButton from "../languageButton";
import NavbarButton from "../navbarButton";
import DiagnosticsButton from "../diagnosticsButton";

export default function LowerPanel() {
  return (
    <footer className="lower_panel" role="contentinfo">
      <a href="#main-content" className="skip-link">
        skip to main contentcle
      </a>
      <section className="left_dock">
        <NavbarButton />
        <DiagnosticsButton />
      </section>
      <section className="right_dock">
        <LanguageButton />
        <AccessibilityButton />
      </section>
    </footer>
  );
}
