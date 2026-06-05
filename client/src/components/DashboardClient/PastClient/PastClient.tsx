import OldEventClient from "../OldEventClient/OldEventClient";
import "./PastClient.css";

function PastClient() {
  return (
    <section className="past-client__container">
      <h2 className="past-client__title">Déjà fait !</h2>
      <div className="past-client__content">
        <div className="past-client__section">
          <span className="past-client__pill">Événements</span>
          <OldEventClient />
        </div>
        <div className="past-client__section">
          <span className="past-client__pill">Espaces</span>
          {/* <OldBookingClient /> */}
        </div>
      </div>
    </section>
  );
}

export default PastClient;
