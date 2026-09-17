import { useEffect, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  Map,
  ScanSearch,
} from "lucide-react";

import presenceData from "../../data/presence.js";

const capabilityIcons = [
  Map,
  BriefcaseBusiness,
  ScanSearch,
];

function AcrossIndia() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const imageUrl = `${import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}${presenceData.image.src}`;

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
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
        threshold: 0.16,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const revealBase =
    "transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="across-india-heading"
      className="relative isolate overflow-hidden bg-[var(--color-navy)] text-white"
    >
      {/* =====================================================
          SCIENTIFIC BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Deep navy tonal gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_48%,rgba(24,120,160,0.16)_0%,rgba(8,45,87,0.05)_38%,transparent_68%)]" />

        {/* Existing scientific grid */}
        <div className="scientific-grid absolute inset-0 opacity-[0.07]" />

        {/* Left contour lines */}
        <svg
          viewBox="0 0 650 650"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -left-52 top-1/2 h-[650px] w-[650px] -translate-y-1/2 opacity-[0.10]"
        >
          <g
            stroke="var(--color-green-light)"
            strokeWidth="1"
          >
            <path d="M75 272C111 163 220 91 335 108C448 125 538 219 535 329C532 440 436 529 323 532C208 535 106 456 72 350C64 324 64 297 75 272Z" />
            <path d="M119 279C148 193 235 136 327 149C418 162 490 237 488 326C486 414 409 484 319 487C228 489 147 426 120 342C113 321 113 299 119 279Z" />
            <path d="M163 286C185 222 250 179 320 189C389 199 444 256 442 324C440 391 382 444 314 446C245 448 184 400 163 337C158 320 158 302 163 286Z" />
            <path d="M208 293C224 251 267 223 316 230C363 237 400 276 399 322C398 368 358 404 311 405C264 407 222 374 208 331C204 319 204 305 208 293Z" />
          </g>
        </svg>

        {/* Right geological contour */}
        <svg
          viewBox="0 0 560 560"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -right-24 -top-32 h-[560px] w-[560px] opacity-[0.08]"
        >
          <g
            stroke="var(--color-green)"
            strokeWidth="1"
          >
            <path d="M50 240C84 130 196 55 312 75C426 95 505 199 490 311C475 421 372 500 258 488C143 476 55 383 45 274C44 262 46 250 50 240Z" />
            <path d="M94 245C121 159 210 101 301 116C391 132 453 214 442 302C430 389 349 451 260 442C169 432 100 359 92 273C91 263 92 253 94 245Z" />
            <path d="M138 250C159 188 224 145 292 157C358 168 405 229 396 294C387 359 327 405 261 398C194 391 143 337 137 274C136 266 136 258 138 250Z" />
          </g>
        </svg>
      </div>

      <div className="site-container section-spacing relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10 xl:gap-16">
          {/* =================================================
              LEFT — CONTENT
          ================================================= */}

          <div className="relative z-20">
            <div
              className={`${revealBase} flex items-center gap-4 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              <p className="section-eyebrow text-[var(--color-green-light)]">
                {presenceData.eyebrow}
              </p>

              <span
                aria-hidden="true"
                className={`h-px bg-[var(--color-green)]/65 transition-[width] delay-200 duration-700 motion-reduce:transition-none ${
                  isVisible ? "w-16" : "w-0"
                }`}
              />
            </div>

            <h2
              id="across-india-heading"
              className={`${revealBase} mt-5 max-w-[620px] text-[clamp(2.1rem,3.5vw,3.7rem)] font-bold leading-[1.08] tracking-[-0.03em] delay-100 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              {presenceData.heading}
            </h2>

            <p
              className={`${revealBase} mt-6 max-w-[570px] text-[15px] leading-7 text-white/65 delay-200 sm:text-base ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              {presenceData.description}
            </p>

            {/* Capabilities */}
            <div className="mt-10 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {presenceData.capabilities.map((capability, index) => {
                const Icon = capabilityIcons[index];

                return (
                  <article
                    key={capability.title}
                    className={`${revealBase} group relative border-t border-white/15 pt-5 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${300 + index * 90}ms`,
                    }}
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-green)]/20 bg-[var(--color-green)]/10 text-[var(--color-green-light)] transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transform-none">
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="text-sm font-bold leading-5 text-white">
                      {capability.title}
                    </h3>

                    <p className="mt-2 text-[13px] leading-5 text-white/50">
                      {capability.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          {/* =================================================
              RIGHT — INDIA TERRAIN VISUAL
          ================================================= */}

          <div
            className={`${revealBase} relative mx-auto flex min-h-[390px] w-full max-w-[780px] items-center justify-center duration-1000 sm:min-h-[500px] lg:min-h-[610px] lg:max-w-none ${
              isVisible
                ? "translate-x-0 scale-100 opacity-100"
                : "translate-x-10 scale-[0.97] opacity-0"
            }`}
            style={{
              transitionDelay: "220ms",
            }}
          >
            {/* Large ambient glow */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-navy-light)]/25 blur-[90px]"
            />

            {/* Green geological glow */}
            <div
              aria-hidden="true"
              className="absolute left-[57%] top-[48%] h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-green)]/10 blur-[75px]"
            />

            {/* Technical orbital rings */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]"
            />

            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[61%] w-[61%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-green)]/[0.07]"
            />

            {/* Terrain image */}
            <div
              className={`${revealBase} relative z-10 w-full ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              style={{
                transitionDelay: "360ms",
              }}
            >
              <img
                src={imageUrl}
                alt={presenceData.image.alt}
                loading="lazy"
                decoding="async"
                className="relative mx-auto h-auto w-full max-w-[760px] object-contain drop-shadow-[0_28px_45px_rgba(0,0,0,0.32)] transition-transform duration-[1600ms] ease-out hover:scale-[1.015] motion-reduce:transform-none motion-reduce:transition-none"
              />

              {/* Bottom blend */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[8%] bottom-0 h-[20%] bg-gradient-to-t from-[var(--color-navy)]/45 to-transparent blur-xl"
              />
            </div>

            {/* Small scientific data points */}
            <span
              aria-hidden="true"
              className="absolute right-[14%] top-[19%] hidden h-1.5 w-1.5 rounded-full bg-[var(--color-green)] shadow-[0_0_14px_rgba(57,181,74,0.75)] lg:block"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-[20%] left-[13%] hidden h-1 w-1 rounded-full bg-white/60 lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AcrossIndia;