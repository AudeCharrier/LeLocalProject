import DescriptifAccueil from "../../components/DescriptifAccueil/DescriptifAccueil";
import ImageHautPageAcceuil from "../../components/ImageHautPageAcceuil/ImageHautPageAcceuil";
import NavBar from "../../components/NavBar/NavBar";
import PresentationAccueil from "../../components/PresentationAcceuil/PresentationAccueil";
import Space from "../../components/Space/Space";
import "./Home.css";
function Home() {
  return (
    <section className="home-section">
      <NavBar />
      <ImageHautPageAcceuil />
      <PresentationAccueil />
      <DescriptifAccueil />
      <Space />
    </section>
  );
}

export default Home;
