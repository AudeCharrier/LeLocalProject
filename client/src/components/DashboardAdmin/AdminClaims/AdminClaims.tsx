import { CheckCircle2, ChevronDown, Inbox } from "lucide-react";
import { useState } from "react";
import useAdminClaims from "../../../hooks/useAdminClaims";
import "./AdminClaims.css";

function AdminClaims() {
  const claims = useAdminClaims();
  const [openId, setOpenId] = useState<number | null>(null);
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [sentResponses, setSentResponses] = useState<Record<number, string>>(
    {},
  );

  const pendingCount = claims.filter((c) => !(c.id in sentResponses)).length;

  function toggleOpen(id: number) {
    setOpenId(openId === id ? null : id);
  }

  function handleChange(id: number, value: string) {
    setDrafts((prev) => ({ ...prev, [id]: value }));
  }

  function handleRespond(id: number) {
    setSentResponses((prev) => ({ ...prev, [id]: drafts[id] }));
  }

  function getFakeEmail(firstname: string, lastname: string) {
    return `${firstname.toLowerCase()}.${lastname.toLowerCase()}@gmail.com`;
  }

  return (
    <section className="admin-claims__container">
      <div className="admin-claims__header">
        <h2 className="admin-claims__title">
          <Inbox size={20} color="var(--color-primary)" /> Réclamations
        </h2>
        {pendingCount > 0 && (
          <span className="admin-claims__badge">
            {pendingCount} non traitée{pendingCount > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {claims.length === 0 ? (
        <p className="admin-claims__empty">Aucune réclamation.</p>
      ) : (
        <ul className="admin-claims__list">
          {claims.map((claim) => {
            const isOpen = openId === claim.id;
            const isSent = claim.id in sentResponses;

            return (
              <li key={claim.id} className="admin-claims__item">
                <button
                  type="button"
                  className="admin-claims__row"
                  onClick={() => toggleOpen(claim.id)}
                >
                  <span className="admin-claims__category">
                    {claim.category}
                  </span>
                  <span className="admin-claims__row-title">{claim.title}</span>
                  <span className="admin-claims__row-client">
                    {claim.firstname} {claim.lastname}
                  </span>
                  <span className="admin-claims__row-date">
                    {claim.claim_date}
                  </span>
                  <span
                    className={`admin-claims__status admin-claims__status--${isSent ? "resolved" : "pending"}`}
                  >
                    {isSent ? "Traité" : "Non traité"}
                  </span>
                  <ChevronDown
                    className={`admin-claims__chevron ${isOpen ? "admin-claims__chevron--open" : ""}`}
                    size={18}
                  />
                </button>

                {isOpen && (
                  <div className="admin-claims__details">
                    <p className="admin-claims__message">{claim.message}</p>

                    {isSent ? (
                      <div className="admin-claims__response admin-claims__response--sent">
                        <span className="admin-claims__response-label">
                          <CheckCircle2 size={14} /> Réponse envoyée à{" "}
                          {getFakeEmail(claim.firstname, claim.lastname)}
                        </span>
                        <p>{sentResponses[claim.id]}</p>
                      </div>
                    ) : (
                      <div className="admin-claims__response">
                        <textarea
                          className="admin-claims__textarea"
                          placeholder="Écrivez votre réponse..."
                          rows={3}
                          value={drafts[claim.id] ?? ""}
                          onChange={(e) =>
                            handleChange(claim.id, e.target.value)
                          }
                        />
                        <button
                          type="button"
                          className="admin-claims__submit"
                          onClick={() => handleRespond(claim.id)}
                          disabled={!drafts[claim.id]}
                        >
                          Envoyer la réponse →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default AdminClaims;
