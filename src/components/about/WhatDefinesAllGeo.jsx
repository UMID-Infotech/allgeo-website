import { Activity, ChartNoAxesCombined, Cpu, Map, Search } from "lucide-react";

const stages = [
  {
    number: "01",
    title: "Scientific Understanding",
    description:
      "Every assignment begins with understanding the geological setting, project objective and the questions that need to be answered.",
    icon: Search,
  },
  {
    number: "02",
    title: "Field Investigation",
    description:
      "Ground conditions are investigated through appropriate field methods, observations and systematic data acquisition.",
    icon: Map,
  },
  {
    number: "03",
    title: "Advanced Technology",
    description:
      "Modern geoscience and geophysical technologies support efficient investigation of complex subsurface conditions.",
    icon: Cpu,
  },
  {
    number: "04",
    title: "Technical Interpretation",
    description:
      "Multiple datasets and field findings are evaluated together to develop a meaningful understanding of the subsurface.",
    icon: Activity,
  },
  {
    number: "05",
    title: "Actionable Insight",
    description:
      "Technical findings are transformed into clear information that supports planning, investigation and better project decisions.",
    icon: ChartNoAxesCombined,
  },
];

function WhatDefinesAllGeo() {
  return (
    <section className="relative overflow-hidden bg-white section-spacing">
      <div className="site-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-eyebrow">What Defines AllGeo</div>

          <h2 className="mt-5 text-3xl font-bold tracking-[-0.025em] text-[var(--color-navy)] sm:text-4xl lg:text-5xl">
            From Scientific Question
            <span className="block text-[var(--color-green)]">
              to Practical Insight.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-[var(--color-text-muted)]">
            Our work follows a connected process where science, field
            investigation, technology and interpretation contribute to a clearer
            understanding of the ground.
          </p>
        </div>

        <div className="relative mt-16">
          <div
            className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-[var(--color-border-strong)] lg:block"
            aria-hidden="true"
          />

          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {stages.map((stage) => {
              const Icon = stage.icon;

              return (
                <article
                  key={stage.number}
                  className="group relative bg-white text-center"
                >
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-[var(--color-background-blue)] shadow-sm transition-all duration-300 group-hover:bg-[var(--color-navy)] group-hover:text-white">
                    <Icon
                      size={22}
                      className="text-[var(--color-green)] transition-colors duration-300 group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-6 text-xs font-bold tracking-[0.18em] text-[var(--color-green)]">
                    {stage.number}
                  </p>

                  <h3 className="mt-3 text-lg font-bold text-[var(--color-navy)]">
                    {stage.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                    {stage.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatDefinesAllGeo;
