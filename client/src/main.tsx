import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./App";
import DashboardClientPage from "./pages/DashboardClientPage/DashboardClientPage";
import Home from "./pages/Home/Home";
import Spaces from "./pages/Spaces/Spaces";
import Cart from "./pages/cart/Cart";

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
        path: "/cart",
        element: <Cart />,
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
