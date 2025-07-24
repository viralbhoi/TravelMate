import React from 'react'
import { LoginContextProvider } from './LoginContext';
import { UserContextProvider } from './UserContext';
import { NotificationProvider } from './NotificationContext';
import { SocketContextProvider } from './SocketContext';
import { TripContextProvider } from './TripContext';

import { Toaster } from 'react-hot-toast';
export default function ContextProvider({ children }) {
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      ></Toaster>
      <NotificationProvider>
        <LoginContextProvider>
          <UserContextProvider>
            <TripContextProvider>
              <SocketContextProvider>
                {children}
              </SocketContextProvider>
            </TripContextProvider>
          </UserContextProvider>
        </LoginContextProvider>
      </NotificationProvider>
    </>

  )
}


{/* <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: "#333",
                        color: "#fff",
                    },
                }}
            ></Toaster> */}