import { Image } from "@imagekit/react";
import { ArrowRight } from "lucide-react";

const HERO_IMAGE_PATH =
  "/allgeo-solutions/home/hero-geological-cutaway.png";

const geologicalCallouts = [
  {
    label: "Surface",
    position: "top-[20%]",
    delay: "700ms",
  },
  {
    label: "Soil",
    position: "top-[34%]",
    delay: "800ms",
  },
  {
    label: "Aquifer",
    position: "top-[49%]",
    delay: "900ms",
  },
  {
    label: "Rock Layers",
    position: "top-[64%]",
    delay: "1000ms",
  },
  {
    label: "Data Insights",
    position: "top-[79%]",
    delay: "1100ms",
  },
];

function HeroSection() {
  const imageKitEndpoint =
    import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[var(--color-background-blue)]"
    >
      {/* =====================================================
          DECORATIVE SCIENTIFIC BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Soft white center area */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_48%,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.72)_35%,rgba(241,247,251,0.42)_72%,rgba(241,247,251,0.75)_100%)]" />

        {/* Very subtle scientific grid */}

        <div className="scientific-grid absolute inset-0 opacity-35" />

        {/* Topographic contour decoration */}

        <svg
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -left-32 top-0 h-[620px] w-[620px] opacity-[0.16]"
        >
          <g
            stroke="var(--color-navy-light)"
            strokeWidth="1"
          >
            <path d="M75 255C109 165 203 94 307 105C409 116 502 198 518 294C536 401 468 497 367 526C269 554 162 518 105 437C67 383 52 319 75 255Z" />
            <path d="M108 264C137 190 214 132 299 140C386 149 465 215 480 296C496 386 438 463 354 488C271 512 184 482 136 416C103 370 88 316 108 264Z" />
            <path d="M143 273C167 215 227 170 295 176C365 182 427 234 441 299C454 369 408 430 340 450C274 470 205 445 167 393C141 357 128 314 143 273Z" />
            <path d="M179 282C197 239 241 207 292 211C344 216 390 254 402 302C413 354 378 398 328 414C278 429 226 410 198 371C179 344 169 312 179 282Z" />
          </g>
        </svg>

        {/* Right-side contour decoration */}

        <svg
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -right-24 -top-20 h-[520px] w-[520px] opacity-[0.13]"
        >
          <g
            stroke="var(--color-green)"
            strokeWidth="1"
          >
            <path d="M42 210C71 110 174 39 280 58C385 77 462 170 452 274C443 378 350 459 244 454C137 449 48 364 37 262C35 244 36 227 42 210Z" />
            <path d="M80 217C104 137 185 82 268 96C351 110 414 184 407 266C400 349 327 412 244 408C160 404 91 338 82 258C80 244 79 230 80 217Z" />
            <path d="M119 222C138 164 197 124 258 134C319 144 366 199 361 260C356 322 302 369 241 366C179 363 128 314 121 255C119 244 118 233 119 222Z" />
          </g>
        </svg>

        {/* Sparse data dots */}

        <div className="absolute right-[9%] top-[16%] hidden h-1.5 w-1.5 rounded-full bg-[var(--color-green)]/35 lg:block" />
        <div className="absolute right-[15%] top-[12%] hidden h-1 w-1 rounded-full bg-[var(--color-navy)]/25 lg:block" />
        <div className="absolute left-[48%] top-[21%] hidden h-1 w-1 rounded-full bg-[var(--color-green)]/30 lg:block" />
      </div>

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div className="site-container relative z-10">
        <div className="grid min-h-[calc(100svh-var(--header-height))] items-center gap-12 py-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-8 lg:py-10 xl:gap-12">
          {/* =================================================
              LEFT — CONTENT
          ================================================= */}

          <div className="relative z-20 max-w-[590px]">
            <p
              className="animate-fade-up text-[11px] font-bold uppercase leading-[1.65] tracking-[0.2em] text-[var(--color-green-dark)] sm:text-xs"
              style={{ animationDelay: "80ms" }}
            >
              <span className="block">Geoscience Today</span>
              <span className="block text-[var(--color-navy-light)]">
                Solutions for Tomorrow
              </span>
            </p>

            <h1
              id="hero-heading"
              className="animate-fade-up mt-5 max-w-[570px] text-[clamp(2.35rem,4.15vw,4.35rem)] font-bold leading-[1.04] tracking-[-0.035em] text-[var(--color-navy)]"
              style={{ animationDelay: "170ms" }}
            >
              Advanced Geoscience Solutions for Smarter Subsurface
              Decisions.
            </h1>

            <p
              className="animate-fade-up mt-6 max-w-[560px] text-[15px] leading-7 text-[var(--color-text-muted)] sm:text-base sm:leading-7"
              style={{ animationDelay: "270ms" }}
            >
              Integrated geology, geophysics and hydrogeology
              expertise for reliable subsurface investigation,
              groundwater assessment and data-driven project
              decisions.
            </p>

            {/* CTAs */}

            <div
              className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "370ms" }}
            >
              <a
                href="#services"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] bg-[var(--color-navy)] px-6 text-sm font-semibold !text-white shadow-[0_8px_22px_rgba(8,45,87,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-navy-dark)]"              >
                <span>Explore Services</span>

                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#products"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] border border-[var(--color-navy-light)] bg-white/75 px-6 text-sm font-semibold text-[var(--color-navy)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-green)] hover:bg-white"
              >
                <span>Explore Products</span>

                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>

          {/* =================================================
              RIGHT — GEOLOGICAL VISUAL
          ================================================= */}

          <div
            className="animate-slide-left relative mx-auto w-full max-w-[760px] lg:mx-0 lg:max-w-none"
            style={{ animationDelay: "300ms" }}
          >
            <div className="relative lg:pr-[128px] xl:pr-[145px]">
              {/* Geological image */}

              <div className="relative mx-auto aspect-[4/3] w-full max-w-[680px]">
                <Image
                  urlEndpoint={imageKitEndpoint}
                  src={HERO_IMAGE_PATH}
                  alt="Geological subsurface cutaway showing terrain, soil, aquifer, groundwater and deeper rock formations used for geoscience investigation"
                  width={1200}
                  height={900}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  transformation={[
                    {
                      width: 1200,
                      quality: 85,
                      format: "auto",
                    },
                  ]}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* =============================================
                  DESKTOP / LARGE TABLET CALLOUTS
              ============================================= */}

              <div className="absolute inset-y-0 right-0 hidden w-[155px] lg:block">
                {geologicalCallouts.map((callout) => (
                  <div
                    key={callout.label}
                    className={`animate-fade-in absolute right-0 flex w-full -translate-y-1/2 items-center ${callout.position}`}
                    style={{
                      animationDelay: callout.delay,
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="relative mr-2 h-px flex-1 bg-[var(--color-navy)]/25"
                    >
                      <span className="absolute -left-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--color-green)]" />
                    </div>

                    <span className="w-[78px] text-[11px] font-semibold leading-4 text-[var(--color-navy)] xl:text-xs">
                      {callout.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* =============================================
                MOBILE / TABLET SCIENTIFIC LEGEND
            ============================================= */}

            <div
              className="animate-fade-in mt-5 grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-5 lg:hidden"
              style={{ animationDelay: "700ms" }}
              aria-label="Geological layers shown in illustration"
            >
              {geologicalCallouts.map((callout) => (
                <div
                  key={callout.label}
                  className="flex min-h-10 items-center gap-2 border-l border-[var(--color-border-strong)] pl-3"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-green)]"
                  />

                  <span className="text-xs font-semibold text-[var(--color-navy)]">
                    {callout.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;