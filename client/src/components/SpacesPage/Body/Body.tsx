import CardSpace from "../../../components/SpacesPage/Body/CardSpace/CardSpace";
import "./Body.css";
import useSpaces from "../../../hooks/useSpaces";

const CATEGORY_ORDER = [
  "Openspace",
  "Studio d'enregistrement",
  "Studio photo",
  "Atelier",
  "Salle de réunion",
  "Local modulable",
];

function Body() {
  const spaces = useSpaces();
  const filterSpace = spaces.filter(
    (space) => space.space_type !== "Evenements",
  );

  const groupedSpaces = filterSpace.reduce(
    (acc, space) => {
      const category = space.space_category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(space);
      return acc;
    },
    {} as Record<string, typeof filterSpace>,
  );

  const categories = CATEGORY_ORDER.filter((cat) => groupedSpaces[cat]).map(
    (cat) => [cat, groupedSpaces[cat]] as [string, typeof filterSpace],
  );

  return (
    <section className="body-spaces-page-global-section">
      <div className="body-spaces-page-container-div">
        <div className="body-spaces-title-div">
          <h2 className="body-spaces-title">NOS ESPACES</h2>
          <hr className="body-spaces-page-hr" />
        </div>

        <div className="body-spaces-page-spaces-list-div">
          {categories.map(([category, spaceList], i) => (
            <div className={`card-space-${i}-div`} key={category}>
              <CardSpace spaces={spaceList} categoryName={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Body;
