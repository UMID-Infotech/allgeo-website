import { Eye, Target } from "lucide-react";

function MissionVision() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] section-spacing text-white">
      <div
        className="scientific-grid absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
      />

      <div
        className="absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[var(--color-green)] opacity-[0.08] blur-3xl"
        aria-hidden="true"
      />

      <div className="site-container relative z-10">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-green-300 sm:text-sm">
            Our Purpose
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-[-0.025em] sm:text-4xl lg:text-5xl">
            Driven by Understanding.
            <span className="block text-[var(--color-green)]">
              Focused on Better Decisions.
            </span>
          </h2>
        </div>

        <div className="grid overflow-hidden rounded-[2rem] border border-white/10 lg:grid-cols-2">
          <article className="relative p-8 sm:p-10 lg:p-12">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-green)]">
              <Target size={25} aria-hidden="true" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-300">
              Our Mission
            </p>

            <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
              Deliver geoscience that creates practical value.
            </h3>

            <p className="mt-6 max-w-xl leading-8 text-slate-300">
              Our mission is to provide scientifically sound, technology-driven
              and field-oriented geoscience solutions that help clients
              understand subsurface conditions, reduce uncertainty and make
              informed technical decisions.
            </p>
          </article>

          <article className="relative border-t border-white/10 bg-white/[0.04] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <Eye size={25} aria-hidden="true" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-300">
              Our Vision
            </p>

            <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
              Advance the way subsurface challenges are understood.
            </h3>

            <p className="mt-6 max-w-xl leading-8 text-slate-300">
              Our vision is to strengthen geoscience practice through the
              thoughtful integration of scientific expertise, modern
              investigation technologies and multidisciplinary interpretation,
              delivering dependable insight across diverse ground conditions.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default MissionVision;