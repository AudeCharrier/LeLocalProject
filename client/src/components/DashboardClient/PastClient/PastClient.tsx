import OldBookingClient from "../OldBookingClient/OldBookingClient";
import OldEventClient from "../OldEventClient/OldEventClient";
import "./PastClient.css";

function PastClient() {
  return (
    <section className="past-client__container">
      <h2 className="past-client__title">Déjà fait !</h2>
      <div className="past-client__content">
        <div className="past-client__section">
          <h3 className="past-client__section-title">Événements</h3>
          <OldEventClient />
        </div>
        <div className="past-client__section">
          <h3 className="past-client__section-title">Espaces</h3>
          <OldBookingClient />
        </div>
      </div>
    </section>
  );
}

export default PastClient;
