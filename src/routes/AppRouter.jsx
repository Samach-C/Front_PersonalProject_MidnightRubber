import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from '../pages/auth/Login';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import Manage from '../pages/admin/Manage';
import MapContent from '../pages/admin/MapContent';
import Menu from '../pages/admin/Menu';


const Router = createBrowserRouter([
    { path: "/", element: <Home /> },

    { path: "login", element : <Login />},

    { 
      path: "/admin", 
      element : <AdminLayout />,
      children : [
        { index: true,  element: <Dashboard />},
        { path: "manage", element: <Manage />},
        { path: "mapcontent", element: <MapContent />},
        { path: "menu", element: <Menu />},
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


// ยังไม่ได้ ProtectRoute