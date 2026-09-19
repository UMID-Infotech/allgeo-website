import { useEffect, useRef, useState } from "react";
import { Building2, Droplets, HardHat, Mountain, Leaf } from "lucide-react";

const industries = [
  {
    title: "Government & Public Sector",
    icon: Building2,
    accent: "blue",
  },
  {
    title: "Water & Groundwater",
    icon: Droplets,
    accent: "blue",
  },
  {
    title: "Infrastructure & Construction",
    icon: HardHat,
    accent: "blue",
  },
  {
    title: "Mining & Minerals",
    icon: Mountain,
    accent: "blue",
  },
  {
    title: "Environment & Sustainability",
    icon: Leaf,
    accent: "green",
  },
];

function IndustriesSection() {
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
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);
  //   useEffect(() => {
  //     const section = sectionRef.current;

  //     if (!section) {
  //       return undefined;
  //     }

  //     const prefersReducedMotion = window.matchMedia(
  //       "(prefers-reduced-motion: reduce)",
  //     ).matches;

  //     if (prefersReducedMotion) {
  //       setIsVisible(true);
  //       return undefined;
  //     }

  //     const observer = new IntersectionObserver(
  //       ([entry]) => {
  //         if (entry.isIntersecting) {
  //           setIsVisible(true);
  //           observer.disconnect();
  //         }
  //       },
  //       {
  //         threshold: 0.18,
  //       },
  //     );

  //     observer.observe(section);

  //     return () => {
  //       observer.disconnect();
  //     };
  //   }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="industries-heading"
      className="scientific-grid relative overflow-hidden bg-[var(--color-background-blue)]"
    >
      {/* Decorative scientific background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[var(--color-green)]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[var(--color-navy-light)]/5 blur-3xl"
      />

      <div className="site-container section-spacing relative z-10">
        {/* Section heading */}
        <div
          className={`transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <p className="section-eyebrow">Industries We Serve</p>

          <h2
            id="industries-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-navy)] sm:text-4xl lg:text-[2.65rem]"
          >
            Industries We Serve
          </h2>
        </div>

        {/* Industry cards */}
        <div className="mt-9 grid grid-cols-1 gap-4 min-[430px]:grid-cols-2 md:grid-cols-6 lg:grid-cols-5 lg:gap-5">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const isGreen = industry.accent === "green";

            return (
              <article
                key={industry.title}
                className={`group relative flex min-h-48 flex-col items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border)] bg-white/90 px-5 py-7 text-center shadow-[0_8px_30px_rgba(8,45,87,0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[var(--color-navy-light)]/30 hover:shadow-[0_14px_35px_rgba(8,45,87,0.09)] md:col-span-2 lg:col-span-1 ${
                  index === 3 ? "md:col-start-2 lg:col-start-auto" : ""
                } ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? `${120 + index * 90}ms` : "0ms",
                }}
              >
                {/* Subtle technical line */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
                    isGreen
                      ? "bg-[var(--color-green)]"
                      : "bg-[var(--color-navy-light)]"
                  }`}
                />

                {/* Icon */}
                <div
                  className={`relative flex h-20 w-20 items-center justify-center rounded-full ${
                    isGreen
                      ? "bg-[var(--color-green-light)] text-[var(--color-green-dark)]"
                      : "bg-[var(--color-background-blue)] text-[var(--color-navy-light)]"
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-2 rounded-full border border-current opacity-10"
                  />

                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.8}
                    className="relative h-9 w-9 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Industry title */}
                <h3 className="mt-5 max-w-44 text-[15px] font-bold leading-snug text-[var(--color-navy)] sm:text-base">
                  {industry.title}
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default IndustriesSection;
