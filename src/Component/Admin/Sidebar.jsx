import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, HelpCircle, Users, BarChart3, LogOut } from "lucide-react";

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
                <p className="text-sm text-gray-500">Admin Panel</p>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2">

                <Link to="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition ${isActive("dashboard")}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>

                <Link to="/admin/exams" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition ${isActive("exams")}`}>
                    <BookOpen size={20} />
                    <span>Exams</span>
                </Link>

                <Link to="/admin/questionbank" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition ${isActive("questionbank")}`}>
                    <HelpCircle size={20} />
                    <span>Question Bank</span>
                </Link>

                <Link to="/admin/students" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition ${isActive("students")}`}>
                    <Users size={20} />
                    <span>Students</span>
                </Link>

                <Link to="/admin/results" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition ${isActive("results")}`}>
                    <BarChart3 size={20} />
                    <span>Results</span>
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
