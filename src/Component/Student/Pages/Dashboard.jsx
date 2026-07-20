import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, CheckCircle, TrendingUp } from "lucide-react";
import api from "../../../api/axios";

function Dashboard() {

    const navigate = useNavigate();
    const [stats, setStats] = useState({
        availableExams: 0,
        completedExams: 0,
        averageScore: 0,
        passedExams: 0
    });
    const [recentResults, setRecentResults] = useState([]);

    useEffect(() => {
        const currentStudent = JSON.parse(localStorage.getItem("currentStudent") || "null");
        const query = currentStudent?.id ? `?studentId=${currentStudent.id}` : "";

        api.get(`/stats/student${query}`)
            .then(({ data }) => {
                setStats(data.stats);
                setRecentResults(data.recentResults);
            })
            .catch(() => alert("Unable to load student dashboard"));
    }, []);

    return (
        <>
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 shadow-lg mb-8">
                <h1 className="text-4xl font-bold">
                    Welcome Back! 👋
                </h1>
                <p className="mt-2 text-lg">
                    Stay focused and keep improving your scores!
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600 hover:shadow-xl transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-semibold">Available Exams</p>
                            <h2 className="text-4xl font-bold text-blue-600 mt-2">
                                {stats.availableExams}
                            </h2>
                        </div>
                        <BookOpen size={40} className="text-blue-200" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600 hover:shadow-xl transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-semibold">Completed Exams</p>
                            <h2 className="text-4xl font-bold text-green-600 mt-2">
                                {stats.completedExams}
                            </h2>
                        </div>
                        <CheckCircle size={40} className="text-green-200" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600 hover:shadow-xl transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-semibold">Average Score</p>
                            <h2 className="text-4xl font-bold text-purple-600 mt-2">
                                {stats.averageScore}%
                            </h2>
                        </div>
                        <TrendingUp size={40} className="text-purple-200" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600 hover:shadow-xl transition">
                    <div>
                        <p className="text-gray-600 text-sm font-semibold">Passed Exams</p>
                        <h2 className="text-4xl font-bold text-red-600 mt-2">
                            {stats.passedExams}
                        </h2>
                        <p className="text-xs text-gray-500 mt-2">
                            Success Rate: {stats.completedExams > 0 ? Math.round((stats.passedExams / stats.completedExams) * 100) : 0}%
                        </p>
                    </div>
                </div>

            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Recent Results */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        📊 Recent Results
                    </h2>

                    {recentResults.length > 0 ? (
                        <div className="space-y-4">
                            {recentResults.map((result) => (
                                <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">

                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">
                                                {result.examName}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {new Date(result.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full font-semibold text-sm ${result.status === "Passed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                            {result.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                                <div
                                                    className={`h-2 rounded-full ${result.percentage >= 50 ? 'bg-green-600' : 'bg-red-600'}`}
                                                    style={{ width: `${result.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <span className="ml-4 font-bold text-lg">
                                            {result.score}/{result.totalMarks}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-600 mt-3">
                                        {result.correctAnswers} out of {result.totalQuestions} correct
                                    </p>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <p className="text-lg">No exam results yet.</p>
                            <p className="text-sm mt-2">Start taking exams to see your results!</p>
                        </div>
                    )}

                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-lg p-6">

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        ⚡ Quick Actions
                    </h2>

                    <button
                        onClick={() => navigate("/student/availableexams")}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-bold transition mb-3"
                    >
                        Take Exam
                    </button>

                    <button
                        onClick={() => navigate("/student/resulthistory")}
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-bold transition mb-3"
                    >
                        View All Results
                    </button>

                    {/* Tips Section */}
                    <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h3 className="font-bold text-blue-900 mb-3">💡 Study Tips</h3>
                        <ul className="space-y-2 text-sm text-blue-800">
                            <li>✓ Review questions before taking exam</li>
                            <li>✓ Manage your time wisely</li>
                            <li>✓ Focus on weak areas</li>
                            <li>✓ Practice regularly</li>
                        </ul>
                    </div>

                </div>

            </div>

        </>
    );
}

export default Dashboard;
