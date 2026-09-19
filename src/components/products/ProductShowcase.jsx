import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

import products from "../../data/products.js";

function ProductItem({ product, index, imageKitEndpoint }) {
  const itemRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const isReversed = index % 2 !== 0;

  const productImage = product.image?.src
    ? `${imageKitEndpoint}${product.image.src}`
    : null;

  const keySpecifications = product.specifications?.slice(0, 5) ?? [];

  useEffect(() => {
    const item = itemRef.current;

    if (!item) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
      },
    );

    observer.observe(item);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <article
      ref={itemRef}
      id={product.anchor}
      className={`scroll-mt-24 border-b border-[var(--color-border)] ${
        isReversed ? "bg-[var(--color-background-blue)]" : "bg-white"
      }`}
    >
      <div className="site-container section-spacing">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-16 xl:gap-20">
          {/* Product content */}
          <div
            className={`transition-all duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
              isReversed ? "lg:order-2" : "lg:order-1"
            } ${
              isVisible
                ? "translate-x-0 opacity-100"
                : isReversed
                  ? "translate-x-8 opacity-0"
                  : "-translate-x-8 opacity-0"
            }`}
          >
            {/* Number + category */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[var(--color-green)]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className={`h-px bg-[var(--color-green)] transition-all delay-200 duration-700 motion-reduce:w-7 motion-reduce:transition-none ${
                  isVisible ? "w-7" : "w-0"
                }`}
              />

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-green)]">
                {product.category}
              </p>
            </div>

            {/* Product title */}
            <h3 className="mt-5 text-4xl font-bold tracking-tight text-[var(--color-navy)] sm:text-5xl lg:text-6xl">
              {product.name}
            </h3>

            {/* Short description */}
            {product.shortDescription && (
              <p className="mt-4 max-w-xl text-lg font-semibold leading-8 text-[var(--color-navy)]">
                {product.shortDescription}
              </p>
            )}

            {/* Description */}
            {product.description && (
              <p className="mt-4 max-w-xl text-base leading-7 text-[var(--color-text-muted)]">
                {product.description}
              </p>
            )}

            {/* Applications */}
            {product.applications?.length > 0 && (
              <div className="mt-7">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-navy)]">
                  Applications
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {product.applications.map((application, applicationIndex) => (
                    <div
                      key={application}
                      className={`flex items-start gap-3 transition-all duration-500 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                        isVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-3 opacity-0"
                      }`}
                      style={{
                        transitionDelay: `${250 + applicationIndex * 70}ms`,
                      }}
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-green-light)] text-[var(--color-green-dark)]">
                        <Check size={12} strokeWidth={3} aria-hidden="true" />
                      </span>

                      <span className="text-sm leading-6 text-[var(--color-text)]">
                        {application}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* External CTA */}
            {product.externalUrl && (
              <div className="mt-8">
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-green)] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(21,148,71,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-green-dark)] hover:shadow-[0_14px_30px_rgba(21,148,71,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2"
                >
                  <span>Explore More</span>

                  <ArrowUpRight
                    size={17}
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            )}
          </div>

          {/* Visual */}
          <div
            className={`transition-all delay-100 duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
              isReversed ? "lg:order-1" : "lg:order-2"
            } ${
              isVisible
                ? "translate-x-0 opacity-100"
                : isReversed
                  ? "-translate-x-8 opacity-0"
                  : "translate-x-8 opacity-0"
            }`}
          >
            {/* Product image */}
            {productImage && (
              <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-background-blue)] shadow-[0_18px_50px_rgba(8,45,87,0.08)]">
                <div
                  className="absolute inset-0 z-10 bg-gradient-to-br from-white/20 via-transparent to-[var(--color-navy)]/5"
                  aria-hidden="true"
                />

                <img
                  src={productImage}
                  alt={product.image.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            )}

            {/* Specifications */}
            {keySpecifications.length > 0 && (
              <div
                className={`relative z-20 mx-3 -mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_16px_40px_rgba(8,45,87,0.1)] transition-all delay-300 duration-700 sm:mx-6 sm:p-6 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <p className="text-sm font-bold text-[var(--color-navy)]">
                    Key Specifications
                  </p>

                  <span className="h-px flex-1 bg-[var(--color-border)]" />
                </div>

                <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                  {keySpecifications.map((specification) => (
                    <div key={specification.label}>
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-green)]">
                        {specification.label}
                      </p>

                      <p className="mt-1.5 text-sm leading-6 text-[var(--color-text)]">
                        {specification.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ProductShowcase() {
  const headingRef = useRef(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  const imageKitEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

  useEffect(() => {
    const heading = headingRef.current;

    if (!heading) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(heading);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* ================= SECTION INTRO ================= */}
      <div
        ref={headingRef}
        className="relative overflow-hidden bg-[var(--color-background-blue)]"
      >
        <div
          className="scientific-grid absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
        />

        <div
          className="absolute -right-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[var(--color-green)]/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="site-container relative py-14 sm:py-16 lg:py-20">
          <div
            className={`max-w-4xl transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
              headingVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-7 opacity-0"
            }`}
          >
            <div className="flex items-center gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-green)] sm:text-sm">
                Explore Our Products
              </p>

              <span
                className={`h-px bg-[var(--color-green)] transition-all delay-200 duration-700 motion-reduce:w-10 motion-reduce:transition-none ${
                  headingVisible ? "w-10" : "w-0"
                }`}
              />
            </div>

            <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-[var(--color-navy)] sm:text-4xl lg:text-5xl">
              TEM Systems Designed for{" "}
              <span className="text-[var(--color-green)]">
                Diverse Field Applications.
              </span>
            </h2>

            {/* <p
              className={`mt-5 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] transition-all delay-150 duration-700 sm:text-lg motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                headingVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              Explore a range of TEM systems developed for portable
              investigation, large-area mapping, mineral exploration and
              flexible all-terrain geophysical surveys.
            </p> */}
          </div>
        </div>

        <div
          className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-[var(--color-green)]/60 via-[var(--color-green)]/20 to-transparent transition-all delay-300 duration-1000 motion-reduce:w-full motion-reduce:transition-none ${
            headingVisible ? "w-full" : "w-0"
          }`}
          aria-hidden="true"
        />
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="relative">
        {products.map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            index={index}
            imageKitEndpoint={imageKitEndpoint}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductShowcase;
