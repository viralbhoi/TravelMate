import DriverTrip from "../components/Driver/DriverTrip.jsx";
import DriverPackageDisplay from "../components/Driver/DriverPackageDisplay.jsx"
import DriverAlltrip from "../components/Driver/DriverAlltrip.jsx"
import Schedule from "../components/Driver/Schedule.jsx";

export default function DriverRouter() {
    const { loggedInUser } = useAppContext();

    return (
        <Routes>
            <Route
                path="schedule"
                element={
                    loggedInUser?.role === "driver" ? (
                        <Schedule />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="dashboard"
                element={
                    loggedInUser?.role === "driver" ? (
                        <DriverDashboard />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="pendingtrips"
                element={
                    loggedInUser?.role === "driver" ? (
                        <DriverTrip />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />

            <Route
                path="alltrips"
                element={
                    loggedInUser?.role === "driver" ? (
                        <DriverAlltrip />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />

            <Route
                path="packages"
                element={
                    loggedInUser?.role === "driver" ? (
                        <DriverPackageDisplay />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
        </Routes>
    );
}