import React from "react";
import { ArrowDownIcon, UserIcon } from "../../icons";
import useUserStore from "../../stores/userStore";
import { useNavigate } from "react-router-dom";

export default function Avatar() {
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore(state => state.user)

  const navigate = useNavigate();

  const hdlLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn-circle">
        <div className="text-yellow-300 text-xs">
          <UserIcon className="w-10" />
          <div className="text-center">
          {user.role}
          </div>
        </div>
        <ArrowDownIcon className="absolute -bottom-3 -right-1 w-4" />
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li onClick={hdlLogout}>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
