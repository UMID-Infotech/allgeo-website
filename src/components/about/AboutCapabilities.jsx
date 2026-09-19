import {
  Droplets,
  Earth,
  Leaf,
  MapPinned,
  RadioTower,
} from "lucide-react";

const capabilities = [
  {
    number: "01",
    title: "Geophysical Surveys",
    description:
      "Subsurface investigation using appropriate geophysical methods to understand geological structures, groundwater conditions and other hidden ground characteristics.",
    icon: RadioTower,
  },
  {
    number: "02",
    title: "Geological Services",
    description:
      "Field-based geological assessment and interpretation to understand lithology, structures, terrain and geological conditions relevant to a project.",
    icon: Earth,
  },
  {
    number: "03",
    title: "Geospatial Services",
    description:
      "Spatial information, mapping and geospatial analysis that connect location-based data with geological and project understanding.",
    icon: MapPinned,
  },
  {
    number: "04",
    title: "Hydrogeological Services",
    description:
      "Investigation and interpretation of groundwater occurrence, aquifer conditions and the relationship between geology and groundwater systems.",
    icon: Droplets,
  },
  {
    number: "05",
    title: "Environmental Services",
    description:
      "Geoscience-informed environmental investigation supporting a clearer understanding of site conditions and environmental considerations.",
    icon: Leaf,
  },
];

function AboutCapabilities() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-background-blue)] section-spacing">
      <div
        className="scientific-grid absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
      />

      <div className="site-container relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="section-eyebrow">Our Capabilities</div>

            <h2 className="mt-5 text-3xl font-bold tracking-[-0.025em] text-[var(--color-navy)] sm:text-4xl lg:text-5xl">
              One Perspective.
              <span className="block text-[var(--color-green)]">
                Multiple Disciplines.
              </span>
            </h2>

            <p className="mt-6 max-w-md leading-8 text-[var(--color-text-muted)]">
              Subsurface challenges rarely belong to a single discipline.
              AllGeo brings complementary geoscience capabilities together to
              build a more complete understanding of the site and its
              conditions.
            </p>

            <div className="mt-8 hidden h-px w-full bg-gradient-to-r from-[var(--color-green)] to-transparent lg:block" />
          </div>

          <div className="border-t border-[var(--color-border-strong)]">
            {capabilities.map((capability) => {
              const Icon = capability.icon;

              return (
                <article
                  key={capability.number}
                  className="group grid gap-5 border-b border-[var(--color-border-strong)] py-7 sm:grid-cols-[60px_1fr_auto] sm:items-start sm:gap-7"
                >
                  <span className="text-sm font-bold tracking-[0.15em] text-[var(--color-green)]">
                    {capability.number}
                  </span>

                  <div>
                    <h3 className="text-xl font-bold text-[var(--color-navy)] sm:text-2xl">
                      {capability.title}
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                      {capability.description}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white text-[var(--color-navy)] transition-all duration-300 group-hover:border-[var(--color-navy)] group-hover:bg-[var(--color-navy)] group-hover:text-white">
                    <Icon size={19} aria-hidden="true" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCapabilities;