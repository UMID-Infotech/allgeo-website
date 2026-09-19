import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ServiceCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-background-blue)]">
      {/* Scientific grid */}
      <div
        className="scientific-grid absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
      />

      {/* Decorative glows */}
      <div
        className="absolute -left-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[var(--color-green)]/8 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[var(--color-navy)]/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="site-container section-spacing relative">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--color-navy)] px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          {/* Inner scientific grid */}
          <div
            className="scientific-grid absolute inset-0 opacity-[0.06]"
            aria-hidden="true"
          />

          {/* Green glow */}
          <div
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--color-green)]/15 blur-3xl"
            aria-hidden="true"
          />

          {/* Decorative circle */}
          <div
            className="absolute -bottom-28 -right-16 h-64 w-64 rounded-full border border-white/5"
            aria-hidden="true"
          />

          <div
            className="absolute -bottom-16 -right-4 h-44 w-44 rounded-full border border-[var(--color-green)]/10"
            aria-hidden="true"
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
            {/* Content */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-[var(--color-green)]" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-green)] sm:text-sm">
                  Let's Work Together
                </p>
              </div>

              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Planning a Geoscience{" "}
                <span className="text-[var(--color-green)]">Project?</span>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                Discuss your site conditions, investigation requirements and
                project objectives with our technical team.
              </p>
            </div>

            {/* CTA */}
            <div className="lg:flex lg:justify-end">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-green)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(21,148,71,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-green-dark)] hover:shadow-[0_16px_36px_rgba(21,148,71,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)] sm:text-base"
              >
                <span>Discuss Your Project</span>

                <ArrowRight
                  size={18}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceCTA;