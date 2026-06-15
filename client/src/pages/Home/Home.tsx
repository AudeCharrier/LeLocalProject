import CreateEventForm from "../../components/CreateEventForm/CreateEventForm";
import EventSection from "../../components/Event/EventSection";
import FooterHome from "../../components/FooterHome/FooterHome";
import HeaderHomePresentation from "../../components/Home/HeaderHomePresentation/HomePresentation";
import HeaderImage from "../../components/Home/HeaderImage/HeaderImage";
import HomeDescritpion from "../../components/Home/HomeDescription/HomeDescritpion";
import SpaceSection from "../../components/Space/Space";

import "./Home.css";

function Home() {
  return (
    <section className="home-global-section">
      <HeaderImage />
      <HeaderHomePresentation />
      <HomeDescritpion />
      <EventSection />
      <SpaceSection />
      <CreateEventForm />
      <FooterHome />
    </section>
  );
}

export default Home;
