import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from '../pages/auth/Login';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import Manage from '../pages/admin/Manage';
import MapContent from '../pages/admin/MapContent';
import ProtectRoute from './ProtectRoute';
import Unauthorization from '../pages/Unauthorization';
import PageNotFound from '../pages/PageNotFound';


const Router = createBrowserRouter([
    // { path: "/", element: <Home /> },
    // { path: "login", element : <Login />},
    {
      path: "/",
      children: [
        { index: true, element: <Home />},
        { path: "login", element: <Login />},
        { path: "unauthorization", element: <Unauthorization />},
        { path: "*", element: <PageNotFound />},
      ]
    },


    { 
      path: "/admin", 
      element : <ProtectRoute element={<AdminLayout />} allow={["ADMIN"]} />,
      children : [
        { index: true,  element: <Dashboard />},
        { path: "manage", element: <Manage />},
        { path: "mapcontent", element: <MapContent />},
      ]
    }
])


const AppRouter = () => {
  return (
    <div>
      <RouterProvider router={Router}/>
    </div>
  )
}

export default AppRouter