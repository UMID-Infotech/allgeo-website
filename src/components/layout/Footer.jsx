import { useEffect, useState } from "react";
import { ArrowUpRight, Globe2, Mail, MapPin, Phone } from "lucide-react";

import products from "../../data/products.js";
import footerData from "../../data/footer.js";
import { getAllServices } from "../../services/servicesRelatedService.js";

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-sm text-white/65 transition-colors duration-200 hover:text-white"
    >
      <span>{children}</span>

      <ArrowUpRight
        aria-hidden="true"
        className="h-3.5 w-3.5 text-[var(--color-green)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    </a>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  const imageKitEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

  const footerLogo = `${imageKitEndpoint}/allgeo-solutions/home/AGS-white-logo.png`;

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

  return (
    <footer className="relative min-h-screen overflow-hidden bg-[var(--color-navy)] text-white">
      {/* Scientific background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
      >
        <div className="scientific-grid absolute inset-0" />
      </div>

      {/* Subtle decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[var(--color-green)]/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-20 h-[420px] w-[420px] rounded-full bg-[var(--color-navy-light)]/30 blur-3xl"
      />

      <div className="site-container relative z-10 flex min-h-screen flex-col py-14 lg:py-16">
        {/* =====================================================
            TOP AREA
        ===================================================== */}

        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          {/* Brand */}
          <div>
            {/* Original AGS Logo */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AllGeo Solutions home"
              className="inline-block"
            >
              <img
                src={footerLogo}
                alt="AllGeo Solutions"
                className="h-auto w-[190px] object-contain sm:w-[215px]"
                loading="lazy"
              />
            </a>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-green)]">
              AllGeo Solutions
            </p>

            <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
              {footerData.brand.tagline}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
              {footerData.brand.description}
            </p>
          </div>

          {/* Contact */}
          <div className="lg:justify-self-end lg:max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-green)]">
              Get in Touch
            </p>

            <div className="mt-6 space-y-5">
              {/* Phone */}
              <a
                href={footerData.contact.phone.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Phone
                    aria-hidden="true"
                    className="h-4 w-4 text-[var(--color-green)]"
                  />
                </span>

                <span>
                  <span className="block text-xs uppercase tracking-wider text-white/40">
                    Phone
                  </span>

                  <span className="mt-1 block text-sm font-semibold text-white/75 transition-colors duration-200 group-hover:text-white">
                    {footerData.contact.phone.label}
                  </span>
                </span>
              </a>

              {/* Email */}
              <a
                href={footerData.contact.email.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Mail
                    aria-hidden="true"
                    className="h-4 w-4 text-[var(--color-green)]"
                  />
                </span>

                <span>
                  <span className="block text-xs uppercase tracking-wider text-white/40">
                    Email
                  </span>

                  <span className="mt-1 block text-sm font-semibold text-white/75 transition-colors duration-200 group-hover:text-white">
                    {footerData.contact.email.label}
                  </span>
                </span>
              </a>

              {/* Website */}
              <a
                href={footerData.contact.website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Globe2
                    aria-hidden="true"
                    className="h-4 w-4 text-[var(--color-green)]"
                  />
                </span>

                <span>
                  <span className="block text-xs uppercase tracking-wider text-white/40">
                    Website
                  </span>

                  <span className="mt-1 block text-sm font-semibold text-white/75 transition-colors duration-200 group-hover:text-white">
                    {footerData.contact.website.label}
                  </span>
                </span>
              </a>

              {/* Address */}
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <MapPin
                    aria-hidden="true"
                    className="h-4 w-4 text-[var(--color-green)]"
                  />
                </span>

                <span>
                  <span className="block text-xs uppercase tracking-wider text-white/40">
                    Address
                  </span>

                  <span className="mt-1 block max-w-sm text-sm leading-6 text-white/65">
                    {footerData.contact.address.label}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            LINKS
        ===================================================== */}

        <div className="grid gap-10 border-b border-white/10 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {/* Services */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-green)]">
              Services
            </p>

            <div className="mt-5 flex flex-col items-start gap-3.5">
              {services.map((service) => (
                <FooterLink
                  key={service._id ?? service.slug}
                  href={`/services/${service.slug}`}
                >
                  {service.title}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-green)]">
              Products
            </p>

            <div className="mt-5 flex flex-col items-start gap-3.5">
              {products.map((product) => (
                <FooterLink key={product.id} href={product.externalUrl}>
                  {product.name}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-green)]">
              Quick Links
            </p>

            <div className="mt-5 flex flex-col items-start gap-3.5">
              {footerData.quickLinks.map((link) => (
                <FooterLink key={link.label} href={link.url}>
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div className="mt-auto flex flex-col gap-5 pt-7 text-sm lg:flex-row lg:items-center lg:justify-between">
          <p className="text-white/45">
            © {currentYear} AllGeo Solutions. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 transition-colors duration-200 hover:text-white"
            >
              Terms & Conditions
            </a>

            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 transition-colors duration-200 hover:text-white"
            >
              Privacy Policy
            </a>
          </div>

          <p className="flex flex-wrap items-center gap-1.5 text-white/55">
            <span>Website Developed by</span>

            <a
              href={footerData.developerCredit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-bold text-[var(--color-green)] transition-colors duration-200 hover:text-white"
            >
              <span>{footerData.developerCredit.label}</span>

              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2.2}
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;