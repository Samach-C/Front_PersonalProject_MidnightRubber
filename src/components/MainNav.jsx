import React from "react";
import {
  RubberLogo,
  SearchIcon,
  MenuIcon,
  MapIcon,
  NavigateIcon,
  AddLabelIcon,
} from "../icons";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";
import Avatar from "./user/Avatar";

export default function MainNav() {
  const user = useUserStore((state) => state.user);

  // console.log(user)
  return (
    <header className="h-[80px] w-full fixed top-0 z-10 px-3 flex justify-between shadow-lg bg-slate-500">
      {/* Logo + input */}
      <div className="flex gap-2 items-center flex-1">
        <RubberLogo className="w-12" />
        <p className="text-3xl text-orange-300">Midnight</p>{" "}
        <p className="text-3xl">Rubber</p>
        <label className="input input-bordered flex items-center gap-2 w-64 h-10 rounded-full">
          <input type="text" className="grow" placeholder="Search" />
          <SearchIcon />
        </label>
        {/* Right Menu */}
        <div className="flex gap-3 flex-1 justify-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 w-12 h-12 rounded-full !flex justify-center items-center bg-gray-300 hover:bg-gray-400"
            >
              <MenuIcon className="w-10" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a className="text-xl gap-4">
                  <MapIcon className="w-10" />
                  Maps
                </a>
              </li>
              <li>
                <a className="text-xl -ml-2 gap-2">
                  <AddLabelIcon className="w-14" />
                  Add label
                </a>
              </li>

              <li>
                <a
                  className="text-xl gap-6"
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <NavigateIcon className="w-8" />
                  Navigate
                </a>
              </li>
            </ul>
          </div>

          {user ? (
            <Avatar />
          ) : (
            <div className="avatar justify-center items-center">
              <Link to={"/login"}>
                <button className="btn btn-primary text-lg">Login</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}