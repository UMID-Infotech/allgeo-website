import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ServiceHero({ service }) {
  const imageKitEndpoint =
    import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT?.replace(/\/$/, "") ?? "";

  const imagePath = service?.image;

  const imageUrl = imagePath
    ? /^https?:\/\//i.test(imagePath)
      ? imagePath
      : `${imageKitEndpoint}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`
    : null;

  return (
    <section className="relative isolate flex h-[650px] w-full items-center overflow-hidden bg-[var(--color-navy-dark)]">
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 z-0 h-full w-full max-w-none object-fill"
          aria-hidden="true"
        />
      )}

      <div className="site-container relative z-10 w-full">
        <div className="w-full max-w-[780px] rounded-2xl border border-[var(--color-green)]/60 bg-[rgba(5,35,66,0.27)] p-6 text-white shadow-[0_20px_55px_rgba(5,35,66,0.25)] backdrop-blur-md sm:p-9 lg:p-11">
          <p className="mb-5 inline-flex items-center gap-3 rounded-md bg-[var(--color-green)] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white sm:text-sm">
            <span
              className="h-px w-7 bg-white"
              aria-hidden="true"
            />
            Geoscience Services
          </p>

          <h1
            className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{
              WebkitTextStroke: "1px var(--color-green)",
              paintOrder: "stroke fill",
              textShadow: "0 0 18px rgba(21, 148, 71, 0.45)",
            }}
          >
            {service?.title}
          </h1>

          {service?.shortDescription && (
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
              {service.shortDescription}
            </p>
          )}

          <div className="mt-8">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-green)] px-6 py-3.5 text-sm font-bold !text-white shadow-[0_12px_30px_rgba(21,148,71,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-green-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy-dark)] sm:text-base"
            >
              <span>Discuss Your Project</span>

              <ArrowRight
                size={18}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceHero;