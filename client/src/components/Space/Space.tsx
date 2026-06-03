import CardSpace from "./CardSpace/CardSpace";
import "./Space.css";
function Space() {
  return (
    <section className="sectionSpace">
      <h5>Espaces</h5>
      <div className="Title">
        <h2>Des lieux pour chaque usage</h2>
        <p>Tous les espaces ›</p>
      </div>

      <CardSpace />
    </section>
  );
}

export default Space;
