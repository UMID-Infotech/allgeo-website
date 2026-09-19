import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

function ProductHero() {
  const [isVisible, setIsVisible] = useState(false);

  const imageKitEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

  const heroImage = `${imageKitEndpoint}/allgeo-solutions/home/temtechproduct.webp`;

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById("stem");

    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden bg-[var(--color-background-blue)]">
      {/* Scientific grid */}
      <div
        className={`scientific-grid absolute inset-0 -z-20 transition-opacity duration-1000 motion-reduce:opacity-[0.045] motion-reduce:transition-none ${
          isVisible ? "opacity-[0.045]" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Soft background glows */}
      <div
        className={`absolute -left-40 top-20 -z-20 h-96 w-96 rounded-full bg-[var(--color-green)]/5 blur-3xl transition-all duration-1000 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
        aria-hidden="true"
      />

      <div
        className={`absolute -right-40 top-0 -z-20 h-[32rem] w-[32rem] rounded-full bg-[var(--color-navy)]/5 blur-3xl transition-all duration-1000 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Decorative scientific rings */}
      <div
        className={`absolute -left-28 top-1/2 -z-10 hidden h-80 w-80 -translate-y-1/2 rounded-full border border-[var(--color-navy)]/5 transition-all delay-300 duration-1000 lg:block motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
        aria-hidden="true"
      />

      <div
        className={`absolute -left-20 top-1/2 -z-10 hidden h-64 w-64 -translate-y-1/2 rounded-full border border-[var(--color-navy)]/5 transition-all delay-500 duration-1000 lg:block motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
        aria-hidden="true"
      />

      <div className="site-container flex min-h-[78vh] items-center py-16 sm:py-20 lg:py-24">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          {/* Content */}
          <div className="relative z-10">
            {/* Eyebrow */}
            <div
              className={`flex items-center gap-3 transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-green)] sm:text-sm">
                Our Technology
              </p>

              <span
                className={`h-px bg-[var(--color-green)] transition-all delay-300 duration-700 motion-reduce:w-10 motion-reduce:transition-none ${
                  isVisible ? "w-10" : "w-0"
                }`}
              />
            </div>

            {/* Heading */}
            <h1
              className={`mt-6 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-[var(--color-navy)] transition-all delay-100 duration-700 ease-out sm:text-5xl lg:text-6xl xl:text-7xl motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-7 opacity-0"
              }`}
            >
              Advanced TEM Systems for{" "}
              <span className="text-[var(--color-green)]">
                Subsurface Investigation.
              </span>
            </h1>

            {/* Description */}
            <p
              className={`mt-6 max-w-xl text-base leading-7 text-[var(--color-text-muted)] transition-all delay-200 duration-700 ease-out sm:text-lg sm:leading-8 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              Explore portable, towed and deep-penetration transient
              electromagnetic systems designed for accurate and efficient
              groundwater, geological and subsurface investigations.
            </p>

            {/* CTA */}
            <div
              className={`transition-all delay-300 duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={scrollToProducts}
                className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-green)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(21,148,71,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-green-dark)] hover:shadow-[0_16px_36px_rgba(21,148,71,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2 sm:text-base"
              >
                <span>Explore Products</span>

                <ArrowDown
                  size={18}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-y-1"
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Supporting points */}
            <div
              className={`mt-10 grid max-w-xl gap-5 border-t border-[var(--color-border)] pt-6 transition-all delay-500 duration-700 ease-out sm:grid-cols-3 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              <div>
                <p className="text-sm font-bold text-[var(--color-navy)]">
                  Deeper Insights
                </p>

                <p className="mt-1 text-xs leading-5 text-[var(--color-text-muted)]">
                  Understand what lies beneath.
                </p>
              </div>

              <div className="sm:border-l sm:border-[var(--color-border)] sm:pl-5">
                <p className="text-sm font-bold text-[var(--color-navy)]">
                  Reliable Technology
                </p>

                <p className="mt-1 text-xs leading-5 text-[var(--color-text-muted)]">
                  Built for field investigation.
                </p>
              </div>

              <div className="sm:border-l sm:border-[var(--color-border)] sm:pl-5">
                <p className="text-sm font-bold text-[var(--color-navy)]">
                  Field Ready
                </p>

                <p className="mt-1 text-xs leading-5 text-[var(--color-text-muted)]">
                  Designed for real-world surveys.
                </p>
              </div>
            </div>
          </div>

          {/* Product image */}
          <div
            className={`relative flex items-center justify-center transition-all delay-200 duration-1000 ease-out lg:min-h-[540px] motion-reduce:translate-x-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${
              isVisible
                ? "translate-x-0 scale-100 opacity-100"
                : "translate-x-10 scale-[0.97] opacity-0"
            }`}
          >
            {/* Large decorative rings */}
            <div
              className={`absolute right-0 top-1/2 hidden h-[430px] w-[430px] -translate-y-1/2 rounded-full border border-[var(--color-navy)]/5 transition-all delay-500 duration-1000 xl:block motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${
                isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
              aria-hidden="true"
            />

            <div
              className={`absolute right-12 top-1/2 hidden h-[330px] w-[330px] -translate-y-1/2 rounded-full border border-[var(--color-green)]/10 transition-all delay-700 duration-1000 xl:block motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${
                isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
              aria-hidden="true"
            />

            {/* Image */}
            <div className="relative w-full overflow-hidden">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-24 bg-gradient-to-r from-[var(--color-background-blue)] to-transparent lg:block"
                aria-hidden="true"
              />

              <img
                src={heroImage}
                alt="TEM geophysical survey systems for subsurface investigation"
                className="relative z-0 mx-auto w-full max-w-[720px] object-contain mix-blend-multiply"
              />
            </div>

            {/* Technical label */}
            <div
              className={`absolute bottom-4 right-0 hidden items-center gap-3 transition-all delay-700 duration-700 xl:flex motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-5 opacity-0"
              }`}
            >
              <span className="h-px w-10 bg-[var(--color-green)]" />

              <p className="text-[10px] font-bold uppercase leading-5 tracking-[0.22em] text-[var(--color-navy)]">
                Geoscience Technology
                <br />
                Real-World Impact
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated bottom line */}
      <div className="absolute inset-x-0 bottom-0 h-px">
        <div
          className={`mx-auto h-full bg-gradient-to-r from-transparent via-[var(--color-green)]/25 to-transparent transition-all delay-500 duration-1000 motion-reduce:w-full motion-reduce:transition-none ${
            isVisible ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export default ProductHero;
