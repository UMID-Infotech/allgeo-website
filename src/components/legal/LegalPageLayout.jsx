function LegalPageLayout({ eyebrow, title, lastUpdated, children }) {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--color-navy)] py-16 text-white sm:py-20 lg:py-24">
        <div
          className="scientific-grid absolute inset-0 opacity-[0.08]"
          aria-hidden="true"
        />

        <div className="site-container relative z-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-300">
              {eyebrow}
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            {lastUpdated && (
              <p className="mt-5 text-sm text-white/60">
                Last updated: {lastUpdated}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="site-container">
          <article className="mx-auto max-w-4xl">{children}</article>
        </div>
      </section>
    </>
  );
}

export default LegalPageLayout;
