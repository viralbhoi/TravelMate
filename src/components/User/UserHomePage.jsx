import React from 'react'
import UserRouter from "../../routes/UserRouter"
import Navbar from '../General/Navbar'
export default function UserHomePage() {
  const path=[
    { name: "Home", path: "/user/", icon: null },

    { name: "History", path: "/user/history", icon: null },
    ];
  return (
    <>  
        <Navbar navItems={path} title="travelMate"/>
        <UserRouter/>
    </>
  );
}
