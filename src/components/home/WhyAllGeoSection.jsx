import { useEffect, useRef, useState } from "react";
import { ChartNoAxesCombined, Cpu, MapPinned, Workflow } from "lucide-react";

function WhyAllGeoSection() {
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
        threshold: 0.12,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const reasons = [
    {
      icon: ChartNoAxesCombined,
      number: "01",
      title: "Scientific Approach",
      description:
        "Every investigation is guided by scientific methods, reliable data acquisition and meaningful interpretation of subsurface conditions.",
    },
    {
      icon: Cpu,
      number: "02",
      title: "Advanced Technology",
      description:
        "Modern geophysical technologies and field-proven systems help us deliver efficient and dependable subsurface investigations.",
    },
    {
      icon: MapPinned,
      number: "03",
      title: "Field Expertise",
      description:
        "Practical field experience across diverse geological conditions enables solutions adapted to real project requirements.",
    },
    {
      icon: Workflow,
      number: "04",
      title: "End-to-End Support",
      description:
        "From survey planning and field investigation to interpretation and technical support, we provide a connected project workflow.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-allgeo-heading"
      className="relative overflow-hidden bg-[var(--color-navy)]"
    >
      {/* Scientific background */}
      <div
        aria-hidden="true"
        className="scientific-grid pointer-events-none absolute inset-0 opacity-[0.07]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[var(--color-green)] opacity-10 blur-3xl"
      />

      <div className="site-container section-spacing relative z-10">
        {/* Section heading */}
        <div
          className={`grid gap-6 transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none lg:grid-cols-[1fr_380px] lg:items-end ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-green-light)]">
              Why AllGeo Solutions
            </p>

            <h2
              id="why-allgeo-heading"
              className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.65rem]"
            >
              Scientific Expertise.
              <br />
              Practical Solutions.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-white/65 sm:text-base lg:justify-self-end">
            Combining geoscience expertise, modern technology and practical
            field experience to support informed decisions below the surface.
          </p>
        </div>

        {/* Reasons */}
        <div className="mt-12 grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <article
                key={reason.number}
                className={`group relative px-1 py-8 transition-all duration-500 ease-out motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none sm:px-6 lg:px-7 ${
                  index !== 0
                    ? "border-t border-white/10 sm:border-t-0 sm:border-l"
                    : ""
                } ${index === 2 ? "sm:border-l-0 lg:border-l" : ""} ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? `${120 + index * 90}ms` : "0ms",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[var(--color-green-light)] transition-colors duration-300 group-hover:bg-[var(--color-green)] group-hover:text-white">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>

                  <span className="text-sm font-semibold text-white/25">
                    {reason.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-white">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/60">
                  {reason.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyAllGeoSection;
