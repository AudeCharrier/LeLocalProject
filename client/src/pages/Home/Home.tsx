import HeaderHomePresentation from "../../components/Home/HeaderHomePresentation/HomePresentation";
import HeaderImage from "../../components/Home/HeaderImage/HeaderImage";
import HomeDescritpion from "../../components/Home/HomeDescription/HomeDescritpion";
import NavBar from "../../components/NavBar/NavBar";
import Space from "../../components/Space/Space";
import "./Home.css";
function Home() {
  return (
    <section className="home-global-section">
      <NavBar />
      <HeaderImage />
      <HeaderHomePresentation />
      <HomeDescritpion />
      <Space />
    </section>
  );
}

export default Home;
