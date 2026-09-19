import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ServiceHero({ service }) {
  const imageKitEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

  const backgroundImage = service?.image
    ? `${imageKitEndpoint}${service.image}`
    : null;

  return (
    <section
      className="relative isolate flex min-h-[72vh] items-center overflow-hidden bg-[var(--color-navy-dark)] bg-cover bg-center bg-no-repeat lg:bg-fixed"
      style={
        backgroundImage
          ? {
              backgroundImage: `url("${backgroundImage}")`,
            }
          : undefined
      }
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[rgba(5,35,66,0.96)] via-[rgba(5,35,66,0.82)] to-[rgba(5,35,66,0.38)]"
        aria-hidden="true"
      />

      {/* Additional bottom depth */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgba(5,35,66,0.45)] via-transparent to-[rgba(5,35,66,0.12)]"
        aria-hidden="true"
      />

      {/* Scientific pattern */}
      <div
        className="scientific-grid absolute inset-0 -z-10 opacity-[0.08]"
        aria-hidden="true"
      />

      {/* Decorative glow */}
      <div
        className="absolute -left-32 top-1/2 -z-10 h-80 w-80 -translate-y-1/2 rounded-full bg-[var(--color-green)]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="site-container w-full py-24 sm:py-28 lg:py-32">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--color-green)]" />

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-green)] sm:text-sm">
              Geoscience Services
            </p>
          </div>

          {/* Dynamic service title */}
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {service?.title}
          </h1>

          {/* Dynamic short description */}
          {service?.shortDescription && (
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              {service.shortDescription}
            </p>
          )}

          {/* CTA */}
          <div className="mt-9">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-green)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(21,148,71,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-green-dark)] hover:shadow-[0_16px_36px_rgba(21,148,71,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy-dark)] sm:text-base"
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

      {/* Bottom accent */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-green)]/50 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}

export default ServiceHero;
