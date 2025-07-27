import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import UserTripBooking from "../components/User/UserTripBooking.jsx";
import UserPackage from "../components/User/UserPackage.jsx";

import UserHistory from "../components/User/History.jsx";
import UserDashboard from '../components/User/UserDashboard.jsx';

export default function UserRouter() {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <UserDashboard />
                }
            />
            <Route
                path="booktrip"
                element={
                    <UserTripBooking />
                }
            />

            <Route
                path="packages"
                element={
                    <UserPackage />
                }
            />
            <Route
                path="history"
                element={
                    <UserHistory />
                }
            />
        </Routes>
    )
}
