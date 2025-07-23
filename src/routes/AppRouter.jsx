import { Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx"

import UserDashboard from "../components/User/UserDashboard.jsx";

import AdminDashboard from "../components/Admin/AdminDashboard.jsx";

import DriverDashboard from "../components/Driver/DriverDashboard.jsx";


export default function AppRouter() {
    const {loggedInUser} = useAppContext();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route
                path="/user/*"
                element={
                    loggedInUser?.role === "user" ? (
                        <UserDashboard />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/admin/*"
                element={
                    loggedInUser?.role === "admin" ? (
                        <AdminDashboard />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/driver/*"
                element={
                    loggedInUser?.role === "driver" ? (
                        <DriverDashboard />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />            
        </Routes>
    );
}
