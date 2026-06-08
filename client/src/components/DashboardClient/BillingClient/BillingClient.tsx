import "./BillingClient.css";
import useBillingClient from "../../../hooks/useBillingClient";

function BillingClient() {
  const billing = useBillingClient(2);

  return (
    <section className="billing-client__container">
      <h2 className="billing-client__title">Historique des factures</h2>

      {billing.length === 0 ? (
        <p className="billing-client__empty">Aucune facture.</p>
      ) : (
        <div className="billing-client__table-scroll">
          <table className="billing-client__table">
            <thead>
              <tr>
                <th className="billing-client__th">Référence</th>
                <th className="billing-client__th">Date</th>
                <th className="billing-client__th">Description</th>
                <th className="billing-client__th">Montant</th>
                <th className="billing-client__th">Statut</th>
                <th className="billing-client__th">Facture</th>
              </tr>
            </thead>
            <tbody>
              {billing.map((item) => (
                <tr key={item.id} className="billing-client__tr">
                  <td className="billing-client__td">
                    FAC-{item.bills_number}
                  </td>
                  <td className="billing-client__td">
                    {item.start_date.slice(0, 10)}
                  </td>
                  <td className="billing-client__td">{item.name}</td>
                  <td className="billing-client__td">{item.total_price} €</td>
                  <td className="billing-client__td">
                    <span className="billing-client__badge">Payé</span>
                  </td>
                  <td className="billing-client__td">
                    <button type="button" className="billing-client__pdf">
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default BillingClient;
