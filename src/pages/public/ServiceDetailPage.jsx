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

  const [service, setService] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setNotFound(false);

    const loadService = async () => {
      try {
        const data = await getServiceBySlug(slug);

        if (isMounted) {
          setService(data.service);
          setFaqs(data.faqs);
        }
      } catch {
        if (isMounted) {
          setNotFound(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadService();

    return () => {
      isMounted = false;
    };
  }, [slug]);

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