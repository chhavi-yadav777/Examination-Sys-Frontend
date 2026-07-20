import { useState, useEffect } from "react";
import api from "../../../api/axios";

function Results() {

  const [results, setResults] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [examResponse, resultResponse] = await Promise.all([
        api.get("/exams"),
        api.get("/results"),
      ]);
      setExams(examResponse.data);
      setResults(resultResponse.data);
    } catch (error) {
      alert("Unable to load results");
    }
  };

  const filteredResults = selectedExam
    ? results.filter(r => r.examId == selectedExam)
    : results;

  const passCount = filteredResults.filter(r => r.status === "Passed").length;
  const failCount = filteredResults.filter(r => r.status === "Failed").length;
  const avgScore = filteredResults.length > 0
    ? (filteredResults.reduce((sum, r) => sum + r.percentage, 0) / filteredResults.length).toFixed(2)
    : 0;

  const getStatusColor = (status) => {
    return status === "Passed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  return (
    <div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Exam Results</h1>
        <p className="text-gray-500 mt-1">View all student exam results and performance</p>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <label className="font-semibold mr-4">Filter by Exam:</label>
        <select
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">All Exams</option>
          {exams.map(exam => (
            <option key={exam.id} value={exam.id}>
              {exam.examName}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-500">Total Results</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">{filteredResults.length}</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-500">Passed</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">{passCount}</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <p className="text-gray-500">Failed</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">{failCount}</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <p className="text-gray-500">Avg Score</p>
          <h2 className="text-3xl font-bold text-purple-600 mt-2">{avgScore}%</h2>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">

        <table className="w-full">
          <thead className="bg-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Student Name</th>
              <th className="px-6 py-4 text-left font-semibold">Exam Name</th>
              <th className="px-6 py-4 text-left font-semibold">Date</th>
              <th className="px-6 py-4 text-left font-semibold">Score</th>
              <th className="px-6 py-4 text-left font-semibold">Percentage</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((result) => (
              <tr key={result.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{result.studentName}</td>
                <td className="px-6 py-4">{result.examName}</td>
                <td className="px-6 py-4">{new Date(result.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 font-semibold">{result.score}/{result.totalMarks}</td>
                <td className="px-6 py-4">
                  <span className="font-semibold">{result.percentage}%</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(result.status)}`}>
                    {result.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Results;
