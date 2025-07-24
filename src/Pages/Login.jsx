import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNotification } from "../context/NotificationContext";
import * as Yup from "yup";

export default function AdminLogin() {
    const { notifySuccess, notifyError } = useNotification();
    const [mode, setMode] = useState("login"); // login or signup
    const [role, setRole] = useState("user");
    const { admins, users, drivers, setUsers, setDrivers, setLoggedInUser } = useAppContext();
    const navigate = useNavigate();

    const loginSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().required("Required"),
    });

    const signupSchema = Yup.object({
        username: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
        vehicle: Yup.string().when("role", {
            is: "driver",
            then: Yup.string().required("Vehicle type required"),
        }),
    });

    const handleLogin = (values) => {
        const { email, password } = values;

        let tempUser =
            role === "admin"
                ? admins.find((u) => u.email === email)
                : role === "user"
                    ? users.find((u) => u.email === email)
                    : drivers.find((u) => u.email === email);

        if (!tempUser) return notifyError("User not found!");
        if (tempUser.password !== password) return notifyError("Incorrect password");

        setLoggedInUser({ email, role, password });
        navigate(`/${role}/dashboard`);
    };

    const handleSignup = (values) => {
        const { username, email, password, vehicle } = values;

        if (role === "user" && users.some((u) => u.email === email)) {
            return notifyError("User email already exists");
        }

        if (role === "driver" && drivers.some((u) => u.email === email)) {
            return notifyError("Driver email already exists");
        }

        const newUser = {
            id:
                role === "user"
                    ? users.length + 1
                    : drivers.length + 1,
            username,
            email,
            password,
            ...(role === "driver" && { vehicleType: vehicle }),
        };

        if (role === "user") setUsers((prev) => [...prev, newUser]);
        else setDrivers((prev) => [...prev, newUser]);

        notifySuccess("Signup successful! Redirecting to login...");
        setMode("login");
    };


    return (
        <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-200">

            <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{ mixBlendMode: "multiply", backgroundImage: "url('../../public/Login.jpg')" }}>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 sm:px-10">
                <button
                    className="absolute top-4 left-4 px-4 py-2 bg-black/70 text-white rounded-full hover:bg-black/90"
                    onClick={() => { navigate("/"); }}
                >
                    ← Back
                </button>

                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-blue-700">TravelMate Portal </h1>
                    <p className="text-gray-600 text-sm">Login or Sign up to continue</p>
                </div>

                <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-xl p-6">

                    <div className="flex mb-4">
                        <button
                            className={`flex-1 p-2 font-bold rounded-l-lg ${mode === "login" ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700"}`}
                            onClick={() => setMode("login")}
                        >
                            Login
                        </button>
                        <button
                            className={`flex-1 p-2 font-bold rounded-r-lg ${mode === "signup" ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700"}`}
                            onClick={() => {
                                setMode("signup");
                                setRole("user");
                            }}
                        >
                            Signup
                        </button>
                    </div>

                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                            username: "",
                            vehicle: "",
                            role,
                        }}
                        enableReinitialize
                        validationSchema={mode === "login" ? loginSchema : signupSchema}
                        onSubmit={(values) =>
                            mode === "login" ? handleLogin(values) : handleSignup(values)
                        }
                    >
                        {({ values, setFieldValue }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label className="font-medium">Role</label>
                                    <Field
                                        as="select"
                                        name="role"
                                        className="w-full mt-1 p-2 border rounded"
                                        onChange={(e) => {
                                            setRole(e.target.value);
                                            setFieldValue("role", e.target.value);
                                        }}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin" disabled={mode === "signup"}>Admin</option>
                                        <option value="driver">Driver</option>
                                    </Field>
                                </div>

                                {mode === "signup" && (
                                    <div>
                                        <label className="font-medium">Username</label>
                                        <Field
                                            type="text"
                                            name="username"
                                            className="w-full mt-1 p-2 border rounded"
                                        />
                                        <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                                    </div>
                                )}

                                <div>
                                    <label className="font-medium">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        className="w-full mt-1 p-2 border rounded"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <label className="font-medium">Password</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        className="w-full mt-1 p-2 border rounded"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                </div>

                                {mode === "signup" && values.role === "driver" && (
                                    <div>
                                        <label className="font-medium">Vehicle Type</label>
                                        <Field
                                            as="select"
                                            name="vehicle"
                                            className="w-full mt-1 p-2 border rounded"
                                        >
                                            <option value="">Select Vehicle</option>
                                            <option value="Bus">Bus</option>
                                            <option value="Car">Car</option>
                                            <option value="Van">Van</option>
                                        </Field>
                                        <ErrorMessage name="vehicle" component="div" className="text-red-500 text-sm" />
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
                                >
                                    {mode === "login" ? "Login" : "Signup"}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    {/* Dummy credentials */}
                    {mode === "login" && (
                        <div className="mt-6 text-sm text-gray-700">
                            <h4 className="font-semibold underline mb-2">Try these:</h4>
                            {role === "admin" && (
                                <>
                                    <p>Email: admin@example.com</p>
                                    <p>Password: Admin@123</p>
                                </>
                            )}
                            {role === "user" && (
                                <>
                                    <p>Email: Alice@example.com / Bob@example.com</p>
                                    <p>Password: Alice@123 / Bob@123</p>
                                </>
                            )}
                            {role === "driver" && (
                                <>
                                    <p>Email: A@example.com / B@example.com / C@example.com</p>
                                    <p>Password: Aaa@123 / Bbb@456 / Ccc@789</p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

