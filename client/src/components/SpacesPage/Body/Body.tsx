import CardSpace from "../../../components/SpacesPage/Body/CardSpace/CardSpace";
import "./Body.css";
import useSpaces from "../../../hooks/useSpaces";

function Body() {
  const spaces = useSpaces();
  const filterSpace = spaces.filter(
    (space) => space.space_type !== "Evenements",
  );
  console.log(filterSpace);
  return (
    <section className="body-spaces-page-global-section">
      <div className="body-spaces-page-container-div">
        <div className="body-spaces-title-div">
          <h2 className="body-spaces-title">NOS ESPACES</h2>
          <hr className="body-spaces-page-hr" />
        </div>

        <div className="body-spaces-page-spaces-list-div">
          {filterSpace.map((space, i) => (
            <div className={`card-space-${i}-div`} key={space.id}>
              <CardSpace key={space.id} space={space} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Body;
