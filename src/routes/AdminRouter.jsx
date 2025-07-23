import React from 'react'
import ConfirmTrip from "../components/Admin/ConfirmTrip.jsx";
import AllTrips from "../components/Admin/AllTrips.jsx";
import AdminPackages from "../components/Admin/AdminPackages.jsx";

export default function AdminRouter() {
    return (
      
        <Routes>
            <Route
                path="confirmtrip"
                element={
                    loggedInUser?.role === "admin" ? (
                        <ConfirmTrip />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />

            <Route
                path="alltrips"
                element={
                    loggedInUser?.role === "admin" ? (
                        <AllTrips />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />

            <Route
                path="packages"
                element={
                    loggedInUser?.role === "admin" ? (
                        <AdminPackages />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
        </Routes >
  )
}
