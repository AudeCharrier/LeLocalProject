import CardSpace from "../../../components/SpacesPage/Body/CardSpace/CardSpace";
import "./Body.css";
import useSpaces from "../../../hooks/useSpaces";

const CATEGORY_ORDER = [
  "Openspace",
  "Studio d'enregistrement",
  "Studio photo",
  "Salle de réunion",
  "Local vide",
];

function Body() {
  const spaces = useSpaces();

  const filteredSpaces = spaces.filter(
    (space) =>
      space.space_type !== "Evenements" && space.space_category !== "Atelier",
  );

  const groupedSpaces = filteredSpaces.reduce(
    (acc, space) => {
      const category = space.space_category;

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(space);

      return acc;
    },
    {} as Record<string, typeof filteredSpaces>,
  );

  const categories = CATEGORY_ORDER.filter(
    (category) => groupedSpaces[category]?.length,
  ).map(
    (category) =>
      [category, groupedSpaces[category]] as [string, typeof filteredSpaces],
  );

  const leftCategories = categories.filter(
    ([category]) => category === "Openspace" || category === "Salle de réunion",
  );

  const rightCategories = categories.filter(
    ([category]) => category !== "Openspace" && category !== "Salle de réunion",
  );

  return (
    <section className="body-spaces-page-global-section">
      <div className="body-spaces-page-container-div">
        <div className="body-spaces-title-div">
          <h2 className="body-spaces-title">NOS ESPACES</h2>
          <hr className="body-spaces-page-hr" />
        </div>

        <div className="body-spaces-page-spaces-list-div">
          <div className="body-spaces-page-spaces-list-left-column">
            {leftCategories.map(([category, spaceList]) => (
              <CardSpace
                key={category}
                spaces={spaceList}
                categoryName={category}
              />
            ))}
          </div>

          <div className="body-spaces-page-spaces-list-right-column">
            {rightCategories.map(([category, spaceList]) => (
              <CardSpace
                key={category}
                spaces={spaceList}
                categoryName={category}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Body;
