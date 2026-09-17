import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import products from "../../data/products";

function ProductsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const imageKitEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

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
      id="products"
      aria-labelledby="products-heading"
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
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          <div>
            <p className="section-eyebrow">Our Products</p>

            <h2
              id="products-heading"
              className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-navy)] sm:text-4xl lg:text-[2.65rem]"
            >
              Geoscience Technologies & Products
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-[var(--color-text-muted)] sm:text-base lg:justify-self-end">
            Advanced TEM systems designed for reliable subsurface
            investigation across diverse applications and terrains.
          </p>
        </div>

        {/* Products grid */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => {
            const productUrl = `/product#${product.anchor}`;
            const imageUrl = `${imageKitEndpoint}${product.image.src}`;
console.log(product.name, product.image.src, imageUrl);
            return (
              <article
                key={product.id}
                className={`group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_8px_30px_rgba(8,45,87,0.05)] transition-all duration-500 ease-out motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(8,45,87,0.10)] ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible
                    ? `${120 + index * 90}ms`
                    : "0ms",
                }}
              >
                {/* Product image */}
                <a
                  href={productUrl}
                  aria-label={`View ${product.name}`}
                  className="block overflow-hidden"
                >
                  <img
                    src={imageUrl}
                    alt={product.image.alt}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </a>

                {/* Product content */}
                <div className="flex min-h-44 items-start gap-4 p-5 sm:p-6">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold leading-snug text-[var(--color-navy)]">
                      <a
                        href={productUrl}
                        className="transition-colors duration-200 hover:text-[var(--color-green)]"
                      >
                        {product.name}
                      </a>
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                      {product.shortDescription}
                    </p>
                  </div>

                  <a
                    href={productUrl}
                    aria-label={`Open ${product.name}`}
                    className="mt-auto flex h-11 w-11 shrink-0 items-center justify-center self-end rounded-full border border-[var(--color-border)] text-[var(--color-navy)] transition-all duration-300 hover:border-[var(--color-green)] hover:bg-[var(--color-green)] hover:text-white"
                  >
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;