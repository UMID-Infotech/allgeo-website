import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getAllClients } from "../../services/clientService";

function ClientItem({ client, onPreview, onClose }) {
  const handlePointerEnter = (event) => {
    if (event.pointerType === "touch" || !client.logo) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const previewWidth = Math.min(380, window.innerWidth - 24);
    const previewHeight = 180;

    const left = Math.max(
      12,
      Math.min(
        rect.left + rect.width / 2 - previewWidth / 2,
        window.innerWidth - previewWidth - 12
      )
    );

    const top =
      rect.top >= previewHeight + 12
        ? rect.top - previewHeight - 10
        : rect.bottom + 10;

    onPreview({ client, left, top, width: previewWidth });
  };

  return (
    <div
      className="allgeo-client-item"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={onClose}
    >
      {client.logo ? (
        <img
          src={client.logo}
          alt={client.name}
          loading="lazy"
          className="allgeo-client-logo"
        />
      ) : (
        <span className="allgeo-client-name">{client.name}</span>
      )}
    </div>
  );
}

function ClientsSection() {
  const [clients, setClients] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchClients() {
      try {
        const data = await getAllClients();
        if (isMounted) {
          setClients(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load clients:", error.message);
        if (isMounted) {
          setClients([]);
        }
      }
    }

    fetchClients();

    return () => {
      isMounted = false;
    };
  }, []);

  if (clients.length === 0) return null;

  const sliderItems = [...clients, ...clients];

  return (
    <section className="allgeo-clients-section" aria-label="Our clients">
      <div className="site-container">
        <p className="section-eyebrow">Trusted By</p>
        <h2 className="allgeo-clients-heading">Our Clients</h2>
      </div>

      <div className="allgeo-clients-viewport">
        <div className="allgeo-clients-track">
          <div className="allgeo-clients-group">
            {sliderItems.map((client, index) => (
              <ClientItem
                key={`first-${client._id ?? index}`}
                client={client}
                onPreview={setPreview}
                onClose={() => setPreview(null)}
              />
            ))}
          </div>

          <div className="allgeo-clients-group" aria-hidden="true">
            {sliderItems.map((client, index) => (
              <ClientItem
                key={`second-${client._id ?? index}`}
                client={client}
                onPreview={setPreview}
                onClose={() => setPreview(null)}
              />
            ))}
          </div>
        </div>
      </div>

      {preview &&
        createPortal(
          <div
            className="allgeo-client-preview"
            style={{
              left: preview.left,
              top: preview.top,
              width: preview.width,
            }}
            role="tooltip"
          >
            <img src={preview.client.logo} alt="" />
          </div>,
          document.body
        )}
    </section>
  );
}

export default ClientsSection;