export default function MainSkeleton() {
  return (
    <div className="skeleton">
      <section className="skeleton-section path">
        <span className="skeleton-chip" />
        <span>&gt;</span>
        <span className="skeleton-chip" />
        <span>&gt;</span>
        <span className="skeleton-chip" />
      </section>
      <section className="skeleton-section">
        <span className="skeleton-line" />
      </section>
      <section className="skeleton-section">
        <span className="skeleton-square" />
        <span className="skeleton-square" />
        <span className="skeleton-square" />
      </section>
      <section className="skeleton-section">
        <span className="skeleton-square" />
        <span className="skeleton-square" />
        <span className="skeleton-square" />
      </section>
    </div>
  );
}
