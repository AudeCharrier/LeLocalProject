import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { apiFetch } from "../../../hooks/apiFetch";
import useAdminEventRequests from "../../../hooks/useAdminEventRequests";
import "./AdminEventRequests.css";

function AdminEventRequests() {
  const { requests, setRequests } = useAdminEventRequests();
  const [openId, setOpenId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function toggleOpen(id: number) {
    setOpenId(openId === id ? null : id);
  }

  async function handleDecision(id: number, status: "approved" | "refused") {
    try {
      setErrorMessage(null);

      const res = await apiFetch(`/api/dashboard/admin/event-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        console.error("Échec de la requête :", res.status, data);
        setErrorMessage(data?.message);
        return;
      }

      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r)),
      );
      setOpenId(null);
    } catch (err) {
      console.error("Erreur réseau :", err);
      setErrorMessage("Impossible de joindre le serveur.");
    }
  }

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <section className="admin-event-requests__container">
      <div className="admin-event-requests__header">
        <h2 className="admin-event-requests__title">Demandes d'événements</h2>
        {pendingCount > 0 && (
          <span className="admin-event-requests__badge">
            {pendingCount} en attente
          </span>
        )}
      </div>

      {requests.length === 0 ? (
        <p className="admin-event-requests__empty">Aucune demande.</p>
      ) : (
        <ul className="admin-event-requests__list">
          {requests.map((request) => {
            const isOpen = openId === request.id;
            return (
              <li key={request.id} className="admin-event-requests__item">
                <button
                  type="button"
                  className="admin-event-requests__row"
                  onClick={() => toggleOpen(request.id)}
                >
                  <span className="admin-event-requests__name">
                    {request.name}
                  </span>
                  <span className="admin-event-requests__client">
                    {request.firstname} {request.lastname}
                  </span>
                  <span className="admin-event-requests__date">
                    {request.start_date.slice(0, 10)}
                  </span>
                  <span className="admin-event-requests__space">
                    {request.space_name}
                  </span>
                  <span
                    className={`admin-event-requests__status admin-event-requests__status--${request.status}`}
                  >
                    {request.status === "pending"
                      ? "En attente"
                      : request.status === "approved"
                        ? "Validé"
                        : "Refusé"}{" "}
                  </span>
                  <ChevronDown
                    className={`admin-event-requests__chevron ${isOpen ? "admin-event-requests__chevron--open" : ""}`}
                    size={18}
                  />
                </button>

                {isOpen && (
                  <div className="admin-event-requests__details">
                    <p className="admin-event-requests__description">
                      {request.description}
                    </p>
                    <p className="admin-event-requests__meta">
                      {request.start_date.slice(0, 10)} →{" "}
                      {request.end_date.slice(0, 10)} · {request.space_name} ·{" "}
                      {request.start_hour.slice(0, 5)} -{" "}
                      {request.end_hour.slice(0, 5)}
                    </p>
                    <div className="admin-event-requests__actions">
                      <button
                        type="button"
                        className="admin-event-requests__approve"
                        onClick={() => handleDecision(request.id, "approved")}
                        disabled={request.status !== "pending"}
                      >
                        Valider
                      </button>
                      <button
                        type="button"
                        className="admin-event-requests__refuse"
                        onClick={() => handleDecision(request.id, "refused")}
                        disabled={request.status !== "pending"}
                      >
                        Refuser
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
          {errorMessage && (
            <p className="admin-event-requests__error-message">
              {errorMessage}
            </p>
          )}
        </ul>
      )}
    </section>
  );
}

export default AdminEventRequests;
