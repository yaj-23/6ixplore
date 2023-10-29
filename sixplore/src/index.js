import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './dashboard';
import Profile from './profile';
import Signup from './signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);
