import { useEffect, useState } from "react";

function ContactHero() {
  const [isVisible, setIsVisible] = useState(false);

  const imageKitEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

  const heroImage = `${imageKitEndpoint}/allgeo-solutions/home/contact-hero.png`;

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      className="relative isolate flex min-h-[58vh] items-center overflow-hidden bg-[var(--color-navy-dark)] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("${heroImage}")`,
      }}
    >
      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[rgba(5,35,66,0.96)] via-[rgba(5,35,66,0.78)] to-[rgba(5,35,66,0.18)]"
        aria-hidden="true"
      />

      {/* Bottom depth overlay */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgba(5,35,66,0.45)] via-transparent to-[rgba(5,35,66,0.08)]"
        aria-hidden="true"
      />

      {/* Scientific grid */}
      <div
        className={`scientific-grid absolute inset-0 -z-10 transition-opacity duration-1000 motion-reduce:opacity-[0.08] motion-reduce:transition-none ${
          isVisible ? "opacity-[0.08]" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Green glow */}
      <div
        className={`absolute -left-32 top-1/2 -z-10 h-80 w-80 -translate-y-1/2 rounded-full bg-[var(--color-green)]/10 blur-3xl transition-all duration-1000 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
        aria-hidden="true"
      />

      <div className="site-container w-full py-20 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className={`flex items-center gap-3 transition-all duration-700 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <span className="h-px w-10 bg-[var(--color-green)]" />

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-green)] sm:text-sm">
              Get In Touch
            </p>
          </div>

          {/* Heading */}
          <h1
            className={`mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white transition-all delay-100 duration-700 sm:text-5xl lg:text-6xl motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-7 opacity-0"
            }`}
          >
            Let's Discuss Your Next{" "}
            <span className="text-[var(--color-green)]">
              Geoscience Project.
            </span>
          </h1>

          {/* Description */}
          <p
            className={`mt-6 max-w-2xl text-base leading-8 text-white/75 transition-all delay-200 duration-700 sm:text-lg motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            Whether you need geophysical surveys, geological studies,
            groundwater investigation or other geoscience support, our team is
            ready to understand your requirements and help identify the right
            approach for your project.
          </p>

          {/* Quick contact */}
          {/* <div
            className={`mt-8 flex flex-col gap-3 transition-all delay-300 duration-700 sm:flex-row sm:items-center sm:gap-6 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <a
              href="tel:+919452830062"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors duration-200 hover:text-[var(--color-green)] sm:text-base"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[var(--color-green)] backdrop-blur-sm">
                <Phone size={16} strokeWidth={2} aria-hidden="true" />
              </span>

              <span>+91-9452830062</span>
            </a>

            <span
              className="hidden h-7 w-px bg-white/20 sm:block"
              aria-hidden="true"
            />

            <a
              href="mailto:contact@allgeos.co.in"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors duration-200 hover:text-[var(--color-green)] sm:text-base"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[var(--color-green)] backdrop-blur-sm">
                <Mail size={16} strokeWidth={2} aria-hidden="true" />
              </span>

              <span>contact@allgeos.co.in</span>
            </a>
          </div> */}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute inset-x-0 bottom-0 h-px">
        <div
          className={`mx-auto h-full bg-gradient-to-r from-transparent via-[var(--color-green)]/60 to-transparent transition-all delay-300 duration-1000 motion-reduce:w-full motion-reduce:transition-none ${
            isVisible ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export default ContactHero;
