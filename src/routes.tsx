import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./auth/SignUp";
import LoginForm from "./auth/Login";
import Home from "./pages/Home";
import type { AppRoutes } from "./types/router";

const routes: AppRoutes = [
  {
    path: "/",
    element: <Home />,
    meta: {
      title: "Home Page",
      requiresAuth: false,
    },
  },
  {
    path: "/api/auth/signup",
    element: <Signup />,
    meta: {
      title: "Sign Up",
      requiresAuth: false,
    },
  },
  {
    path: "/api/auth/login",
    element: <LoginForm />,
    meta: {
      title: "Login",
      requiresAuth: false,
    },
  },
];

const router = createBrowserRouter(routes);

export function Router() {
  return <RouterProvider router={router} />;
}
