import { useEffect, useRef, useState } from "react";
import { Compass, Database, Microscope, ScanSearch } from "lucide-react";

function WhoWeAre() {
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
        threshold: 0.18,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white section-spacing"
    >
      {/* Subtle background */}
      <div
        className="scientific-grid absolute inset-0 opacity-[0.035]"
        aria-hidden="true"
      />

      <div
        className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-[var(--color-green-light)] opacity-50 blur-3xl"
        aria-hidden="true"
      />

      <div className="site-container relative z-10">
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left editorial column */}
          <div
            className={`transition-all duration-700 motion-reduce:transform-none motion-reduce:transition-none ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-6 opacity-0"
            }`}
          >
            <div className="section-eyebrow">Who We Are</div>

            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-tight tracking-[-0.025em] text-[var(--color-navy)] sm:text-4xl lg:text-5xl">
              Understanding the Earth Beyond
              <span className="block text-[var(--color-green)]">
                What the Surface Reveals.
              </span>
            </h2>

            <div className="mt-8 h-1 w-16 rounded-full bg-[var(--color-green)]" />

            <p className="mt-8 max-w-xl text-base leading-8 text-[var(--color-text-muted)]">
              AllGeo Solutions is a geoscience-focused organization delivering
              integrated solutions for understanding geological,
              hydrogeological, environmental and subsurface conditions.
            </p>

            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--color-text-muted)]">
              Our approach connects field investigation with modern
              geophysical technologies, geological understanding, geospatial
              intelligence and technical interpretation. The objective is not
              simply to collect data, but to convert complex ground conditions
              into clear and useful information for better project decisions.
            </p>
          </div>

          {/* Right scientific composition */}
          <div
            className={`relative transition-all delay-150 duration-700 motion-reduce:transform-none motion-reduce:transition-none ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-6 opacity-0"
            }`}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-background-blue)] p-7 shadow-[var(--shadow-soft)] sm:p-9 lg:p-10">
              <div
                className="scientific-grid absolute inset-0 opacity-[0.06]"
                aria-hidden="true"
              />

              {/* Top marker */}
              <div className="relative flex items-center justify-between border-b border-[var(--color-border)] pb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-green)]">
                    Integrated Geoscience
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                    From field observation to technical understanding
                  </p>
                </div>

                <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white sm:flex">
                  <Compass
                    size={21}
                    className="text-[var(--color-navy)]"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Scientific flow */}
              <div className="relative mt-8 space-y-3">
                <div className="group flex items-center gap-5 rounded-2xl border border-transparent px-4 py-4 transition-all duration-300 hover:border-[var(--color-border)] hover:bg-white">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-navy)] text-white">
                    <ScanSearch size={20} aria-hidden="true" />
                  </div>

                  <div>
                    <p className="font-bold text-[var(--color-navy)]">
                      Investigate
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
                      Observe and investigate geological and subsurface
                      conditions in the field.
                    </p>
                  </div>
                </div>

                <div className="ml-[37px] h-5 w-px bg-[var(--color-border-strong)]" />

                <div className="group flex items-center gap-5 rounded-2xl border border-transparent px-4 py-4 transition-all duration-300 hover:border-[var(--color-border)] hover:bg-white">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-green)] text-white">
                    <Database size={20} aria-hidden="true" />
                  </div>

                  <div>
                    <p className="font-bold text-[var(--color-navy)]">
                      Integrate
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
                      Bring together field observations, measurements and
                      multidisciplinary geoscience data.
                    </p>
                  </div>
                </div>

                <div className="ml-[37px] h-5 w-px bg-[var(--color-border-strong)]" />

                <div className="group flex items-center gap-5 rounded-2xl border border-transparent px-4 py-4 transition-all duration-300 hover:border-[var(--color-border)] hover:bg-white">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-navy-light)] text-white">
                    <Microscope size={20} aria-hidden="true" />
                  </div>

                  <div>
                    <p className="font-bold text-[var(--color-navy)]">
                      Interpret
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
                      Transform complex information into meaningful technical
                      insight and practical understanding.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom statement */}
              <div className="relative mt-8 rounded-2xl bg-[var(--color-navy)] px-6 py-5">
                <p className="text-sm font-medium leading-6 text-slate-200">
                  Our work connects
                  <span className="font-bold text-white">
                    {" "}
                    science, technology and field experience{" "}
                  </span>
                  to support informed decisions about the ground beneath us.
                </p>
              </div>
            </div>

            {/* Decorative coordinate marks */}
            <div
              className="absolute -bottom-5 -left-5 hidden h-20 w-20 border-b-2 border-l-2 border-[var(--color-green)] opacity-40 lg:block"
              aria-hidden="true"
            />

            <div
              className="absolute -right-5 -top-5 hidden h-20 w-20 border-r-2 border-t-2 border-[var(--color-navy)] opacity-15 lg:block"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;