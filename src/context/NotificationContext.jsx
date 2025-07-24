import React, { createContext, useContext } from "react";
import toast,{Toaster} from "react-hot-toast";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const notifySuccess = (message) => {
        toast.success(message);
    };

    const notifyError = (message) => {
        toast.error(message);
    };

    const notifyInfo = (message) => {
        toast(message);
    };

    const notifyPromise = (promise, messages) => {
        toast.promise(promise, {
            loading: messages.loading || "Loading...",
            success: messages.success || "Success!",
            error: messages.error || "Something went wrong!",
        });
    };

    return (
        <NotificationContext.Provider value={{ notifySuccess, notifyError, notifyInfo, notifyPromise }}>
            
                {children}
           
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
