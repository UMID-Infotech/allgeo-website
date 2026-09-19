import { useEffect, useRef, useState } from "react";
import { Image } from "@imagekit/react";
import { Activity, Clock3, Layers3, Leaf, Radio, Zap } from "lucide-react";

const TEM_IMAGE_PATH = "/allgeo-solutions/home/temtechproduct.webp";

const temCapabilities = [
  {
    title: "Sensitive to Conductive Materials",
    description:
      "Effective for identifying conductive subsurface zones and resistivity variations.",
    icon: Radio,
  },
  {
    title: "Non-Invasive Investigation",
    description:
      "Uses wire loops to transmit and receive electromagnetic signals without disturbing the survey site.",
    icon: Leaf,
  },
  {
    title: "Minimal Site Impact",
    description:
      "Leaves no trace on the survey site after field data collection.",
    icon: Activity,
  },
  {
    title: "Fast & Efficient Surveys",
    description:
      "Requires a transmitter loop and one or two smaller receiver coils for efficient field acquisition.",
    icon: Zap,
  },
  {
    title: "Investigation Depth up to 600 m",
    description:
      "Capable of deep resistivity measurements depending on survey and site conditions.",
    icon: Layers3,
  },
  {
    title: "Rapid Data Acquisition",
    description:
      "Individual measurements can be completed within minutes, from setup through resistivity modelling.",
    icon: Clock3,
  },
];

function TemTechno() {
  const imageKitEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

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

    return () => {
      observer.disconnect();
    };
  }, []);

  const revealBase =
    "transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="tem-technology-heading"
      className="relative isolate overflow-hidden bg-white"
    >
      {/* Decorative scientific background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(241,247,251,0.62)_0%,rgba(255,255,255,0.92)_35%,rgba(255,255,255,1)_70%)]" />

        <svg
          viewBox="0 0 700 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -left-20 top-1/2 h-[520px] w-[760px] -translate-y-1/2 opacity-[0.11]"
        >
          <g stroke="var(--color-navy-light)" strokeWidth="1">
            <path d="M48 214C91 96 220 32 343 66C459 98 552 199 538 305C525 403 422 455 315 424C206 393 92 353 48 214Z" />
            <path d="M91 217C126 124 229 76 329 102C424 127 500 207 489 291C478 370 396 411 310 387C222 362 126 327 91 217Z" />
            <path d="M136 219C163 152 239 116 317 136C392 155 450 216 442 280C433 340 371 372 304 353C236 334 163 307 136 219Z" />
            <path d="M180 221C200 177 250 151 307 166C360 180 402 224 396 269C390 312 345 335 298 322C249 308 199 288 180 221Z" />
          </g>
        </svg>

        <div className="scientific-grid absolute inset-0 opacity-[0.18]" />
      </div>

      <div className="site-container relative z-10 py-[clamp(72px,7vw,108px)]">
        {/* Section heading */}

        <div
          className={`${revealBase} mb-10 flex items-center gap-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <p className="section-eyebrow whitespace-nowrap">
            Featured Technology
          </p>

          <span
            aria-hidden="true"
            className={`h-px bg-[var(--color-green)]/55 transition-[width] delay-200 duration-700 motion-reduce:transition-none ${
              isVisible ? "w-16" : "w-0"
            }`}
          />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.15fr_0.9fr] lg:gap-8 xl:gap-12">
          {/* ===============================================
              LEFT — TEM CONTENT
          =============================================== */}

          <div>
            <h2
              id="tem-technology-heading"
              className={`${revealBase} max-w-[520px] text-[clamp(2rem,3vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--color-navy)] delay-100 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              TEM Technology — Go Deeper, Know Better.
            </h2>

            <p
              className={`${revealBase} mt-6 max-w-[560px] text-[15px] leading-7 text-[var(--color-text-muted)] delay-200 sm:text-base ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              The Transient Electromagnetic (TEM) geophysical survey method is a
              modern technique designed to measure vertical resistivity profiles
              with particular sensitivity to conductive materials. It enables
              fast, non-invasive investigation of subsurface conditions for
              reliable geoscientific interpretation.
            </p>

            <div
              className={`${revealBase} mt-7 flex items-center gap-3 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-[var(--color-green)]"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[var(--color-navy-light)]">
                Transient Electromagnetic Survey
              </p>
            </div>
          </div>

          {/* ===============================================
              CENTER — TEM PRODUCT IMAGE
          =============================================== */}

          <div
            className={`${revealBase} relative mx-auto w-full max-w-[600px] delay-200 duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-6 opacity-0"
            }`}
          >
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-background-blue)]"
            />

            <div className="relative aspect-[4/3]">
              <Image
                urlEndpoint={imageKitEndpoint}
                src={TEM_IMAGE_PATH}
                alt="Transient Electromagnetic geophysical survey equipment for subsurface resistivity investigation"
                width={900}
                height={675}
                loading="lazy"
                decoding="async"
                transformation={[
                  {
                    width: 900,
                    quality: 85,
                    format: "auto",
                  },
                ]}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* ===============================================
              RIGHT — TEM CAPABILITIES
          =============================================== */}

          <div>
            <ul className="space-y-5">
              {temCapabilities.map((capability, index) => {
                const Icon = capability.icon;

                return (
                  <li
                    key={capability.title}
                    className={`${revealBase} group flex gap-4 ${
                      isVisible
                        ? "translate-x-0 opacity-100"
                        : "translate-x-6 opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${300 + index * 90}ms`,
                    }}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-green-light)] text-[var(--color-green-dark)] transition-transform duration-200 group-hover:-translate-y-0.5">
                      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                    </div>

                    <div>
                      <h3 className="text-[14px] font-bold leading-5 text-[var(--color-navy)]">
                        {capability.title}
                      </h3>

                      <p className="mt-1 text-[13px] leading-5 text-[var(--color-text-muted)]">
                        {capability.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TemTechno;
