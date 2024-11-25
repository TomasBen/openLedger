import AccessibilityButton from "../accessibilityButton";
import NavbarButton from "../navbarButton";

export default function LowerPanel() {
  return (
    <footer className="lower_panel" role="contentinfo">
      <section className="left_dock">
        <NavbarButton />
      </section>
      <section className="right_dock">
        <AccessibilityButton />
      </section>
    </footer>
  );
}
