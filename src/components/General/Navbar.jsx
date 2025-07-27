import React from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileDropDown from "../General/ProfileDropDown";

import { useUserContext } from "../../context/UserContext";

export default function Navbar({ title, navItems }) {
  // State
  const [ProfileDD, setProfileDD] = React.useState(false);
  // context
  const location = useLocation();
  const {userProfile} = useUserContext();
  
  return (
    <nav className="w-full flex flex-wrap items-center justify-between px-4 py-3 bg-blue-100 gap-4 overflow-auto shadow-md border-b border-gray-200 ">
      <h1 className="text-xl flex-1 font-semibold text-gray-800 ">{title}</h1>

      <ul className="flex flex-wrap items-center  space-x-6">
        {navItems?.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={index}>
              <Link
                to={item?.path}
                className={`flex items-center space-x-1 text-sm hover:text-blue-600 transition ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-600"
                }`}
              >
                {item.icon ? <item.icon size={20} /> : null}
                <span>{item?.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {ProfileDD && <ProfileDropDown user={userProfile} setProfileDD={() => setProfileDD(false)} />}
      <div className="flex items-center justify-center space-x-4" onClick={() => setProfileDD(!ProfileDD)}>

          <div className="rounded-full w-10 h-10 bg-gray-300">
            <img src="/UserAvatar.png" alt="Profile" className="rounded-full w-full h-full object-cover" />
          </div>

      </div>
    </nav>
  );
}
