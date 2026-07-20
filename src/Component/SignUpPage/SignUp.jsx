import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import api from "../../api/axios";

function SignUp() {

    const navigate = useNavigate();

    const [studentData, setStudentData] = useState({
        name: "",
        email: "",
        phone: "",
        course: "MCA",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setStudentData({
            ...studentData,
            [name]: value,
        });
    };

    const handleRegister = async () => {
    if(studentData.password !== studentData.confirmPassword){
        alert("Passwords do not match");
        return;
    }

    try {
        const { confirmPassword, ...payload } = studentData;
        await api.post("/auth/signup", payload);
        alert("Registration Successful!");
        navigate("/");
    } catch (error) {
        alert(error.response?.data?.message || "Registration failed");
    }
}

    return (
        <>
            <div className="min-h-screen flex">

                {/* Left Side */}

                <div className="w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 flex flex-col justify-center items-center text-white">

                    <img
                        src={logo}
                        alt="Logo"
                        className="w-[70%]"
                    />

                    <h1 className="text-4xl font-bold mt-8">
                        Online Examination
                    </h1>

                    <h2 className="text-2xl font-semibold mt-2">
                        Management System
                    </h2>

                    <p className="mt-6 text-lg">
                        Secure • Fast • Reliable
                    </p>

                </div>

                {/* Right Side */}

                <div className="w-1/2 flex justify-center items-center bg-slate-100">

                    <div className="bg-white w-450px rounded-xl shadow-xl p-8">

                        <h1 className="text-3xl font-bold text-center text-blue-700">
                            Student Registration
                        </h1>

                        <p className="text-center text-gray-500 mt-2 mb-6">
                            Create your account
                        </p>

                        {/* Name */}

                        <div className="mb-4">

                            <label className="font-semibold">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={studentData.name}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2 mt-1"
                            />

                        </div>

                        {/* Email */}

                        <div className="mb-4">

                            <label className="font-semibold">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={studentData.email}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2 mt-1"
                            />

                        </div>

                        {/* Phone */}

                        <div className="mb-4">

                            <label className="font-semibold">
                                Phone Number
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={studentData.phone}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2 mt-1"
                            />

                        </div>

                        {/* Course */}

                        <div className="mb-4">

                            <label className="font-semibold">
                                Course / Department
                            </label>

                            <input
                                type="text"
                                name="course"
                                value={studentData.course}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2 mt-1"
                            />

                        </div>

                        {/* Password */}

                        <div className="mb-4">

                            <label className="font-semibold">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={studentData.password}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2 mt-1"
                            />

                        </div>

                        {/* Confirm Password */}

                        <div className="mb-6">

                            <label className="font-semibold">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                value={studentData.confirmPassword}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2 mt-1"
                            />

                        </div>

                        {/* Register Button */}

                        <button
                            onClick={handleRegister}
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        >
                            Register
                        </button>

                        <p className="text-center mt-6">

                            Already have an account?

                            <Link
                                to="/"
                                className="text-blue-600 font-semibold ml-2 hover:underline"
                            >
                                Login
                            </Link>

                        </p>

                    </div>

                </div>

            </div>
        </>
    );
}

export default SignUp;
