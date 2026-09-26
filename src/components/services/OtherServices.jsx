import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { getAllServices } from "../../services/servicesRelatedService";

function OtherServices({ currentServiceSlug }) {
  const imageKitEndpoint =
    import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT?.replace(/\/$/, "") ?? "";

  const [services, setServices] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        const data = await getAllServices();

        if (isMounted) {
          setServices(data);
        }
      } catch {
        if (isMounted) {
          setServices([]);
        }
      }
    };

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  const otherServices = services.filter(
    (service) => service.slug !== currentServiceSlug
  );

  if (otherServices.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="scientific-grid absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
      />

      <div
        className="absolute -right-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[var(--color-green)]/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="site-container section-spacing relative">
        <div className="mb-10 max-w-3xl sm:mb-12 lg:mb-14">
          <div className="flex items-center gap-3">
            <span
              className="h-px w-9 bg-[var(--color-green)]"
              aria-hidden="true"
            />

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-green)] sm:text-sm">
              Explore More
            </p>
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[var(--color-navy)] sm:text-4xl lg:text-5xl">
            Other Geoscience{" "}
            <span className="text-[var(--color-green)]">Services.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] sm:text-lg">
            Explore our integrated geoscience capabilities designed to support
            informed decisions across different stages of your project.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {otherServices.map((service) => {
            const imagePath = service.image;

            const serviceImage = imagePath
              ? /^https?:\/\//i.test(imagePath)
                ? imagePath
                : `${imageKitEndpoint}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`
              : null;

            return (
              <Link
                key={service._id ?? service.slug}
                to={`/services/${service.slug}`}
                className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_8px_30px_rgba(8,45,87,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-green)]/30 hover:shadow-[0_16px_40px_rgba(8,45,87,0.1)]"
              >
                {serviceImage && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-background-blue)]">
                    <img
                      src={serviceImage}
                      alt={service.title}
                      loading="lazy"
                      className="absolute inset-0 max-w-none transition-transform duration-500 group-hover:scale-105"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />

                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(5,35,66,0.35)] via-transparent to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div className="flex min-h-[210px] flex-col p-5 sm:p-6">
                  <h3 className="text-lg font-bold leading-snug text-[var(--color-navy)] transition-colors duration-300 group-hover:text-[var(--color-green-dark)]">
                    {service.title}
                  </h3>

                  {service.shortDescription && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--color-text-muted)]">
                      {service.shortDescription}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-between pt-6">
                    <span className="text-sm font-bold text-[var(--color-green)]">
                      Explore Service
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-green-light)] text-[var(--color-green-dark)] transition-all duration-300 group-hover:bg-[var(--color-green)] group-hover:text-white">
                      <ArrowUpRight
                        size={17}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default OtherServices;