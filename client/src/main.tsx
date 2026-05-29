import ReactDOM from "react-dom/client";
import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home/Home";
import Space from "./components/Space/Space";
import App from "./App";

// Pages

// Router
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/space",
        element: <Space />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
