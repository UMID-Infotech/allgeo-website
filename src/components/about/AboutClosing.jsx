function AboutClosing() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-background-blue)] py-20 sm:py-24 lg:py-28">
      <div
        className="scientific-grid absolute inset-0 opacity-[0.045]"
        aria-hidden="true"
      />

      <div className="site-container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mx-auto block h-12 w-px bg-[var(--color-green)]" />

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-green)]">
            The AllGeo Perspective
          </p>

          <h2 className="mt-6 text-4xl font-bold leading-tight tracking-[-0.035em] text-[var(--color-navy)] sm:text-5xl lg:text-6xl">
            Understanding the Ground.
            <span className="block text-[var(--color-green)]">
              Enabling Better Decisions.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] sm:text-lg">
            Because what lies beneath the surface can shape everything built,
            planned and protected above it.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutClosing;
