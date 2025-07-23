import React from 'react'

import UserTripBooking from "../components/User/UserTripBooking.jsx";
import UserPackage from "../components/User/UserPackage.jsx";

export default function UserRouter() {
    return (
        <Routes>

            <Route
                path="booktrip"
                element={
                    loggedInUser?.role === "user" ? (
                        <UserTripBooking />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />

            <Route
                path="packages"
                element={
                    loggedInUser?.role === "user" ? (
                        <UserPackage />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
        </Routes>
    )
}
