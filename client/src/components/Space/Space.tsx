import CardSpace from "./CardSpace/CardSpace";
import "./Space.css";

import useSpaces from "../../hooks/useSpaces";

import { useNavigate } from "react-router";

function SpaceSection() {
  const navigate = useNavigate();
  const spaces = useSpaces();
  const randomSpaces = [...spaces]
    .filter(
      (space) =>
        space.space_category !== "Atelier" &&
        space.space_category !== "Salle détente",
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  return (
    <section className="space-section">
      <h5 className="space-section-eyebrow">Espaces</h5>
      <div className="space-section-header">
        <h2 className="space-section-title">Des lieux pour chaque usage</h2>
        <button
          className="space-section-see-all"
          type="button"
          onClick={() => navigate("/espaces")}
        >
          Tous les espaces
        </button>
      </div>
      <section className="space-section-grid">
        {randomSpaces.map((space) => (
          <CardSpace key={space.id} fakeArraySpace={space} />
        ))}
      </section>
    </section>
  );
}

export default SpaceSection;
