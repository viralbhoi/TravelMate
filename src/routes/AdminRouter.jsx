import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import ConfirmTrip from "../components/Admin/ConfirmTrip.jsx";
import AllTrips from "../components/Admin/AllTrips.jsx";
import AdminPackages from "../components/Admin/AdminPackages.jsx";

import {useLoginContext} from '../context/LoginContext';

export default function AdminRouter() {
    const {loginStatus} = useLoginContext();
    return (
      
        <Routes>
            <Route
                path="confirmtrip"
                element={
                    <ConfirmTrip />
                }
            />

            <Route
                path="alltrips"
                element={
                    <Navigate to="/login" />
                }
            />

            <Route
                path="packages"
                element={
                        <Navigate to="/login" />
                    }
            />
            <Route
                path="/welcome"
                element={
                    (
                        <div>Welcome</div>
                    )
                }
            />
        </Routes >
  )
}
