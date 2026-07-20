import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, FileText, History, LogOut } from "lucide-react";

function Sidebar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname.includes(path) ? "bg-blue-600 text-white" : "text-gray-700";
    };

    const handleLogout = () => {
        window.location.href = "/";
    };

    return (
        <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 flex flex-col">
            
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-blue-600">
                    ExamSys
                </h1>
                <p className="text-sm text-gray-500">Student Portal</p>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2">

                <Link to="/student/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition ${isActive("dashboard")}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>

                <Link to="/student/availableexams" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition ${isActive("availableexams")}`}>
                    <BookOpen size={20} />
                    <span>Available Exams</span>
                </Link>

                <Link to="/student/takeexam" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition ${isActive("takeexam")}`}>
                    <FileText size={20} />
                    <span>Take Exam</span>
                </Link>

                <Link to="/student/resulthistory" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition ${isActive("resulthistory")}`}>
                    <History size={20} />
                    <span>Result History</span>
                </Link>

            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-200">
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition font-semibold">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>

        </div>
    );
}

export default Sidebar;
