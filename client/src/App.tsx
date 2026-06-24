import { Outlet, ScrollRestoration } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

function App() {
  return (
    <main>
      <ScrollRestoration />
      <NavBar />
      <Outlet />
    </main>
  );
}

export default App;
