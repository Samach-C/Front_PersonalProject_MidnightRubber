import React from "react";
import {
  RubberLogo,
  SearchIcon,
  MenuIcon,
  MapIcon,
  NavigateIcon,
  AddLabelIcon,
} from "../icons";
import { Link } from "react-router-dom";
import useUserStore from "../stores/userStore";
import Avatar from "./user/Avatar";

export default function MainNav({ setSearchTerm }) {
  const user = useUserStore((state) => state.user);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header className="h-[80px] w-full fixed top-0 z-10 px-4 flex items-center shadow-lg bg-gradient-to-r from-slate-600 to-slate-500">
      {/* Logo + Input */}
      <div className="flex gap-4 items-center flex-1">
        <RubberLogo className="w-12 h-12" />
        <div className="flex flex-col">
          <Link to="/" className="text-4xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Midnight
          </Link>
          <Link to="/" className="text-4xl font-semibold text-white drop-shadow-lg">
            Rubber
          </Link>
        </div>
        <div className="relative">
          <input
            type="text"
            className="input input-bordered h-10 rounded-full pl-10 w-64 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            placeholder="Search"
            onChange={handleSearch}
          />
          <span className="absolute left-3 top-3">
            <SearchIcon className="w-5 text-gray-400" />
          </span>
        </div>
      </div>

      {/* Right Menu */}
      <div className="flex items-center gap-3 flex-1 justify-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 w-12 h-12 rounded-full flex justify-center items-center bg-gray-300 hover:bg-gray-400 transition duration-300"
          >
            <MenuIcon className="w-8 h-8" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-white rounded-lg z-[1] w-52 p-2 shadow-lg"
          >
            <li>
              <Link to="/maps" className="flex items-center gap-4 text-gray-700 hover:bg-gray-100 p-2 rounded">
                <MapIcon className="w-6 h-6" />
                <span>Maps</span>
              </Link>
            </li>
            <li>
              <Link to="/add-label" className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded">
                <AddLabelIcon className="w-6 h-6" />
                <span>Add Label</span>
              </Link>
            </li>
            <li>
              <a
                className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded"
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
              >
                <NavigateIcon className="w-6 h-6" />
                <span>Navigate</span>
              </a>
            </li>
          </ul>
        </div>

        {user ? (
          <Avatar />
        ) : (
          <Link to={"/login"}>
            <button className="btn btn-primary text-lg rounded-full transition duration-300 hover:bg-blue-600">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
