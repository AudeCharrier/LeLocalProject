import "./Spaces.css";
import Body from "../../components/SpacesPage/Body/Body";
import Header from "../../components/SpacesPage/Header/Header";
import FooterDashboard from "../../components/FooterDashboard/FooterDashboard";

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
