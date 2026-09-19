import { Navigate, useParams } from "react-router-dom";

import ServiceHero from "../../components/services/ServiceHero";
import ServiceOverview from "../../components/services/ServiceOverview";
import ServiceAccordion from "../../components/services/ServiceAccordion";
import ServiceProcess from "../../components/services/ServiceProcess";
import OtherServices from "../../components/services/OtherServices";
import ServiceCTA from "../../components/services/ServiceCTA";
import services from "../../data/services.js";

function ServiceDetailPage() {
  const { slug } = useParams();

  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <ServiceHero service={service} />
      <ServiceOverview service={service} />
      <ServiceAccordion service={service} />
      <ServiceProcess />
      <OtherServices currentServiceSlug={service.slug} />
      <ServiceCTA />
    </>
  );
}

export default ServiceDetailPage;
