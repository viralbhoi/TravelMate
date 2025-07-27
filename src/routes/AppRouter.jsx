import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx"
import UserHomePage from "../components/User/UserHomePage.jsx";
import AdminHomePage from "../components/Admin/AdminHomePage.jsx";
import DriverHomePage from "../components/Driver/DriverHomePage.jsx";

import { useLoginContext } from "../context/LoginContext.jsx";

export default function AppRouter() {
    const { loginStatus,userRole } = useLoginContext();

    const roles = [{ name: "user", component: <UserHomePage /> },
                    { name: "admin", component: <AdminHomePage /> },
                    { name: "driver", component: <DriverHomePage /> }];
    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />


            {roles?.map((role) => (
                <Route
                    path={`/${role.name}/*`}
                    element={
                        loginStatus && (userRole === role.name ? (
                            role.component
                        ) : (
                            <Navigate to="/login" />
                        ))
                    }
                />
            ))}


        </Routes>
    );
}
