import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg"; 
import api from "../../api/axios";


function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    role: "student",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const { data } = await api.post("/login", loginData);

      if (data.role === "admin") {
        localStorage.removeItem("currentStudent");
        navigate("/admin");
        return;
      }

      localStorage.setItem("currentStudent", JSON.stringify(data.student));
      navigate("/student");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div className="min-h-screen flex">

        {/* Left Side Image */}

        <div className="w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 flex flex-col justify-center items-center text-white">

    <img
        src={logo}
        alt="Online Examination"
        className="w-[70%]"
    />

    {/* <h1 className="text-4xl font-bold mt-8">
        Online Examination
    </h1>

    <h2 className="text-2xl font-semibold mt-2">
        Management System
    </h2> */}

    <p className="mt-6 text-lg">
        Secure • Fast • Reliable
    </p>

</div>

        {/* Right Side Login */}

        <div className="w-1/2 flex justify-center items-center bg-slate-100">

          <div className="bg-white w-430px rounded-xl shadow-xl p-8">

            <h1 className="text-3xl font-bold text-center text-blue-600">
              Online Examination
            </h1>

            <h2 className="text-xl font-semibold text-center mt-2">
              Management System
            </h2>

            <p className="text-center text-gray-500 mt-3">
              Welcome Back!
            </p>

            <p className="text-center text-gray-500 mb-6">
              Login to continue
            </p>

            {/* Role */}

            <div className="mb-5">

              <label className="font-semibold">
                Select Role
              </label>

              <div className="flex gap-8 mt-2">

                <label className="flex items-center cursor-pointer">

                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={loginData.role === "student"}
                    onChange={handleChange}
                  />

                  <span className="ml-2">
                    Student
                  </span>

                </label>

                <label className="flex items-center cursor-pointer">

                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={loginData.role === "admin"}
                    onChange={handleChange}
                  />

                  <span className="ml-2">
                    Admin
                  </span>

                </label>

              </div>

            </div>

            {/* Email */}

            <div className="mb-4">

              <label className="font-semibold">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-none focus:border-blue-500"
              />

            </div>

            {/* Password */}

            <div className="mb-6">

              <label className="font-semibold">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-none focus:border-blue-500"
              />

            </div>

            {/* Login Button */}

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>

            {/* Signup */}

            <p className="text-center mt-6">

              New Student?

              <Link
                to="/signup"
                className="text-blue-600 font-semibold ml-2 hover:underline"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>
    </>
  );
}

export default Login;
