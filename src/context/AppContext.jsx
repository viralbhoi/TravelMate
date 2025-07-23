import React, { createContext, useContext, useState, useEffect } from "react";
import { getFromLS, saveToLS } from "../utils/localStorageUtils";
import { dummyUsers, dummyDrivers, dummyAdmins,cities,cityDistances,perKMcost, packagesDatalist} from "../data/dummyData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    
    return (
        <AppContext.Provider
            value={{
                            
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
