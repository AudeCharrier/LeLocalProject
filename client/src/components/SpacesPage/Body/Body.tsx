import CardSpace from "../../Space/CardSpace/CardSpace";
import "./Body.css";

function Body() {
  return (
    <section className="body-spaces-page-global-section">
      <div className="body-spaces-page-container-div">
        <div className="body-spaces-title-div">
          <h2 className="body-spaces-title"> NOS ESPACES</h2>
          <hr className="body-spaces-page-hr" />
        </div>
        <div className="body-spaces-page-spaces-list-div">
          <CardSpace />
        </div>
      </div>
    </section>
  );
}

export default Body;
