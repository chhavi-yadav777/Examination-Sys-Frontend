import { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import api from "../../../api/axios";

function QuestionBank() {

  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState("");
  const [exams, setExams] = useState([]);

  const [questionData, setQuestionData] = useState({
    examId: "",
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "A",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [examResponse, questionResponse] = await Promise.all([
        api.get("/exams"),
        api.get("/questions"),
      ]);
      setExams(examResponse.data);
      setQuestions(questionResponse.data);
    } catch (error) {
      alert("Unable to load question bank");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!questionData.examId || !questionData.questionText || !questionData.optionA) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await api.post("/questions", questionData);
      await loadData();

      setQuestionData({
        examId: "",
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "A",
      });
      setOpen(false);
      alert("Question added successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Question could not be added");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this question?")) {
      await api.delete(`/questions/${id}`);
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const getExamName = (examId) => {
    if (typeof examId === "object") return examId.examName;
    return exams.find(e => e.id == examId)?.examName || "Unknown";
  };

  const filteredQuestions = selectedExam
    ? questions.filter(q => (typeof q.examId === "object" ? q.examId.id : q.examId) == selectedExam)
    : questions;

  return (
    <div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Question Bank</h1>
          <p className="text-gray-500 mt-1">Manage questions for your exams</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2"
        >
          <Plus size={20} /> Add Question
        </button>
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

      {/* Add Question Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto">

            <h2 className="text-2xl font-bold mb-6">Add New Question</h2>

            <div className="space-y-4">

              <div>
                <label className="block font-semibold mb-2">Select Exam *</label>
                <select
                  name="examId"
                  value={questionData.examId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Choose an exam</option>
                  {exams.map(exam => (
                    <option key={exam.id} value={exam.id}>
                      {exam.examName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">Question Text *</label>
                <textarea
                  name="questionText"
                  value={questionData.questionText}
                  onChange={handleChange}
                  placeholder="Enter question..."
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">Option A *</label>
                  <input
                    type="text"
                    name="optionA"
                    value={questionData.optionA}
                    onChange={handleChange}
                    placeholder="Option A"
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Option B</label>
                  <input
                    type="text"
                    name="optionB"
                    value={questionData.optionB}
                    onChange={handleChange}
                    placeholder="Option B"
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">Option C</label>
                  <input
                    type="text"
                    name="optionC"
                    value={questionData.optionC}
                    onChange={handleChange}
                    placeholder="Option C"
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Option D</label>
                  <input
                    type="text"
                    name="optionD"
                    value={questionData.optionD}
                    onChange={handleChange}
                    placeholder="Option D"
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2">Correct Answer *</label>
                <select
                  name="correctAnswer"
                  value={questionData.correctAnswer}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>

            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
              >
                Add Question
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 font-semibold"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <div key={question.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">

            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Exam:</strong> {getExamName(question.examId)}
                </p>
                <p className="font-semibold mb-4">{question.questionText}</p>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <label className="flex items-center gap-2">
                    <input type="radio" disabled checked={question.correctAnswer === "A"} /> {question.optionA}
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" disabled checked={question.correctAnswer === "B"} /> {question.optionB}
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" disabled checked={question.correctAnswer === "C"} /> {question.optionC}
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" disabled checked={question.correctAnswer === "D"} /> {question.optionD}
                  </label>
                </div>

                <p className="text-sm text-green-600 font-semibold">
                  Correct Answer: {question.correctAnswer}
                </p>
              </div>

              <button
                onClick={() => handleDelete(question.id)}
                className="text-red-600 hover:text-red-800 ml-4"
              >
                <Trash2 size={20} />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default QuestionBank;
