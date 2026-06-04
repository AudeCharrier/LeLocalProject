import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

function App() {
  return (
    <main>
      <NavBar />
      <Outlet />
    </main>
  );
}

export default App;
