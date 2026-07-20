import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Clock, AlertCircle } from "lucide-react";
import api from "../../../api/axios";

function TakeExam() {
    const location = useLocation();
    const navigate = useNavigate();
    const exam = location.state?.exam;

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!exam) {
            navigate("/student/availableexams");
            return;
        }

        api.get(`/questions?examId=${exam.id}`)
            .then(({ data }) => {
                setQuestions(data);
                setTimeLeft(Number(exam.duration || 60) * 60);
            })
            .catch(() => alert("Unable to load exam questions"))
            .finally(() => setLoading(false));
    }, [exam, navigate]);

    useEffect(() => {
        if (!exam || isSubmitted || loading) return;
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isSubmitted, loading, exam]);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers({
            ...answers,
            [questionId]: answer
        });
    };

    const handleSubmit = async () => {
        if (isSubmitted || questions.length === 0) return;

        try {
            const currentStudent = JSON.parse(localStorage.getItem("currentStudent") || "null");
            const { data } = await api.post("/results/submit", {
                examId: exam.id,
                answers,
                studentId: currentStudent?.id,
                studentName: currentStudent?.name || "Current Student",
            });

            setResult(data);
            setIsSubmitted(true);
        } catch (error) {
            alert(error.response?.data?.message || "Unable to submit exam");
        }
    };

    const formatTime = (seconds) => {
        const safeSeconds = Math.max(seconds, 0);
        const mins = Math.floor(safeSeconds / 60);
        const secs = safeSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    if (!exam) {
        return <div className="text-center py-10 text-gray-500">Loading exam...</div>;
    }

    if (loading) {
        return <div className="text-center py-10 text-gray-500">Loading questions...</div>;
    }

    if (questions.length === 0) {
        return <div className="text-center py-10 text-gray-500">No questions added for this exam yet.</div>;
    }

    if (isSubmitted && result) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <div className="text-center mb-8">
                        <div className={`text-6xl font-bold mb-4 ${result.percentage >= 40 ? "text-green-600" : "text-red-600"}`}>
                            {result.percentage}%
                        </div>
                        <h1 className="text-3xl font-bold mb-2">
                            {result.percentage >= 40 ? "Congratulations!" : "Try Again"}
                        </h1>
                        <p className={`text-xl ${result.percentage >= 40 ? "text-green-600" : "text-red-600"}`}>
                            {result.percentage >= 40 ? "You have passed!" : "You did not pass this exam."}
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                        <div className="grid grid-cols-3 gap-4 text-center mb-4">
                            <div>
                                <p className="text-gray-600 text-sm">Your Score</p>
                                <p className="text-2xl font-bold text-blue-600">{result.score}/{result.totalMarks}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Correct Answers</p>
                                <p className="text-2xl font-bold text-green-600">{result.correctAnswers}/{result.totalQuestions}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Passing Grade</p>
                                <p className="text-2xl font-bold">40%</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/student/availableexams")}
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                    >
                        Back to Exams
                    </button>
                </div>
            </div>
        );
    }

    const question = questions[currentQuestion];
    const answerOptions = [
        { key: "A", value: question.optionA },
        { key: "B", value: question.optionB },
        { key: "C", value: question.optionC },
        { key: "D", value: question.optionD }
    ];

    return (
        <div>
            <div className="bg-blue-600 text-white p-6 rounded-lg mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">{exam.examName}</h1>
                    <p className="mt-1">Question {currentQuestion + 1} of {questions.length}</p>
                </div>
                <div className="flex items-center gap-2 text-2xl font-bold">
                    <Clock size={28} />
                    {formatTime(timeLeft)}
                </div>
            </div>

            {timeLeft < 300 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-6 flex items-start gap-3">
                    <AlertCircle size={20} className="text-yellow-600 mt-1" />
                    <div>
                        <p className="font-bold text-yellow-800">Time Warning!</p>
                        <p className="text-yellow-700 text-sm">You have {formatTime(timeLeft)} remaining.</p>
                    </div>
                </div>
            )}

            <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6">{question.questionText}</h2>

                    <div className="space-y-4">
                        {answerOptions.map((option) => (
                            <label
                                key={option.key}
                                className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="answer"
                                    value={option.key}
                                    checked={answers[question.id] === option.key}
                                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                    className="w-5 h-5 text-blue-600"
                                />
                                <span className="ml-4 font-semibold">{option.key}. {option.value}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <button
                        onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                        disabled={currentQuestion === 0}
                        className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50 font-semibold"
                    >
                        Previous
                    </button>

                    <div className="text-center">
                        <p className="text-gray-600">Answered: {Object.keys(answers).length} / {questions.length}</p>
                    </div>

                    {currentQuestion === questions.length - 1 ? (
                        <button
                            onClick={handleSubmit}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold"
                        >
                            Submit Exam
                        </button>
                    ) : (
                        <button
                            onClick={() => setCurrentQuestion(currentQuestion + 1)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="font-bold mb-4">Questions:</h3>
                <div className="grid grid-cols-10 gap-2">
                    {questions.map((q, idx) => (
                        <button
                            key={q.id}
                            onClick={() => setCurrentQuestion(idx)}
                            className={`w-10 h-10 rounded font-semibold transition ${
                                currentQuestion === idx
                                    ? "bg-blue-600 text-white"
                                    : answers[q.id]
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TakeExam;
