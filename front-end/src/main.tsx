import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard.js";
import Category from "./pages/Category.js";
import Subcategory from "./pages/Subcategory";
import Product from "./pages/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "admin",
    element: <App />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "category", element: <Category /> },
      { path: "subcategory", element: <Subcategory /> },
      { path: "products", element: <Product /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
);
