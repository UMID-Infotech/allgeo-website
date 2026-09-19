import LegalPageLayout from "../../components/legal/LegalPageLayout";

const sectionClass = "mt-10 first:mt-0";
const headingClass =
  "text-2xl font-bold tracking-tight text-[var(--color-navy)]";
const subHeadingClass = "mt-7 text-lg font-bold text-[var(--color-navy)]";
const paragraphClass =
  "mt-4 text-base leading-8 text-[var(--color-text-muted)]";
const listClass =
  "mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-[var(--color-text-muted)]";

function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="February 07, 2024"
    >
      <section className={sectionClass}>
        <p className={paragraphClass}>
          This Privacy Policy describes the policies and procedures of AllGeo
          Solutions regarding the collection, use and disclosure of information
          when you use our website and explains your privacy rights.
        </p>

        <p className={paragraphClass}>
          We may use personal data to provide, maintain and improve our website
          and services. By using the website, you acknowledge the practices
          described in this Privacy Policy.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Interpretation and Definitions</h2>

        <p className={paragraphClass}>
          For the purposes of this Privacy Policy, “Company”, “We”, “Us” or
          “Our” refers to AllGeo Solutions, PNP-03, Software Technology Parks of
          India, MNNIT Campus, Prayagraj, Uttar Pradesh, India.
        </p>

        <p className={paragraphClass}>
          “Service” refers to the AllGeo Solutions website. “Personal Data”
          means information relating to an identified or identifiable
          individual. “You” means the individual or organization accessing or
          using the Service.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Information We Collect</h2>

        <p className={paragraphClass}>
          When you contact or submit an enquiry through our website, we may
          collect information that you voluntarily provide.
        </p>

        <ul className={listClass}>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone or contact number</li>
          <li>Enquiry or message details</li>
          <li>Other information voluntarily provided by you</li>
        </ul>

        <h3 className={subHeadingClass}>Usage Data</h3>

        <p className={paragraphClass}>
          Certain technical information may be collected automatically when you
          access the website, including IP address, browser type, device
          information, pages visited, date and time of visits and other
          diagnostic information.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Cookies and Tracking Technologies</h2>

        <p className={paragraphClass}>
          Our website may use cookies and similar technologies to support
          website functionality, understand usage and improve the experience of
          visitors.
        </p>

        <p className={paragraphClass}>
          You may configure your browser to refuse cookies or notify you when
          cookies are being sent. Disabling cookies may affect the operation of
          certain website features.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>How We Use Your Information</h2>

        <p className={paragraphClass}>
          AllGeo Solutions may use information collected through the website for
          purposes including:
        </p>

        <ul className={listClass}>
          <li>Providing and maintaining our website and services.</li>
          <li>Responding to enquiries and requests.</li>
          <li>Communicating with you regarding our services.</li>
          <li>Improving our website, services and user experience.</li>
          <li>Analyzing website usage and performance.</li>
          <li>Meeting applicable legal and regulatory obligations.</li>
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Sharing of Personal Information</h2>

        <p className={paragraphClass}>
          We may share information with service providers where reasonably
          necessary to operate, maintain or analyze our Service. Information may
          also be disclosed where required by law, in connection with a business
          transaction, or with your consent.
        </p>

        <p className={paragraphClass}>
          We do not disclose personal information for purposes unrelated to the
          operation of our services except where permitted or required by
          applicable law.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Retention of Personal Data</h2>

        <p className={paragraphClass}>
          We retain Personal Data only for as long as reasonably necessary for
          the purposes described in this Privacy Policy, including responding to
          enquiries, fulfilling legal obligations, resolving disputes and
          protecting our legitimate interests.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Your Personal Data</h2>

        <p className={paragraphClass}>
          You may contact us to request access to, correction of, or deletion of
          personal information you have provided to us, subject to applicable
          legal requirements and legitimate retention obligations.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Disclosure Required by Law</h2>

        <p className={paragraphClass}>
          We may disclose Personal Data when reasonably necessary to comply with
          a legal obligation, respond to valid requests from public authorities,
          protect our rights or property, investigate possible wrongdoing,
          protect users or the public, or protect against legal liability.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Security of Your Personal Data</h2>

        <p className={paragraphClass}>
          We take reasonable measures to protect Personal Data. However, no
          method of transmission over the Internet or electronic storage is
          completely secure, and absolute security cannot be guaranteed.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Children&apos;s Privacy</h2>

        <p className={paragraphClass}>
          Our Service is not directed to children under the age of 13, and we do
          not knowingly collect personally identifiable information from
          children under 13.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Links to Other Websites</h2>

        <p className={paragraphClass}>
          Our website may contain links to third-party websites that are not
          operated by AllGeo Solutions. We are not responsible for the content,
          privacy policies or practices of third-party websites and encourage
          visitors to review their respective privacy policies.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Changes to this Privacy Policy</h2>

        <p className={paragraphClass}>
          We may update this Privacy Policy from time to time. Any changes will
          be published on this page and the “Last updated” date may be revised
          accordingly.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={headingClass}>Contact Us</h2>

        <p className={paragraphClass}>
          If you have questions regarding this Privacy Policy, you can contact
          AllGeo Solutions:
        </p>

        <ul className={listClass}>
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
            Address: AllGeo Solutions, PNP-03, Software Technology Parks of
            India, MNNIT Campus, Prayagraj - 211004, India
          </li>
        </ul>
      </section>
    </LegalPageLayout>
  );
}

export default PrivacyPolicyPage;
