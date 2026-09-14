/**
 * @fileoverview Application routing configuration using React Router.
 * Defines public, protected, and wildcard fallback navigation rules.
 */

import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Editor from "./pages/editor";
import MyTrips from "./pages/mytrips";

import RequireAuth from "./auth/require-auth";
import RedirectIfAuthed from "./auth/redirect-if-authed";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RedirectIfAuthed>
        <Login />
      </RedirectIfAuthed>
    ),
  },
  {
    path: "/register",
    element: (
      <RedirectIfAuthed>
        <Register />
      </RedirectIfAuthed>
    ),
  },
  {
    path: "/home",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: "/mytrips",
    element: (
      <RequireAuth>
        <MyTrips />
      </RequireAuth>
    ),
  },
  {
    path: "/editor/:tripId",
    element: (
      <RequireAuth>
        <Editor />
      </RequireAuth>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/home" replace />,
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}