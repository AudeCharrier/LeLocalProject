import "./App.css";
import DescriptifAccueil from "./components/DescriptifAccueil/DescriptifAccueil";
import ImageHautPageAcceuil from "./components/ImageHautPageAcceuil/ImageHautPageAcceuil";
import NavBar from "./components/NavBar/NavBar";
import PresentationAccueil from "./components/PresentationAcceuil/PresentationAccueil";

function App() {
  return (
    <>
      <NavBar />
      <ImageHautPageAcceuil />
      <PresentationAccueil />
      <DescriptifAccueil />
    </>
  );
}

export default App;
