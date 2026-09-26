function ServiceOverview({ service }) {
  const imageKitEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

  const imageUrl = service?.image
    ? /^https?:\/\//i.test(service.image)
      ? service.image
      : `${imageKitEndpoint?.replace(/\/$/, "") ?? ""}${
          service.image.startsWith("/") ? "" : "/"
        }${service.image}`
    : null;

  if (!service?.longDescription) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="scientific-grid absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
      />

      <div
        className="absolute -right-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[var(--color-green)]/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="site-container section-spacing relative">
        <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* Left: heading */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[var(--color-green)]" />

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-green)] sm:text-sm">
                Service Overview
              </p>
            </div>

            <h2 className="mt-5 max-w-md text-3xl font-bold leading-tight tracking-tight text-[var(--color-navy)] sm:text-4xl lg:text-5xl">
              Expertise Built Around Your
              <span className="text-[var(--color-green)]"> Project Needs.</span>
            </h2>
          </div>

          {/* Right: description and image */}
          <div className="lg:border-l lg:border-[var(--color-border)] lg:pl-12">
            <p className="text-base leading-8 text-[var(--color-text-muted)] sm:text-lg sm:leading-9">
              {service.longDescription}
            </p>

            {imageUrl && (
              <div className="group mt-8 w-full max-w-[520px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-background-blue)] p-5 shadow-[0_12px_32px_rgba(8,45,87,0.08)]">
                <img
                  src={imageUrl}
                  alt={`${service.title} complete image`}
                  loading="lazy"
                  className="block w-full origin-center object-contain transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "280px",
                  }}
                />
              </div>
            )}

            <div className="mt-8 flex items-center gap-4 border-t border-[var(--color-border)] pt-6">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-green)]"
                aria-hidden="true"
              />

              <p className="text-sm font-semibold tracking-wide text-[var(--color-navy)]">
                Scientific investigation. Reliable interpretation. Informed
                decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceOverview;