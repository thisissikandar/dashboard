import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import DashboardLayout from "@/layout/DashboardLayout";
import BookPage, { bookFetcher } from "./pages/BookPage";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <DashboardLayout />,
      errorElement: <NotFoundPage />,

      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "books",
          element: <BookPage />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
      ],
    },

    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
  {
    future: {
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
