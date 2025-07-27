import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNotification } from "../context/NotificationContext";
import * as Yup from "yup";

import { useLoginContext } from "../context/LoginContext";
import { useUserContext } from "../context/UserContext";
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export default function AdminLogin() {
    // cotxt requ.
    const { notifySuccess, notifyError } = useNotification();
    const {login,setUserRole} =useLoginContext();
    const {setUserProfile} = useUserContext();

    const [mode, setMode] = useState("login");
    const [role, setRole] = useState("user");
    const [step, setStep] = useState(1); 

    const navigate = useNavigate();

    const loginSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().required("Required"),
    });

    const signupSchemaStep1 = Yup.object({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
        phone: Yup.string().required("Required"),
        gender: Yup.string().required("Required"),
        area: Yup.string().required("Required"),
    });

    const vehicleSchema = Yup.object({
        vehicle: Yup.object().shape({
            model: Yup.string().required("Required"),
            licenseNumber: Yup.string().required("Required"),
            color: Yup.string().required("Required"),
        }),
    });
    
    const handleLogin = async (values) => {
        const { email, password } = values;

        try {
            const res = await fetch(`${BASE_URL}/api/${role}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                return notifyError(data.message || "Login failed");
            }

            
            navigate(`/${role}/dashboard`);
            login(data?.token);
            setUserProfile(data?.user);
            setUserRole(role);


            notifySuccess("Login successful!");

        } catch (err) {
            notifyError();
            console.error(err);

        }
    };

    const handleSignup = async (values) => {
        try {
            console.log(values)
            const res = await fetch(`${BASE_URL}/api/${role}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (!res.ok) {
                return notifyError(data.message || "Signup failed");
            }

            notifySuccess("Signup successful! Redirecting to login...");
            setMode("login");
            setStep(1);
        } catch (err) {
            notifyError("Something went wrong during signup.");
            console.error(err);
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-200 ">
            <div
                className="hidden md:flex w-1/2 bg-cover bg-center"
                style={{ mixBlendMode: "multiply", backgroundImage: "url('../../public/Login.jpg')" }}
            ></div>

            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 sm:px-10">
                <button
                    className="absolute top-4 left-4 px-4 py-2 bg-black/70 text-white rounded-full hover:bg-black/90"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    ← Back
                </button>

                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-blue-700">TravelMate Portal</h1>
                    <p className="text-gray-600 text-sm">Login or Sign up to continue</p>
                </div>

                <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-xl p-6">
                    <div className="flex mb-4">
                        <button
                            className={`flex-1 p-2 font-bold rounded-l-lg ${mode === "login" ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700"}`}
                            onClick={() => {
                                setMode("login");
                                setStep(1);
                            }}
                        >
                            Login
                        </button>
                        <button
                            className={`flex-1 p-2 font-bold rounded-r-lg ${mode === "signup" ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700"}`}
                            onClick={() => {
                                setMode("signup");
                                setRole("user");
                                setStep(1);
                            }}
                        >
                            Signup
                        </button>
                    </div>

                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",
                            phone: "",
                            gender: "",
                            area: "",
                            vehicle: {
                                model: "",
                                licenseNumber: "",
                                color: "",
                            },
                            role,
                        }}
                        enableReinitialize
                        validationSchema={
                            mode === "login"
                                ? loginSchema
                                : role === "driver" && step === 2
                                    ? vehicleSchema
                                    : signupSchemaStep1
                        }
                        onSubmit={(values) => {
                            if (mode === "login") {
                                handleLogin(values);
                            } else {
                                if (role === "driver" && step === 1) {
                                    setStep(2); // go to vehicle form
                                } else {
                                    handleSignup(values);
                                }
                            }
                        }}
                    >
                        {({ values, setFieldValue }) => (
                            <Form className="space-y-4 overflow-y-auto  max-h-[400px]">
                                {mode === "signup" && step === 1 && (
                                    <>
                                        <div>
                                            <label className="font-medium">Role</label>
                                            <Field
                                                as="select"
                                                name="role"
                                                className="w-full mt-1 p-2 border rounded"
                                                onChange={(e) => {
                                                    setRole(e.target.value);
                                                    setFieldValue("role", e.target.value);
                                                    setStep(1); // reset step if role changes
                                                }}
                                            >
                                                <option value="user">User</option>
                                                <option value="admin" disabled>Admin</option>
                                                <option value="driver">Driver</option>
                                            </Field>
                                        </div>

                                        <div>
                                            <label className="font-medium">name</label>
                                            <Field type="text" name="name" className="w-full mt-1 p-2 border rounded" />
                                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                        </div>

                                        <div>
                                            <label className="font-medium">Email</label>
                                            <Field type="email" name="email" className="w-full mt-1 p-2 border rounded" />
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                        </div>

                                        <div>
                                            <label className="font-medium">Password</label>
                                            <Field type="password" name="password" className="w-full mt-1 p-2 border rounded" />
                                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                        </div>

                                        <div>
                                            <label className="font-medium">Phone</label>
                                            <Field type="text" name="phone" className="w-full mt-1 p-2 border rounded" />
                                            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                                        </div>

                                        <div>
                                            <label className="font-medium">Gender</label>
                                            <Field as="select" name="gender" className="w-full mt-1 p-2 border rounded">
                                                <option value="">Select</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </Field>
                                            <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
                                        </div>

                                        <div>
                                            <label className="font-medium">Area</label>
                                            <Field type="text" name="area" className="w-full mt-1 p-2 border rounded" />
                                            <ErrorMessage name="area" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    </>
                                )}

                                {mode === "signup" && role === "driver" && step === 2 && (
                                    <>
                                        <h2 className="font-bold text-lg text-blue-700">Vehicle Information</h2>

                                        <div>
                                            <label className="font-medium">Vehicle Model</label>
                                            <Field type="text" name="vehicle.model" className="w-full mt-1 p-2 border rounded" />
                                            <ErrorMessage name="vehicle.model" component="div" className="text-red-500 text-sm" />
                                        </div>

                                        <div>
                                            <label className="font-medium">License Number</label>
                                            <Field type="text" name="vehicle.licenseNumber" className="w-full mt-1 p-2 border rounded" />
                                            <ErrorMessage name="vehicle.licenseNumber" component="div" className="text-red-500 text-sm" />
                                        </div>

                                        <div>
                                            <label className="font-medium">Vehicle Color</label>
                                            <Field type="text" name="vehicle.color" className="w-full mt-1 p-2 border rounded" />
                                            <ErrorMessage name="vehicle.color" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    </>
                                )}

                                {mode === "login" && (
                                    <>
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
                                                <option value="admin">Admin</option>
                                                <option value="driver">Driver</option>
                                            </Field>
                                        </div>

                                        <div>
                                            <label className="font-medium">Email</label>
                                            <Field type="email" name="email" className="w-full mt-1 p-2 border rounded" />
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                        </div>

                                        <div>
                                            <label className="font-medium">Password</label>
                                            <Field type="password" name="password" className="w-full mt-1 p-2 border rounded" />
                                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    </>
                                )}

                                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all">
                                    {mode === "login" ? "Login" : step === 2 ? "Submit" : "Next"}
                                </button>
                            </Form>
                        )}
                    </Formik>

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