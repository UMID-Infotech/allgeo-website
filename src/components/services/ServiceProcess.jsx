import {
  ClipboardCheck,
  MapPinned,
  ChartNoAxesCombined,
  FileSearch,
} from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Understand Requirement",
    description:
      "We begin by understanding the project objectives, site conditions and investigation requirements.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "Field Investigation",
    description:
      "Our team conducts systematic field investigations using appropriate scientific methods and technologies.",
    icon: MapPinned,
  },
  {
    number: "03",
    title: "Data Analysis",
    description:
      "Collected field data is carefully processed and analyzed to identify meaningful subsurface information.",
    icon: ChartNoAxesCombined,
  },
  {
    number: "04",
    title: "Interpretation & Reporting",
    description:
      "Findings are interpreted and presented through clear technical insights and project-focused reporting.",
    icon: FileSearch,
  },
];

function ServiceProcess() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] text-white">
      {/* Scientific grid */}
      <div
        className="scientific-grid absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
      />

      {/* Decorative glows */}
      <div
        className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-[var(--color-green)]/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[var(--color-navy-light)]/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="site-container section-spacing relative">
        {/* Heading */}
        <div className="mb-12 max-w-3xl lg:mb-16">
          <div className="flex items-center gap-3">
            <span className="h-px w-9 bg-[var(--color-green)]" />

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-green)] sm:text-sm">
              How We Work
            </p>
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            A Scientific Approach
            <span className="text-[var(--color-green)]">
              {" "}
              From Field to Insight.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
            Every project follows a structured approach focused on reliable
            investigation, careful analysis and meaningful interpretation.
          </p>
        </div>

        {/* Process */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div
            className="absolute left-0 right-0 top-7 hidden h-px bg-white/15 lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative">
                  {/* Step marker */}
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-green)]/40 bg-[var(--color-navy-dark)] shadow-[0_0_0_7px_rgba(8,45,87,1)]">
                    <span className="text-sm font-bold text-[var(--color-green)]">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-7">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-[var(--color-green)]">
                      <Icon size={21} strokeWidth={1.8} />
                    </div>

                    <h3 className="text-lg font-bold text-white sm:text-xl">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceProcess;