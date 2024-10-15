import React from "react";
import { ArrowDownIcon, ProfileIcon } from "../../icons";
import useUserStore from "../../stores/userStore";
import { useNavigate } from "react-router-dom";


const AdminHeader = () => {

  const navigate = useNavigate()
  const logout = useUserStore(state => state.logout)

  const user = useUserStore(state => state.user)
  
  const hdlLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="bg-neutral-500 text-white h-12 px-4 items-center flex justify-end">
      <div className="relative group bg-neutral-500">
        <button
          className="flex items-center justify-between gap-2
                    hover:text-green-500 hover:scale-110 hover:-translate-y-1 hover:duration-200"
        >
          <ProfileIcon
            className="w-8"
          />
          <span className="text-lg text-yellow-400">{user.role}</span>
          {/* Profile */}
          <ArrowDownIcon className="w-3 flex flex-1" />
        </button>
        <ul className="absolute bg-neutral-500 rounded-lg w-full hidden group-hover:block">
          <li 
          onClick={hdlLogout}
          className="py-2 px-3 cursor-pointer rounded-sm hover:bg-neutral-200 hover:duration-200 active:bg-green-400">
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;