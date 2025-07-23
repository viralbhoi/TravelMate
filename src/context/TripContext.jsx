import React, { createContext, useContext, useState, useEffect } from "react";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
    const [currentTrip, setCurrentTrip] = useState(null);
    const [tripStatus, setTripStatus] = useState(null);
    const [location, setLocation] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);

    const fetchCurrentTrip = async () => {
        const res = await fetch("/api/trip/current", { credentials: "include" });
        if (res.ok) {
            const data = await res.json();
            setCurrentTrip(data);
            return data;
        }
        return null;
    };

    useEffect(() => {
        if (!currentTrip) {
            fetchCurrentTrip();
        }
    }, []);

    return (
        <TripContext.Provider value={{ currentTrip, setCurrentTrip, tripStatus, setTripStatus, location, setLocation, chatMessages, setChatMessages, fetchCurrentTrip }}>
            {children}
        </TripContext.Provider>
    );
};

export const useTripContext = () => useContext(TripContext);
