import React, { lazy } from "react";
import ProtectedRoute, { PublicRoute } from "./ProtectedRoutes.jsx";
const NotFoundPage = lazy(() => import("../Pages/error-pages/NotFoundPage.jsx"));

const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage.jsx"));


export const ROUTES = [


  {
    path: "/",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
    name: "login",
  },

  {
    path: "*",
    element: <NotFoundPage />,
    name: "notFound",
  },
];