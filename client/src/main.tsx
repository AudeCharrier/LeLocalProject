import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./App";
import CalendarEvents from "./components/Calendar/Calendar";
import DashboardAdminPage from "./pages/DashboardAdminPage/DashboardAdminPage";
import DashboardClientPage from "./pages/DashboardClientPage/DashboardClientPage";
import Events from "./pages/Events/Events";
import Home from "./pages/Home/Home";
import InvoicePage from "./pages/InvoicePage/InvoicePage";
import Spaces from "./pages/Spaces/Spaces";
import WorkshopPage from "./pages/WorkshopPage/WorkshopPage";
import Cart from "./pages/cart/Cart";

// Router
const router = createBrowserRouter([
  {
    path: "/invoice/:bookingId",
    element: <InvoicePage />,
  },
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
        path: "/evenements",
        element: <Events />,
      },
      {
        path: "/dashboard-client",
        element: <DashboardClientPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/dashboard-admin",
        element: <DashboardAdminPage />,
      },
      {
        path: "/workshop-page",
        element: <WorkshopPage />,
      },
      {
        path: "/calendar",
        element: <CalendarEvents />,
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
