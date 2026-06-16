import { ChevronDown, Inbox } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import useAdminClaims from "../../../hooks/useAdminClaims";
import "./AdminClaims.css";

type AdminClaimsProps = {
  previewLimit?: number;
};

function AdminClaims({ previewLimit }: AdminClaimsProps) {
  const claims = useAdminClaims();
  const [openId, setOpenId] = useState<number | null>(null);
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const visibleClaims = previewLimit ? claims.slice(0, previewLimit) : claims;

  function toggleOpen(id: number) {
    setOpenId(openId === id ? null : id);
  }

  function handleChange(id: number, value: string) {
    setDrafts((prev) => ({ ...prev, [id]: value }));
  }

  function handleRespond(id: number) {
    console.log("Réponse envoyée pour la réclamation", id, drafts[id]);
  }

  return (
    <section className="admin-claims__container">
      <div className="admin-claims__header">
        <h2 className="admin-claims__title">
          <Inbox size={20} color="var(--color-primary)" /> Réclamations
        </h2>
        <div className="admin-claims__header-actions">
          {claims.length > 0 && (
            <span className="admin-claims__badge">
              {claims.length} non traitée{claims.length > 1 ? "s" : ""}
            </span>
          )}
          {previewLimit && claims.length > previewLimit && (
            <Link className="admin-claims__link" to="/dashboard-admin#admin-claims">
              Voir tout →
            </Link>
          )}
        </div>
      </div>

      {claims.length === 0 ? (
        <p className="admin-claims__empty">Aucune réclamation.</p>
      ) : (
        <ul className="admin-claims__list">
          {visibleClaims.map((claim) => {
            const isOpen = openId === claim.id;

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
                  <span className="admin-claims__status admin-claims__status--pending">
                    Non traité
                  </span>
                  <ChevronDown
                    className={`admin-claims__chevron ${isOpen ? "admin-claims__chevron--open" : ""}`}
                    size={18}
                  />
                </button>

                {isOpen && (
                  <div className="admin-claims__details">
                    <p className="admin-claims__message">{claim.message}</p>

                    <div className="admin-claims__response">
                      <textarea
                        className="admin-claims__textarea"
                        placeholder="Écrivez votre réponse..."
                        rows={3}
                        value={drafts[claim.id] ?? ""}
                        onChange={(e) => handleChange(claim.id, e.target.value)}
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
