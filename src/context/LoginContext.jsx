import React, { createContext, useContext, useState, useEffect, use } from "react";
import { getFromLS, saveToLS } from "../utils/localStorageUtils";


const loginContext = createContext();

export const LoginContextProvider = ({ children }) => {
    const [loginStatus, setLoginStatus] = useState(getFromLS("loginStatus") || true);
    const [token, setToken] = useState(getFromLS("token") || null);
    const [userRole, setUserRole] = useState(getFromLS("userRole") || "user");

    useEffect(() => {
        saveToLS("loginStatus", loginStatus);
    }, [loginStatus]);
    useEffect(() => {
        saveToLS("token", token);
    }, [token]);
    useEffect(() => {
        saveToLS("userRole", userRole);
    }, [userRole]);

    const login = (jwt) => {
        setLoginStatus(true);
        saveToLS("loginStatus", true);
        setToken(jwt);
        saveToLS("token", jwt);
    };

    const logout = () => {
        setLoginStatus(false);
        saveToLS("loginStatus", false);
        setToken(null);
        saveToLS("token", null);
        localStorage.clear();
    };

    return (
        <loginContext.Provider
            value={{
                loginStatus,
                setLoginStatus,
                token,
                // setToken, for security purposes let it be here only 
                login,
                logout
                , userRole, setUserRole
            }}
        >
            {children}
        </loginContext.Provider>
    );
};

export const useLoginContext = () => useContext(loginContext);