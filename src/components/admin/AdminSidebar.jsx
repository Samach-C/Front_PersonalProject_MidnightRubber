// import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { DashboardIcon, LogoutIcon, ManageIcon, MapsIcon, MenusIcon, ProfileIcon, SettingIcon } from "../../icons";
import useUserStore from "../../stores/userStore";
const classLink =
"flex items-center hover:bg-neutral-700 hover:scale-105 hover:duration-200 active:bg-green-400 rounded-sm px-3 py-2 gap-2";

export default function AdminSidebar() {
  const logout = useUserStore( state => state.logout)

  const navigate = useNavigate()
  
  const hdlLogout = () => {
    logout()
    navigate("/")
  }
  return (
    <div className="bg-neutral-500 w-60 h-[738px] p-4 flex flex-col text-white">
      {/* Profile */}
      <div className="flex flex-col items-center gap-2 py-4">
        <ProfileIcon className="w-20" />
        <span className="text-lg ">Profile</span>
      </div>

      {/* Menu Link */}
      <div className="flex-1 py-4">
        <div className="flex items-center">
        <Link className={classLink} to={"/admin"}>
          <span className="text-xl">
            <DashboardIcon className="w-12" />
          </span>
          Dashboard
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <Link className={classLink} to="/admin/manage">
          <span className="text-xl">
            <ManageIcon className="w-10" />
          </span>
          Manage User
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <Link className={classLink} to="/admin/mapcontent">
          <span className="text-xl">
            <MapsIcon className="w-10 h-10" />
          </span>
          Map
          </Link>
        </div>
        

        <div className="flex items-center gap-2">
          <Link className={classLink} to="/admin/menu">
          <span className="text-xl">
            <MenusIcon className="w-10" />
          </span>
          Menu...
          </Link>
        </div>
        
      </div>

      {/* Bottom Menu */}
      <div>
        <div className="flex items-center gap-1">
          <span className="text-xl">
            <SettingIcon className="w-12" />
          </span>
          Setting
        </div>
        

        <div onClick={hdlLogout} className="flex items-center gap-2 pt-2">
          <span className="text-xl">
            <LogoutIcon className="w-10" />
          </span>
          Logout
        </div>
        
      </div>
    </div>
  );
};

