import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Info } from "lucide-react";

function ProductAttribution() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-[var(--color-border)] bg-white"
    >
      {/* Scientific background */}
      <div
        className="scientific-grid absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
      />

      {/* Decorative glow */}
      <div
        className={`absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[var(--color-green)]/5 blur-3xl transition-all duration-1000 motion-reduce:transition-none ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
        aria-hidden="true"
      />

      <div className="site-container relative py-10 sm:py-12 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-8">
          {/* Icon */}
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-green-light)] text-[var(--color-green-dark)] transition-all duration-700 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <Info size={22} strokeWidth={1.8} aria-hidden="true" />
          </div>

          {/* Main content */}
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div
              className={`flex items-center gap-3 transition-all delay-100 duration-700 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-green)]">
                Technology Attribution
              </p>

              <span
                className={`h-px bg-[var(--color-green)] transition-all delay-300 duration-700 motion-reduce:w-8 motion-reduce:transition-none ${
                  isVisible ? "w-8" : "w-0"
                }`}
              />
            </div>

            {/* Heading */}
            <h2
              className={`mt-3 text-xl font-bold tracking-tight text-[var(--color-navy)] transition-all delay-150 duration-700 sm:text-2xl motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              TEM Technology & Product Attribution
            </h2>

            {/* Paragraph */}
            <p
              className={`mt-4 text-sm leading-7 text-[var(--color-text-muted)] transition-all delay-200 duration-700 sm:text-base sm:leading-8 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              The TEM systems and product technologies presented on this page,
              including sTEM, tTEM, xTEM and TEM2Go, are developed by
              TEMcompany. All product names, technologies, specifications,
              images and related intellectual property remain the property of
              their respective owner(s). AllGeo Solutions presents this
              information to help clients understand TEM technologies relevant
              to geophysical and subsurface investigations and does not claim
              ownership of these products or their underlying technology. For
              complete and current product information, technical
              specifications and manufacturer documentation, please refer to
              the official TEMcompany website.
            </p>
          </div>

          {/* Official product link */}
          <div
            className={`lg:pt-8 transition-all delay-300 duration-700 motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-6 opacity-0"
            }`}
          >
            <a
              href="https://www.temcompany.com/products/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 whitespace-nowrap text-sm font-bold text-[var(--color-green-dark)] transition-colors duration-200 hover:text-[var(--color-navy)]"
            >
              <span>Official TEMcompany Products</span>

              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Animated bottom accent */}
      <div className="absolute inset-x-0 bottom-0 h-px">
        <div
          className={`mx-auto h-full bg-gradient-to-r from-transparent via-[var(--color-green)]/40 to-transparent transition-all delay-300 duration-1000 motion-reduce:w-full motion-reduce:transition-none ${
            isVisible ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        />
      </div>
    </section>
  );
}

export default ProductAttribution;