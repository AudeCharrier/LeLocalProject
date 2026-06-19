import "./Spaces.css";
import FooterDashboard from "../../components/FooterDashboard/FooterDashboard";
import Body from "../../components/SpacesPage/Body/Body";
import Header from "../../components/SpacesPage/Header/Header";

function Spaces() {
  return (
    <section className="spaces-global-section">
      <Header />
      <Body />
      <FooterDashboard />
    </section>
  );
}

export default Spaces;
