import React from "react";
import { ArrowDownIcon, UserIcon } from "../../icons";
import useUserStore from "../../stores/userStore";
import { useNavigate } from "react-router-dom";

export default function Avatar() {
  const logout = useUserStore((state) => state.logout);

  const navigate = useNavigate();

  const hdlLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn-circle">
        <div>
          <UserIcon className="w-14" />
        </div>
        <ArrowDownIcon className="absolute -bottom-2 -right-1 w-4" />
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
