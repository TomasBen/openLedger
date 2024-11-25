import AccessibilityButton from "../accessibilityButton";
import ZoomButtonGroup from "../zoomButtonGroup";

export default function LowerPanel() {
  return (
    <footer className="lower_panel" role="contentinfo">
      {/* redo both button components with buttonBase API to disable
      ripple effect */}
      <section className="left_dock">
        <ZoomButtonGroup />
      </section>
      <section className="right_dock">
        <AccessibilityButton />
      </section>
    </footer>
  );
}
