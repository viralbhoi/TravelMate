import React from "react";
import { useAppContext } from "../../context/AppContext";

export default function UserTripData() {
    const { trips, users, drivers, loggedInUser } = useAppContext();

    const userTrips = trips.filter(
        (trip) => trip.userEmail === loggedInUser.email
    );

    return (
        <div className="p-3 flex flex-col gap-3 mt-[20%] md:mt-0 md:ml-[20%] w-full justify-center m-auto">
            <h2 className="text-xl font-medium text-shadow-sm shadow-md p-4 bg-slate-800 rounded-2xl text-center text-slate-50">
                User Trip Information
            </h2>
            {userTrips.length > 0 ?  (
                userTrips.map((trip, index) => {
                    return (
                        <div
                            key={index}
                            className="flex gap-2 flex-col md:flex-row justify-evenly p-4 m-1 bg-slate-300 rounded-2xl shadow-md"
                        >
                            <div className="flex flex-col flex-2/12 justify-center">
                                <p>id:</p>
                                <p>{trip.id}</p>
                            </div>
    
                            <div className="flex flex-col flex-3/12 justify-center">
                                <p>
                                    {trip.pickup} &rarr; {trip.destination}
                                </p>
                            </div>
    
                            <div className="flex flex-col flex-3/12 gap-2 justify-center">
                                <p>Driver: </p>
                                <p>
                                    {trip.status === "approved"
                                        ? drivers.find(
                                              (driver) =>
                                                  driver.email === trip.driverEmail
                                          )?.email
                                        : "Not Assigned"}
                                </p>
                            </div>
    
                            <div className="flex flex-col flex-2/12 gap-2 justify-center">
                                <p>Cost : </p>
                                <p>₹ {trip.cost || 0}</p>
                            </div>
    
                            <div className="flex flex-col flex-2/12 justify-center">
                                {trip.status === "rejected" ? (
                                    <p className="bg-red-500 text-slate-50 p-4 rounded-2xl">
                                        {" "}
                                        Rejected{" "}
                                    </p>
                                ) : trip.status === "approved" ? (
                                    <p className="bg-green-500 text-slate-950 p-4 rounded-2xl">
                                        {" "}
                                        Approved{" "}
                                    </p>
                                ) : (
                                    <p className="bg-yellow-300 text-slate-950 p-4 rounded-2xl">
                                        {" "}
                                        Pending{" "}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })

            ) : (<p className="p-4 bg-slate-100 text-black rounded-2xl">No trips yet, book a trip!</p>)}
        </div>
    );
}
