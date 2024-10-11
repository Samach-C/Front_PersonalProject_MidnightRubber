import React from "react";

export default function Layout() {
  return (
    <div>
      <div className="flex h-screen w-screen overflow-hidden">
        <div className="flex flex-col flex-1">
          <MainNav />
          <hr />

          <div className="flex-1 min-h-0 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
