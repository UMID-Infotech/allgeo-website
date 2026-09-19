import LegalPageLayout from "../../components/legal/LegalPageLayout";

const sectionClass = "mt-10 first:mt-0";
const headingClass =
  "text-2xl font-bold tracking-tight text-[var(--color-navy)]";
const paragraphClass =
  "mt-4 text-base leading-8 text-[var(--color-text-muted)]";
const listClass =
  "mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-[var(--color-text-muted)]";

function TermsConditionsPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      lastUpdated="September 19, 2026"
    >
      <section className={sectionClass}>
        <p className={paragraphClass}>
          These Terms & Conditions govern your use of the AllGeo Solutions
          website. By accessing or using this website, you agree to these Terms.
          If you do not agree with these Terms, please discontinue use of the
          website.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>About AllGeo Solutions</h2>

        <p className={paragraphClass}>
          AllGeo Solutions provides information about geoscience-related
          services, technologies, products and professional capabilities,
          including geological, geophysical, geospatial, hydrogeological and
          environmental services.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Use of the Website</h2>

        <p className={paragraphClass}>
          You may use this website for lawful informational and business
          purposes. You agree not to misuse the website, interfere with its
          operation, attempt unauthorized access, introduce malicious code, or
          use its content for unlawful purposes.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Website Information</h2>

        <p className={paragraphClass}>
          We aim to keep the information on this website accurate and current.
          However, geoscience services, technical specifications, product
          information, availability and other website content may be updated
          from time to time.
        </p>

        <p className={paragraphClass}>
          Website information is provided for general informational purposes and
          should not by itself be treated as project-specific technical,
          geological, engineering, environmental or professional advice.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Enquiries and Project Discussions</h2>

        <p className={paragraphClass}>
          Submission of an enquiry through this website does not automatically
          create a contractual relationship between you and AllGeo Solutions.
          Project scope, deliverables, timelines, commercial terms and other
          requirements may be separately discussed and agreed upon before work
          begins.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Services</h2>

        <p className={paragraphClass}>
          The appropriate methodology, scope and deliverables for a geoscience
          assignment may depend on site conditions, project objectives,
          available information, accessibility and other technical factors.
        </p>

        <p className={paragraphClass}>
          Specific project commitments will be governed by the applicable
          proposal, quotation, work order, agreement or other written
          communication accepted by the relevant parties.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Third-Party Products and Websites</h2>

        <p className={paragraphClass}>
          Our website may reference or link to products, technologies,
          manufacturers or websites operated by third parties. Such third-party
          websites and services are governed by their own terms and policies.
        </p>

        <p className={paragraphClass}>
          AllGeo Solutions is not responsible for the availability, content,
          security or privacy practices of websites operated independently by
          third parties.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Intellectual Property</h2>

        <p className={paragraphClass}>
          Unless otherwise stated, website content created for AllGeo Solutions,
          including text, graphics, layout, branding and other original
          materials, is protected by applicable intellectual property laws.
        </p>

        <p className={paragraphClass}>
          Third-party trademarks, product names, logos, photographs and other
          materials remain the property of their respective owners.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Prohibited Use</h2>

        <p className={paragraphClass}>You must not use this website to:</p>

        <ul className={listClass}>
          <li>Violate applicable laws or regulations.</li>
          <li>Attempt unauthorized access to systems or information.</li>
          <li>Transmit malicious software or harmful code.</li>
          <li>Disrupt or interfere with website operation or security.</li>
          <li>
            Misrepresent AllGeo Solutions, its services or website content.
          </li>
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Limitation of Liability</h2>

        <p className={paragraphClass}>
          To the extent permitted by applicable law, AllGeo Solutions will not
          be responsible for indirect or consequential loss arising solely from
          reliance on general website information or from temporary
          unavailability of the website.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Privacy</h2>

        <p className={paragraphClass}>
          Information submitted through this website is handled in accordance
          with our Privacy Policy.
        </p>

        <a
          href="/privacy-policy"
          className="mt-4 inline-flex font-bold text-[var(--color-green)] transition-colors hover:text-[var(--color-green-dark)]"
        >
          Read our Privacy Policy
        </a>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Changes to These Terms</h2>

        <p className={paragraphClass}>
          AllGeo Solutions may update these Terms & Conditions when necessary.
          Updated Terms become effective when published on this page unless
          otherwise stated.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Governing Law</h2>

        <p className={paragraphClass}>
          These Terms & Conditions are governed by the applicable laws of India.
          Any dispute will be subject to the jurisdiction of the competent
          courts in Uttar Pradesh, India, subject to applicable law.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Contact Us</h2>

        <p className={paragraphClass}>
          For questions regarding these Terms & Conditions, contact:
        </p>

        <ul className={listClass}>
          <li>AllGeo Solutions</li>

          <li>
            Email:{" "}
            <a
              href="mailto:contact@allgeos.co.in"
              className="font-semibold text-[var(--color-green)] hover:underline"
            >
              contact@allgeos.co.in
            </a>
          </li>

          <li>
            Phone:{" "}
            <a
              href="tel:+919452830062"
              className="font-semibold text-[var(--color-green)] hover:underline"
            >
              +91-9452830062
            </a>
          </li>

          <li>
            PNP-03, Software Technology Parks of India, MNNIT Campus, Prayagraj
            - 211004, India
          </li>
        </ul>
      </section>
    </LegalPageLayout>
  );
}

export default TermsConditionsPage;
