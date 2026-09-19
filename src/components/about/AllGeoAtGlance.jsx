import {
  Binary,
  Layers3,
  Map,
  Network,
} from "lucide-react";

const principles = [
  {
    title: "Multidisciplinary",
    description:
      "Connecting geological, geophysical, hydrogeological, geospatial and environmental understanding.",
    icon: Network,
  },
  {
    title: "Technology Driven",
    description:
      "Using modern investigation technologies and data-led methods to study complex subsurface conditions.",
    icon: Binary,
  },
  {
    title: "Field Focused",
    description:
      "Keeping field evidence and real ground conditions at the centre of technical interpretation.",
    icon: Map,
  },
  {
    title: "Integrated Insight",
    description:
      "Bringing multiple layers of information together to develop a more complete technical picture.",
    icon: Layers3,
  },
];

function AllGeoAtGlance() {
  return (
    <section className="relative bg-white section-spacing">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <div className="section-eyebrow">AllGeo at a Glance</div>

            <h2 className="mt-5 text-3xl font-bold tracking-[-0.025em] text-[var(--color-navy)] sm:text-4xl lg:text-5xl">
              Built Around the
              <span className="block text-[var(--color-green)]">
                Science of the Ground.
              </span>
            </h2>

            <p className="mt-6 max-w-lg leading-8 text-[var(--color-text-muted)]">
              AllGeo Solutions approaches every assignment with the
              understanding that reliable geoscience depends on context,
              evidence, appropriate technology and careful interpretation.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.title}
                  className="group bg-white p-7 transition-colors duration-300 hover:bg-[var(--color-background-blue)] sm:p-8"
                >
                  <Icon
                    size={25}
                    className="text-[var(--color-green)]"
                    aria-hidden="true"
                  />

                  <h3 className="mt-6 text-xl font-bold text-[var(--color-navy)]">
                    {principle.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                    {principle.description}
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

export default AllGeoAtGlance;