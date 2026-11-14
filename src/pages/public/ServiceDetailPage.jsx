import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import ServiceHero from "../../components/services/ServiceHero";
import ServiceOverview from "../../components/services/ServiceOverview";
import ServiceAccordion from "../../components/services/ServiceAccordion";
import ServiceProcess from "../../components/services/ServiceProcess";
import OtherServices from "../../components/services/OtherServices";
import ServiceCTA from "../../components/services/ServiceCTA";
import { getServiceBySlug } from "../../services/servicesRelatedService";

function ServiceDetailPage() {
  const { slug } = useParams();

  const [result, setResult] = useState({ slug: null, service: null, faqs: [], notFound: false });

  useEffect(() => {
    let isMounted = true;

    const loadService = async () => {
      try {
        const data = await getServiceBySlug(slug);

        if (isMounted) {
          setResult({ slug, service: data.service, faqs: data.faqs, notFound: false });
        }
      } catch {
        if (isMounted) {
          setResult({ slug, service: null, faqs: [], notFound: true });
        }
      }
    };

    loadService();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const isLoading = result.slug !== slug;
  const { service, faqs, notFound } = result;

  if (!isLoading && (notFound || !service)) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return null;
  }

  return (
    <>
      <ServiceHero service={service} />
      <ServiceOverview service={service} />
      <ServiceAccordion service={service} items={faqs} />
      <ServiceProcess />
      <OtherServices currentServiceSlug={service.slug} />
      <ServiceCTA />
    </>
  );
}

export default ServiceDetailPage;
