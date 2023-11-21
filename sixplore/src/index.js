import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from 'react-router-dom';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Signup from "./pages/signup";
import HomePage from "./pages/homepage";
import Signin from "./pages/signin";
import SuggestEvent from "./pages/SuggestEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/about",
    element: <HomePage/>,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/suggest-event",
    element: <SuggestEvent />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
