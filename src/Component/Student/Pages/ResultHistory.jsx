import { useEffect, useState } from "react";
import { TrendingUp, BarChart3 } from "lucide-react";
import api from "../../../api/axios";

function ResultHistory() {

    const [results, setResults] = useState([]);

    useEffect(() => {
        const currentStudent = JSON.parse(localStorage.getItem("currentStudent") || "null");
        const query = currentStudent?.id ? `?studentId=${currentStudent.id}` : "";

        api.get(`/results${query}`)
            .then(({ data }) => setResults(data))
            .catch(() => alert("Unable to load result history"));
    }, []);

    const passedExams = results.filter(r => r.status === "Passed").length;
    const failedExams = results.filter(r => r.status === "Failed").length;
    const avgScore = results.length > 0
        ? (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(2)
        : 0;

    const getStatusColor = (status) => {
        return status === "Passed"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800";
    };

    const getStatusIcon = (status) => {
        return status === "Passed" ? "✓" : "✗";
    };

    return (
        <>

            <div className="mb-8">
                <h1 className="text-3xl font-bold">Result History</h1>
                <p className="text-gray-500 mt-1">View all your exam results and performance metrics</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                    <p className="text-gray-500">Total Exams</p>
                    <h2 className="text-3xl font-bold text-blue-600 mt-2">{results.length}</h2>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                    <p className="text-gray-500">Passed</p>
                    <h2 className="text-3xl font-bold text-green-600 mt-2">{passedExams}</h2>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                    <p className="text-gray-500">Failed</p>
                    <h2 className="text-3xl font-bold text-red-600 mt-2">{failedExams}</h2>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
                    <p className="text-gray-500">Average Score</p>
                    <h2 className="text-3xl font-bold text-purple-600 mt-2">{avgScore}%</h2>
                </div>

            </div>

            {/* Results Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100 border-b-2 border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left font-semibold">Exam Name</th>
                            <th className="px-6 py-4 text-left font-semibold">Date</th>
                            <th className="px-6 py-4 text-left font-semibold">Score</th>
                            <th className="px-6 py-4 text-left font-semibold">Percentage</th>
                            <th className="px-6 py-4 text-left font-semibold">Status</th>
                            <th className="px-6 py-4 text-left font-semibold">Accuracy</th>
                        </tr>
                    </thead>

                    <tbody>
                        {results.map((result) => (
                            <tr key={result.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-semibold">{result.examName}</td>
                                <td className="px-6 py-4">{new Date(result.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 font-bold text-blue-600">{result.score}/{result.totalMarks}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${result.percentage >= 50 ? 'bg-green-600' : 'bg-red-600'}`}
                                                style={{ width: `${result.percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="font-semibold">{result.percentage}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 w-fit ${getStatusColor(result.status)}`}>
                                        {getStatusIcon(result.status)} {result.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {result.correctAnswers}/{result.totalQuestions} Correct
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

            {/* Performance Summary */}
            {results.length > 0 && (
                <div className="grid grid-cols-2 gap-6 mt-8">

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <TrendingUp size={24} className="text-blue-600" />
                            <h3 className="text-xl font-bold">Performance Trend</h3>
                        </div>

                        <div className="space-y-4">
                            {results.map((result, idx) => (
                                <div key={result.id}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-semibold">{result.examName}</span>
                                        <span className="text-sm text-gray-600">{result.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${result.percentage >= 50 ? 'bg-green-500' : 'bg-red-500'}`}
                                            style={{ width: `${result.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <BarChart3 size={24} className="text-blue-600" />
                            <h3 className="text-xl font-bold">Summary Statistics</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b">
                                <span className="font-semibold">Highest Score:</span>
                                <span className="text-lg font-bold text-green-600">
                                    {Math.max(...results.map(r => r.percentage))}%
                                </span>
                            </div>

                            <div className="flex justify-between items-center pb-2 border-b">
                                <span className="font-semibold">Lowest Score:</span>
                                <span className="text-lg font-bold text-red-600">
                                    {Math.min(...results.map(r => r.percentage))}%
                                </span>
                            </div>

                            <div className="flex justify-between items-center pb-2 border-b">
                                <span className="font-semibold">Success Rate:</span>
                                <span className="text-lg font-bold text-blue-600">
                                    {((passedExams / results.length) * 100).toFixed(0)}%
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Avg Performance:</span>
                                <span className="text-lg font-bold text-purple-600">
                                    {avgScore}%
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {results.length === 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
                    <p className="text-blue-800 font-semibold">No exam results yet.</p>
                    <p className="text-blue-600 mt-1">Complete exams to see your results here.</p>
                </div>
            )}

        </>
    );
}

export default ResultHistory;
