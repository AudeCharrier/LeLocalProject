import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./App";
import Confirmation from "./components/Confirmation/Confirmation";
import { AuthProvider } from "./context/AuthContext";
import { ModalWorkshopProvider } from "./context/ModalWorkshopContext";
import DashboardAdminPage from "./pages/DashboardAdminPage/DashboardAdminPage";
import DashboardClientPage from "./pages/DashboardClientPage/DashboardClientPage";
import Events from "./pages/Events/Events";
import Home from "./pages/Home/Home";
import InvoicePage from "./pages/InvoicePage/InvoicePage";
import LogIn from "./pages/Login/Login";
import Payment from "./pages/Payment/Payment";
import Spaces from "./pages/Spaces/Spaces";
import WorkshopPage from "./pages/WorkshopPage/WorkshopPage";
import Cart from "./pages/cart/Cart";
import SignIn from "./pages/signIn/SignIn";

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
        element: (
          <ModalWorkshopProvider>
            <WorkshopPage />
          </ModalWorkshopProvider>
        ),
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/confirmation",
        element: <Confirmation />,
      },
      {
        path: "/log-in",
        element: <LogIn />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>,
  );
}
