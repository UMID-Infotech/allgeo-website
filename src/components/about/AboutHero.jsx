import { useEffect, useState } from "react";
import { Activity, Layers3, MapPinned } from "lucide-react";

function AboutHero() {
  const [isVisible, setIsVisible] = useState(false);

  const imageKitEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
  const heroImage = `${imageKitEndpoint}/allgeo-solutions/home/about-hero.png`;

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section className="relative isolate min-h-[62vh] overflow-hidden bg-[var(--color-navy-dark)]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1800ms] ease-out"
        style={{
          backgroundImage: `url("${heroImage}")`,
          transform: isVisible ? "scale(1)" : "scale(1.04)",
        }}
        aria-hidden="true"
      />

      {/* Dark cinematic overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[rgba(5,35,66,0.97)] via-[rgba(5,35,66,0.82)] to-[rgba(5,35,66,0.28)]"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-[rgba(5,35,66,0.75)] via-transparent to-[rgba(5,35,66,0.18)]"
        aria-hidden="true"
      />

      {/* Scientific grid */}
      <div
        className="scientific-grid absolute inset-0 opacity-[0.09]"
        aria-hidden="true"
      />

      {/* Decorative geological line */}
      <div
        className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-green)] to-transparent opacity-50"
        aria-hidden="true"
      />

      <div className="site-container relative z-10 flex min-h-[62vh] items-center py-20 sm:py-24 lg:py-28">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div
            className={`mb-6 flex items-center gap-3 transition-all duration-700 motion-reduce:transform-none motion-reduce:transition-none ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <span className="h-px w-10 bg-[var(--color-green)]" />

            <span className="text-xs font-bold uppercase tracking-[0.24em] text-green-300 sm:text-sm">
              About AllGeo Solutions
            </span>
          </div>

          {/* Main heading */}
          <h1
            className={`max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-white transition-all delay-100 duration-700 motion-reduce:transform-none motion-reduce:transition-none sm:text-5xl lg:text-6xl xl:text-7xl ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            Science. Technology.
            <span className="mt-1 block text-[var(--color-green)]">
              Solutions for the Subsurface.
            </span>
          </h1>

          {/* Introduction */}
          <p
            className={`mt-7 max-w-2xl text-base leading-7 text-slate-200 transition-all delay-200 duration-700 motion-reduce:transform-none motion-reduce:transition-none sm:text-lg sm:leading-8 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            AllGeo Solutions brings together scientific expertise, advanced
            geoscience technology and field-driven investigation to understand
            what lies beneath the surface and transform complex subsurface data
            into meaningful insight.
          </p>

          {/* Capability indicators - not CTAs */}
          <div
            className={`mt-9 flex flex-wrap gap-x-7 gap-y-4 border-t border-white/15 pt-6 transition-all delay-300 duration-700 motion-reduce:transform-none motion-reduce:transition-none ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <div className="flex items-center gap-2.5 text-sm font-medium text-slate-200">
              <Activity
                size={17}
                className="text-[var(--color-green)]"
                aria-hidden="true"
              />
              Scientific Investigation
            </div>

            <div className="flex items-center gap-2.5 text-sm font-medium text-slate-200">
              <Layers3
                size={17}
                className="text-[var(--color-green)]"
                aria-hidden="true"
              />
              Subsurface Expertise
            </div>

            <div className="flex items-center gap-2.5 text-sm font-medium text-slate-200">
              <MapPinned
                size={17}
                className="text-[var(--color-green)]"
                aria-hidden="true"
              />
              Field-Driven Solutions
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;