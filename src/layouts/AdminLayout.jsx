import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="flex bg-neutral-100 h-screen w-screen overflow-hidden">
      <AdminSidebar />

      <div className="flex flex-col flex-1">
        <AdminHeader />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

