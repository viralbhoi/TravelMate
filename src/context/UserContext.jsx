import React, { createContext, useContext, useState, useEffect } from "react";
import { getFromLS, saveToLS } from "../utils/localStorageUtils";
import { updateProfile } from "../../../backend/controllers/user.controller";

const userContext = createContext();


export const userContextProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(getFromLS("userProfile") || null);

 
    useEffect(() => {
        if (!userProfile) {
            
            fetch("/api/user/profile", { credentials: "include" })
                .then((res) => res.ok ? res.json() : null)
                .then((data) => {
                    if (data) {
                        setUserProfile(data);
                        saveToLS("userProfile", data);
                    }
                });
        }
    }, []);

    useEffect(() => {
        if (userProfile) {
            saveToLS("userProfile", userProfile);
        } else {
            saveToLS("userProfile", null);
        }
    }, [userProfile]);

    
    const updateProfile = (updateField) => {
        setUserProfile((prevProfile) => ({
            ...prevProfile,
            ...updateField
        }));
    };


    return (
        <userContext.Provider value={{ userProfile, setUserProfile, updateProfile }}>
            {children}
        </userContext.Provider>
    );
};

export const useUserContext = () => useContext(userContext);
