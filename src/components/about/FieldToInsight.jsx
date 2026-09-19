import {
  BarChart3,
  ClipboardCheck,
  Database,
  MapPinCheck,
} from "lucide-react";

const workflow = [
  {
    step: "01",
    title: "Field Investigation",
    description:
      "Site conditions, project requirements and ground characteristics are examined through structured field investigation.",
    icon: MapPinCheck,
  },
  {
    step: "02",
    title: "Data Acquisition",
    description:
      "Relevant geological, geophysical, hydrogeological or spatial information is systematically acquired.",
    icon: Database,
  },
  {
    step: "03",
    title: "Processing & Interpretation",
    description:
      "Collected information is processed, correlated and interpreted within its geological and project context.",
    icon: BarChart3,
  },
  {
    step: "04",
    title: "Technical Insight",
    description:
      "Findings are organized into clear technical understanding that can support informed project decisions.",
    icon: ClipboardCheck,
  },
];

function FieldToInsight() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-dark)] section-spacing text-white">
      <div
        className="scientific-grid absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
      />

      <div
        className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[var(--color-green)] opacity-[0.07] blur-3xl"
        aria-hidden="true"
      />

      <div className="site-container relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-green-300 sm:text-sm">
              From Field to Insight
            </p>

            <h2 className="mt-5 text-3xl font-bold tracking-[-0.025em] sm:text-4xl lg:text-5xl">
              Data Becomes Valuable
              <span className="block text-[var(--color-green)]">
                When It Becomes Understanding.
              </span>
            </h2>

            <p className="mt-6 max-w-lg leading-8 text-slate-300">
              Investigation is only the beginning. The value of geoscience lies
              in connecting field evidence with technical interpretation to
              reveal patterns, conditions and relationships that are not
              immediately visible at the surface.
            </p>
          </div>

          <div className="relative">
            <div
              className="absolute bottom-8 left-[27px] top-8 w-px bg-white/15"
              aria-hidden="true"
            />

            <div className="space-y-5">
              {workflow.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.step}
                    className="relative flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:gap-6 sm:p-6"
                  >
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[var(--color-navy)]">
                      <Icon
                        size={21}
                        className="text-[var(--color-green)]"
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <p className="text-xs font-bold tracking-[0.18em] text-green-300">
                        STEP {item.step}
                      </p>

                      <h3 className="mt-2 text-xl font-bold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        {item.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FieldToInsight;