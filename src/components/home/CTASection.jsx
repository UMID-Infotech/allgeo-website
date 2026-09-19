import { useEffect, useRef, useState } from "react";
import { Globe2, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { submitEnquiry } from "../../services/enquiryService";
function CTASection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    message: "",
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success / error message state
  const [submitStatus, setSubmitStatus] = useState({
    type: "",
    message: "",
  });

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

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (submitStatus.message) {
      setSubmitStatus({
        type: "",
        message: "",
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    setSubmitStatus({
      type: "",
      message: "",
    });

    try {
      const response = await submitEnquiry(formData);

      setSubmitStatus({
        type: "success",
        message:
          response.message ||
          "Thank you. Your enquiry has been submitted successfully.",
      });

      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error.message || "Unable to submit your enquiry. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="scientific-grid relative overflow-hidden bg-[var(--color-background-blue)]"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[var(--color-green)]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[var(--color-navy-light)]/5 blur-3xl"
      />

      <div className="site-container section-spacing relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          {/* Left content */}
          <div
            className={`transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <p className="section-eyebrow">Let&apos;s Work Together</p>

            <h2
              id="contact-heading"
              className="mt-2 max-w-xl text-3xl font-bold tracking-tight text-[var(--color-navy)] sm:text-4xl lg:text-[2.65rem]"
            >
              Have a project in mind?
              <span className="mt-1 block">
                Let&apos;s discuss{" "}
                <span className="text-[var(--color-green)]">
                  what lies beneath.
                </span>
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
              Discuss your geophysical, geological, groundwater or subsurface
              investigation requirements with our team and discover the right
              approach for your project.
            </p>

            {/* Contact details */}
            <div className="mt-8 border-t border-[var(--color-border)] pt-7">
              <div className="space-y-5">
                {/* Phone */}
                <a
                  href="tel:+919452830062"
                  className="group flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-green)] shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Phone
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.8}
                    />
                  </span>

                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                      Call Us
                    </span>

                    <span className="mt-0.5 block font-semibold text-[var(--color-navy)]">
                      +91-9452830062
                    </span>
                  </span>
                </a>

                {/* Email */}
                <a
                  href="mailto:contact@allgeos.co.in"
                  className="group flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-green)] shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Mail
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.8}
                    />
                  </span>

                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                      Email Us
                    </span>

                    <span className="mt-0.5 block font-semibold text-[var(--color-navy)]">
                      contact@allgeos.co.in
                    </span>
                  </span>
                </a>

                {/* Website */}
                <a
                  href="https://www.allgeos.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-green)] shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Globe2
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.8}
                    />
                  </span>

                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                      Website
                    </span>

                    <span className="mt-0.5 block font-semibold text-[var(--color-navy)]">
                      www.allgeos.co.in
                    </span>
                  </span>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-green)] shadow-sm">
                    <MapPin
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.8}
                    />
                  </span>

                  <address className="not-italic">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                      Contact Address
                    </span>

                    <span className="mt-1 block font-semibold text-[var(--color-navy)]">
                      AllGeo Solutions
                    </span>

                    <span className="mt-1 block max-w-md text-sm leading-6 text-[var(--color-text-muted)]">
                      PNP-03, Software Technology Parks of India, MNNIT Campus,
                      Prayagraj, Pincode: 211004, INDIA
                    </span>
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry form */}
          <div
            className={`transition-all delay-150 duration-700 ease-out motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[0_18px_50px_rgba(8,45,87,0.08)] sm:p-8 lg:p-9">
              {/* Form heading */}
              <div>
                <p className="section-eyebrow">Send Us an Enquiry</p>

                <h3 className="mt-2 text-2xl font-bold tracking-tight text-[var(--color-navy)] sm:text-3xl">
                  We&apos;re here to help.
                </h3>

                <div
                  aria-hidden="true"
                  className="mt-4 h-0.5 w-14 bg-[var(--color-green)]"
                />
              </div>

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[var(--color-navy)]"
                  >
                    Name <span className="text-[var(--color-green)]">*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-navy)] outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/10"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[var(--color-navy)]"
                  >
                    Email <span className="text-[var(--color-green)]">*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourname@company.com"
                    className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-navy)] outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/10"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="mb-2 block text-sm font-semibold text-[var(--color-navy)]"
                  >
                    Contact Number{" "}
                    <span className="text-[var(--color-green)]">*</span>
                  </label>

                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-navy)] outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/10"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-[var(--color-navy)]"
                  >
                    Message <span className="text-[var(--color-green)]">*</span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or requirement..."
                    className="w-full resize-y rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-navy)] outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/10"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center rounded-xl bg-[var(--color-green)] px-6 py-2.5 text-base font-bold text-white shadow-[0_10px_25px_rgba(22,163,74,0.22)] transition-all duration-300 hover:bg-[var(--color-green-dark)] hover:shadow-[0_14px_30px_rgba(22,163,74,0.28)] focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Sending Enquiry..." : "Submit Enquiry"}
                </button>

                {submitStatus.message && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`rounded-lg border px-4 py-3 text-sm font-medium ${
                      submitStatus.type === "success"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                {/* Supporting note */}
                <div className="flex items-center justify-center gap-2 pt-1 text-center text-xs leading-5 text-[var(--color-text-muted)] sm:text-sm">
                  <ShieldCheck
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[var(--color-green)]"
                    strokeWidth={2}
                  />

                  <span>
                    Share your requirement and our team will get in touch with
                    you.
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
