import { useEffect, useRef, useState } from "react";
import { ArrowRight, RefreshCcw } from "lucide-react";
import { getAllServices } from "../../services/servicesRelatedService";

function ServicesSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const imageKitEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

  const isMountedRef = useRef(true);

  const fetchServices = (attempt = 0) => {
    getAllServices()
      .then((data) => {
        if (!isMountedRef.current) return;
        setServices(data);
        setError(null);
        setIsLoading(false);
      })
      .catch((fetchError) => {
        if (!isMountedRef.current) return;

        // One silent automatic retry — smooths over a transient
        // network blip instead of immediately showing an error.
        if (attempt < 1) {
          setTimeout(() => {
            if (isMountedRef.current) {
              fetchServices(attempt + 1);
            }
          }, 1000);
          return;
        }

        setError(fetchError.message || "Unable to load services.");
        setIsLoading(false);
      });
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    fetchServices(0);
  };

  useEffect(() => {
    isMountedRef.current = true;
    fetchServices(0);

    return () => {
      isMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-white"
    >
      {/* Decorative scientific background */}
      <div
        aria-hidden="true"
        className="scientific-grid pointer-events-none absolute inset-0 opacity-30"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-[var(--color-background-blue)] blur-3xl"
      />

      <div className="site-container section-spacing relative z-10">
        {/* Section heading */}
        <div
          className={`grid gap-5 transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none lg:grid-cols-[1fr_340px] lg:items-end ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <div>
            <p className="section-eyebrow">Our Services</p>

            <h2
              id="services-heading"
              className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-navy)] sm:text-4xl lg:text-[2.65rem]"
            >
              Complete Geoscience Solutions
            </h2>
          </div>

          {/* <p className="max-w-md text-sm leading-6 text-[var(--color-text-muted)] sm:text-base lg:justify-self-end">
            End-to-end services from exploration to execution, tailored to your
            project needs.
          </p> */}
        </div>

        {/* Loading skeleton — keeps the layout stable while fetching */}
        {isLoading && (
          <div className="mt-10 flex flex-wrap justify-center gap-5">
            {[0, 1, 2].map((placeholder) => (
              <div
                key={placeholder}
                className="w-full animate-pulse overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white md:w-[calc(50%-10px)] lg:w-[calc(33.3333%-13.34px)]"
              >
                <div className="aspect-[16/9] w-full bg-slate-200" />
                <div className="space-y-3 p-5 sm:p-6">
                  <div className="h-4 w-2/3 rounded bg-slate-200" />
                  <div className="h-3 w-full rounded bg-slate-100" />
                  <div className="h-3 w-5/6 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!isLoading && error && (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[var(--color-border)] py-10 text-center">
            <p className="text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-navy)] transition-colors duration-200 hover:border-[var(--color-green)] hover:text-[var(--color-green)]"
            >
              <RefreshCcw aria-hidden="true" className="h-4 w-4" />
              Retry
            </button>
          </div>
        )}

        {/* Services — flex-wrap centers any incomplete last row,
            regardless of how many services there are. */}
        {!isLoading && !error && (
          <div className="mt-10 flex flex-wrap justify-center gap-5">
            {services.map((service, index) => {
              const serviceUrl = `/services/${service.slug}`;
              const imageUrl = `${imageKitEndpoint}${service.image}`;

              return (
                <article
                  key={service._id ?? service.slug}
                  className={`group w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_8px_30px_rgba(8,45,87,0.05)] transition-all duration-500 ease-out motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(8,45,87,0.10)] md:w-[calc(50%-10px)] lg:w-[calc(33.3333%-13.34px)] ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${120 + index * 90}ms` : "0ms",
                  }}
                >
                  {/* Service image */}
                  <a
                    href={serviceUrl}
                    aria-label={`View ${service.title}`}
                    className="block overflow-hidden"
                  >
                    <img
                      src={imageUrl}
                      alt={service.title}
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                    />
                  </a>

                  {/* Service content */}
                  <div className="flex min-h-44 items-start gap-4 p-5 sm:p-6">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold leading-snug text-[var(--color-navy)]">
                        <a
                          href={serviceUrl}
                          className="transition-colors duration-200 hover:text-[var(--color-green)]"
                        >
                          {service.title}
                        </a>
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                        {service.shortDescription}
                      </p>
                    </div>

                    <a
                      href={serviceUrl}
                      aria-label={`Open ${service.title}`}
                      className="mt-auto flex h-11 w-11 shrink-0 items-center justify-center self-end rounded-full border border-[var(--color-border)] text-[var(--color-navy)] transition-all duration-300 hover:border-[var(--color-green)] hover:bg-[var(--color-green)] hover:text-white"
                    >
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default ServicesSection;