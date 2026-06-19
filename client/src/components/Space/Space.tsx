import CardSpace from "./CardSpace/CardSpace";
import "./Space.css";

import useSpaces from "../../hooks/useSpaces";

function SpaceSection() {
  const spaces = useSpaces();
  const randomSpaces = [...spaces].sort(() => Math.random() - 0.5).slice(0, 6);

  return (
    <section className="sectionSpace">
      <h5>Espaces</h5>
      <div className="Title">
        <h2>Des lieux pour chaque usage</h2>
        <p>Tous les espaces</p>
      </div>
      <section className="section-cardspace">
        {randomSpaces.map((space) => (
          <CardSpace key={space.id} fakeArraySpace={space} />
        ))}
      </section>
    </section>
  );
}

export default SpaceSection;
