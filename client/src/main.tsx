import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./App";
import DashboardAdminPage from "./pages/DashboardAdminPage/DashboardAdminPage";
import DashboardClientPage from "./pages/DashboardClientPage/DashboardClientPage";
import Home from "./pages/Home/Home";
import Spaces from "./pages/Spaces/Spaces";

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
        path: "/espaces",
        element: <Spaces />,
      },
      {
        path: "/dashboard-client",
        element: <DashboardClientPage />,
      },
      {
        path: "/dashboard-admin",
        element: <DashboardAdminPage />,
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
