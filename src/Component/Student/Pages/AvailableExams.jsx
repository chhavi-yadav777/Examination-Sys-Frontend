import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Calendar, BookOpen } from "lucide-react";
import api from "../../../api/axios";

function AvailableExams() {

    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [studentResults, setStudentResults] = useState([]);

    useEffect(() => {
        const currentStudent = JSON.parse(localStorage.getItem("currentStudent") || "null");
        const resultQuery = currentStudent?.id ? `?studentId=${currentStudent.id}` : "";

        Promise.all([api.get("/exams"), api.get(`/results${resultQuery}`)])
            .then(([examResponse, resultResponse]) => {
                setExams(examResponse.data);
                setStudentResults(resultResponse.data);
            })
            .catch(() => alert("Unable to load available exams"));
    }, []);

    const hasAttempted = (examId) => {
        return studentResults.some(r => r.examId == examId);
    };

    const getResult = (examId) => {
        return studentResults.find(r => r.examId == examId);
    };

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Available Exams</h1>
                <p className="text-gray-500 mt-1">Browse and take exams assigned to you</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {exams.map((exam) => {
                    const result = getResult(exam.id);
                    const attempted = hasAttempted(exam.id);
                    const examDate = new Date(exam.date + " " + exam.time);
                    const isUpcoming = examDate > new Date();

                    return (
                        <div
                            key={exam.id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden border-l-4 border-blue-600 hover:shadow-xl transition"
                        >

                            <div className="p-6">

                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-blue-700">
                                            {exam.examName}
                                        </h2>
                                        <p className="text-gray-600 mt-1">{exam.subject}</p>
                                    </div>
                                    {attempted && (
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                                            ✓ Attempted
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">

                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Calendar size={18} className="text-blue-600" />
                                        <span>{new Date(exam.date).toLocaleDateString()}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Clock size={18} className="text-blue-600" />
                                        <span>{exam.time} - Duration: {exam.duration} minutes</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-700">
                                        <BookOpen size={18} className="text-blue-600" />
                                        <span>Total Marks: {exam.totalMarks}</span>
                                    </div>

                                </div>

                                {exam.description && (
                                    <p className="text-gray-600 text-sm mb-4">
                                        <strong>Description:</strong> {exam.description}
                                    </p>
                                )}

                                {attempted ? (
                                    <div className="bg-green-50 rounded-lg p-4 mb-4">
                                        <p className="text-sm font-semibold text-green-800">
                                            Score: {result.score}/{result.totalMarks} ({result.percentage}%)
                                        </p>
                                        <p className="text-sm text-green-700 mt-1">
                                            Completed on: {new Date(result.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                ) : null}

                                {!attempted && (
                                    <button
                                        onClick={() => navigate("/student/takeexam", { state: { exam } })}
                                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
                                    >
                                        Start Exam
                                    </button>
                                )}

                                {attempted && !isUpcoming && (
                                    <button
                                        onClick={() => navigate("/student/takeexam", { state: { exam } })}
                                        className="w-full bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
                                        disabled
                                    >
                                        Already Completed
                                    </button>
                                )}

                            </div>

                        </div>
                    );
                })}

            </div>

        </>
    );
}

export default AvailableExams;
