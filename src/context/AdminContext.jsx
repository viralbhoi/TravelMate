import React, { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [adminProfile, setAdminProfile] = useState(null);
    const [adminToken, setAdminToken] = useState(null);

    // On mount, fetch admin profile if not in localStorage
    useEffect(() => {
        if (!adminProfile) {
            fetch("/api/admin/profile", { credentials: "include" })
                .then((res) => res.ok ? res.json() : null)
                .then((data) => {
                    if (data) setAdminProfile(data);
                });
        }
    }, []);

    const loginAdmin = (profile, token) => {
        setAdminProfile(profile);
        setAdminToken(token);
    };
    const logoutAdmin = () => {
        setAdminProfile(null);
        setAdminToken(null);
    };

    return (
        <AdminContext.Provider value={{ adminProfile, setAdminProfile, adminToken, setAdminToken, loginAdmin, logoutAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => useContext(AdminContext);
