import { useState } from "react";
import { ChevronDown } from "lucide-react";

function ServiceAccordion({ service, items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const imageKitEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

  const accordionItems = items ?? [];

  // If this service has no accordion data,
  // don't render the complete section.
  if (accordionItems.length === 0) {
    return null;
  }

  const handleToggle = (index) => {
    setActiveIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <section className="relative overflow-hidden bg-[var(--color-background-blue)]">
      {/* Scientific background */}
      <div
        className="scientific-grid absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
      />

      {/* Decorative glows */}
      <div
        className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[var(--color-green)]/5 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[var(--color-navy)]/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="site-container section-spacing relative">
        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-14">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[var(--color-green)]" />

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-green)] sm:text-sm">
              Our Expertise
            </p>

            <span className="h-px w-8 bg-[var(--color-green)]" />
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[var(--color-navy)] sm:text-4xl lg:text-5xl">
            Explore Our{" "}
            <span className="text-[var(--color-green)]">{service.title}</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">
            Explore the specialized capabilities and solutions we provide across
            this service area.
          </p>
        </div>

        {/* Accordion */}
        <div className="mx-auto max-w-5xl space-y-3">
          {accordionItems.map((item, index) => {
            const isOpen = activeIndex === index;
            const hasImages =
              Array.isArray(item.images) && item.images.length > 0;

            return (
              <article
                key={item._id ?? item.faqId}
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  isOpen
                    ? "border-[var(--color-green)]/30 shadow-[0_16px_45px_rgba(8,45,87,0.08)]"
                    : "border-[var(--color-border)] shadow-[0_5px_20px_rgba(8,45,87,0.03)] hover:border-[var(--color-green)]/25"
                }`}
              >
                {/* Accordion button */}
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`service-accordion-${item.faqId}`}
                  className="group flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                >
                  {/* Number */}
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors duration-300 sm:h-11 sm:w-11 sm:text-sm ${
                      isOpen
                        ? "bg-[var(--color-green)] text-white"
                        : "bg-[var(--color-green-light)] text-[var(--color-green-dark)]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}
                  <span
                    className={`flex-1 text-base font-bold leading-snug transition-colors duration-300 sm:text-lg lg:text-xl ${
                      isOpen
                        ? "text-[var(--color-green-dark)]"
                        : "text-[var(--color-navy)] group-hover:text-[var(--color-green-dark)]"
                    }`}
                  >
                    {item.title}
                  </span>

                  {/* Arrow */}
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 border-[var(--color-green)] bg-[var(--color-green)] text-white"
                        : "border-[var(--color-border)] text-[var(--color-navy)] group-hover:border-[var(--color-green)] group-hover:text-[var(--color-green)]"
                    }`}
                  >
                    <ChevronDown size={18} strokeWidth={2} />
                  </span>
                </button>

                {/* Accordion body */}
                {isOpen && (
                  <div
                    id={`service-accordion-${item.faqId}`}
                    className="border-t border-[var(--color-border)]"
                  >
                    <div
                      className={`grid gap-8 px-5 py-6 sm:px-7 sm:py-8 ${
                        hasImages
                          ? "lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-10"
                          : ""
                      }`}
                    >
                      {/* Description */}
                      {item.description && (
                        <div>
                          <p className="text-base leading-8 text-[var(--color-text-muted)]">
                            {item.description}
                          </p>
                        </div>
                      )}

                      {/* Images - only rendered when images exist */}
                      {hasImages && (
                        <div
                          className={`grid gap-3 ${
                            item.images.length > 1
                              ? "grid-cols-2"
                              : "grid-cols-1"
                          }`}
                        >
                          {item.images.map((image, imageIndex) => (
                            <div
                              key={`${item.faqId}-image-${imageIndex}`}
                              className={`overflow-hidden rounded-xl border border-[var(--color-border)] bg-white ${
                                item.images.length === 3 && imageIndex === 0
                                  ? "col-span-2"
                                  : ""
                              }`}
                            >
                              <img
                                src={`${imageKitEndpoint}${image}`}
                                alt={`${item.title} - ${imageIndex + 1}`}
                                loading="lazy"
                                className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServiceAccordion;