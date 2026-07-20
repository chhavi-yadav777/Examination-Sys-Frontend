import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";

function Dashboard() {

    const navigate = useNavigate();
    const [stats, setStats] = useState({
        students: 0,
        exams: 0,
        questions: 0,
        results: 0
    });
    const [upcomingExams, setUpcomingExams] = useState([]);
    const [recentResults, setRecentResults] = useState([]);

    useEffect(() => {
        api.get("/stats/admin")
            .then(({ data }) => {
                setStats(data.stats);
                setUpcomingExams(data.upcomingExams);
                setRecentResults(data.recentResults);
            })
            .catch(() => alert("Unable to load admin dashboard"));
    }, []);

    const passRate = stats.results > 0
        ? ((recentResults.filter(r => r.status === "Passed").length / stats.results) * 100).toFixed(1)
        : 0;

    return (
        <>
            {/* Welcome */}

            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-xl p-8 shadow-lg">

                <h1 className="text-4xl font-bold">
                    Welcome Admin 👋
                </h1>

                <p className="mt-2 text-lg">
                    Manage exams, students and results from one place.
                </p>

            </div>

            {/* Dashboard Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-8 border-blue-600 hover:shadow-xl transition">

                    <p className="text-gray-500 text-lg">
                        Registered Students
                    </p>

                    <h2 className="text-4xl font-bold text-blue-700 mt-4">
                        {stats.students}
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">Active users</p>

                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-8 border-green-600 hover:shadow-xl transition">

                    <p className="text-gray-500 text-lg">
                        Total Exams
                    </p>

                    <h2 className="text-4xl font-bold text-green-700 mt-4">
                        {stats.exams}
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">Exams created</p>

                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-8 border-purple-600 hover:shadow-xl transition">

                    <p className="text-gray-500 text-lg">
                        Question Bank
                    </p>

                    <h2 className="text-4xl font-bold text-purple-700 mt-4">
                        {stats.questions}
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">Total questions</p>

                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border-l-8 border-red-500 hover:shadow-xl transition">

                    <p className="text-gray-500 text-lg">
                        Results Published
                    </p>

                    <h2 className="text-4xl font-bold text-red-600 mt-4">
                        {stats.results}
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">Pass Rate: {passRate}%</p>

                </div>

            </div>

            {/* Lower Section */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

                {/* Upcoming Exams */}

                <div className="bg-white rounded-xl shadow-lg p-6">

                    <h2 className="text-2xl font-bold text-blue-700 mb-5">
                        📅 Upcoming Exams
                    </h2>

                    <div className="space-y-4">

                        {upcomingExams.length > 0 ? (
                            upcomingExams.map((exam) => (
                                <div key={exam.id} className="border rounded-lg p-4 hover:bg-blue-50 transition">

                                    <h3 className="font-semibold text-gray-800">
                                        {exam.examName}
                                    </h3>

                                    <p className="text-sm text-gray-600 mt-1">
                                        {new Date(exam.date).toLocaleDateString()} | {exam.time}
                                    </p>

                                    <p className="text-xs text-gray-500 mt-2">
                                        Duration: {exam.duration} mins | Marks: {exam.totalMarks}
                                    </p>

                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-6">No upcoming exams</p>
                        )}

                    </div>

                </div>

                {/* Recent Results */}

                <div className="bg-white rounded-xl shadow-lg p-6">

                    <h2 className="text-2xl font-bold text-green-700 mb-5">
                        📊 Recent Results
                    </h2>

                    <div className="space-y-3">

                        {recentResults.length > 0 ? (
                            recentResults.map((result) => (
                                <div key={result.id} className="border rounded-lg p-3 hover:bg-green-50 transition">

                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-gray-800 text-sm">
                                                {result.studentName}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {result.examName}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${result.status === "Passed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                            {result.percentage}%
                                        </span>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-6">No results yet</p>
                        )}

                    </div>

                </div>

            </div>

            {/* Quick Actions */}

            <div className="bg-white rounded-xl shadow-lg mt-10 p-6">

                <h2 className="text-2xl font-bold mb-6">
                    ⚡ Quick Actions
                </h2>

                <div className="flex flex-wrap gap-4">

                    <button
                        onClick={() => navigate("/admin/exams")}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
                    >
                        + Create Exam
                    </button>

                    <button
                        onClick={() => navigate("/admin/questionbank")}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold transition"
                    >
                        + Add Questions
                    </button>

                    <button
                        onClick={() => navigate("/admin/students")}
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold transition"
                    >
                        View Students
                    </button>

                    <button
                        onClick={() => navigate("/admin/results")}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold transition"
                    >
                        View Results
                    </button>

                </div>

            </div>

        </>
    );
}

export default Dashboard;
