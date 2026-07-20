import { Outlet, useNavigate } from "react-router-dom";

function StudentPanel() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("currentStudent");

        navigate("/");

    };

    return (
        <>
            <div className="min-h-screen bg-slate-100">

                {/* Navbar */}

                <div className="bg-blue-700 text-white flex justify-between items-center px-8 py-4 shadow-md">

                    <h1 className="text-2xl font-bold">
                        Online Examination System
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>

                </div>

                {/* Main Section */}

                <div className="flex">

                    {/* Sidebar */}

                    <div className="w-64 bg-white min-h-screen shadow-lg">

                        <h2 className="text-xl font-bold text-center py-6 border-b">
                            Student Panel
                        </h2>

                        <div className="flex flex-col p-4 gap-3">

                            <button
                                onClick={() => navigate("/student/dashboard")}
                                className="text-left px-4 py-3 rounded hover:bg-blue-100"
                            >
                                🏠 Dashboard
                            </button>

                            <button
                                onClick={() => navigate("/student/availableexams")}
                                className="text-left px-4 py-3 rounded hover:bg-blue-100"
                            >
                                📝 Available Exams
                            </button>

                            <button
                                onClick={() => navigate("/student/takeexam")}
                                className="text-left px-4 py-3 rounded hover:bg-blue-100"
                            >
                                ✍️ Take Exam
                            </button>

                            <button
                                onClick={() => navigate("/student/resulthistory")}
                                className="text-left px-4 py-3 rounded hover:bg-blue-100"
                            >
                                📊 Result History
                            </button>

                        </div>

                    </div>

                    {/* Page Content */}

                    <div className="flex-1 p-8">

                        <Outlet />

                    </div>

                </div>

            </div>
        </>
    );
}

export default StudentPanel;