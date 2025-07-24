import React from 'react'
import AdminRouter from "../../routes/AdminRouter"
import Navbar from '../General/Navbar';
export default function AdminHomePage() {
    const path=[
    { name: "Dashboard", path: "/admin/", icon: null },
    { name: "Users", path: "/admin/users", icon: null },
    { name: "Packages", path: "/admin/packages", icon: null },
    { name: "Reports", path: "/admin/trips", icon: null },
    ];
  return (
    
    <>  
        <div className='w-screen h-screen bg-cyan-50 overflow-auto'>
          <Navbar title="TravelMate" navItems={path} />
          <AdminRouter />
        </div>
    </>
  );
}
