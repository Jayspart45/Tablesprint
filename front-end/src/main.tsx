import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import pages and components
import App from "./App";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import Subcategory from "./pages/Subcategory";
import Product from "./pages/Product";
import ProtectedRoute from "./shared/ProtectedRoute";
import ForgotPassword from "./components/ForgotAndReset/Forgotpassword";
import ResetPassword from "./components/ForgotAndReset/ResetPassword";
import PageNotFound from "./pages/PageNotFound";

// Configure router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:email/:token",
    element: <ResetPassword />,
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "category", element: <Category /> },
      { path: "subcategory", element: <Subcategory /> },
      { path: "products", element: <Product /> },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

// Render the application
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
);
