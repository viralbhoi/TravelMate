import React, { createContext, useContext, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const socket = useRef(null);

    const connectSocket = (token) => {
        if (!socket.current) {
            socket.current = io(process.env.REACT_APP_SOCKET_URL, {
                auth: { token },
                transports: ["websocket"]
            });
        }
    };

    const disconnectSocket = () => {
        if (socket.current) {
            socket.current.disconnect();
            socket.current = null;
        }
    };

    return (
        <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
