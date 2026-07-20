import { useState, useEffect } from "react";
import { Trash2, Eye } from "lucide-react";
import api from "../../../api/axios";

function Exams() {

  const [open, setOpen] = useState(false);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);

  const [examData, setExamData] = useState({
    examName: "",
    subject: "",
    date: "",
    time: "",
    duration: "",
    totalMarks: "",
    description: "",
  });

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const { data } = await api.get("/exams");
      setExams(data);
    } catch (error) {
      alert("Unable to load exams");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData({
      ...examData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!examData.examName || !examData.subject || !examData.date) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const { data } = await api.post("/exams", examData);
      setExams([...exams, data]);

      setExamData({
        examName: "",
        subject: "",
        date: "",
        time: "",
        duration: "",
        totalMarks: "",
        description: "",
      });
      setOpen(false);
      alert("Exam created successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Exam could not be created");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      await api.delete(`/exams/${id}`);
      setExams(exams.filter(exam => exam.id !== id));
      alert("Exam deleted!");
    }
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Exam Management</h1>
          <p className="text-gray-500 mt-1">Manage all exams for your institution</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
        >
          + Create Exam
        </button>
      </div>

      {/* Create Exam Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">

            <h2 className="text-2xl font-bold mb-4">Create New Exam</h2>

            <div className="space-y-4">

              <div>
                <label className="block font-semibold mb-2">Exam Name *</label>
                <input
                  type="text"
                  name="examName"
                  value={examData.examName}
                  onChange={handleChange}
                  placeholder="e.g., Mathematics Mid-Term"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={examData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Mathematics"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={examData.date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={examData.time}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">Duration (mins)</label>
                  <input
                    type="number"
                    name="duration"
                    value={examData.duration}
                    onChange={handleChange}
                    placeholder="60"
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Total Marks</label>
                  <input
                    type="number"
                    name="totalMarks"
                    value={examData.totalMarks}
                    onChange={handleChange}
                    placeholder="100"
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={examData.description}
                  onChange={handleChange}
                  placeholder="Exam description..."
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  rows="3"
                />
              </div>

            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
              >
                Create Exam
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

      {/* Exams Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">

        <table className="w-full">
          <thead className="bg-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Exam Name</th>
              <th className="px-6 py-4 text-left font-semibold">Subject</th>
              <th className="px-6 py-4 text-left font-semibold">Date</th>
              <th className="px-6 py-4 text-left font-semibold">Duration</th>
              <th className="px-6 py-4 text-left font-semibold">Marks</th>
              <th className="px-6 py-4 text-left font-semibold">Attempts</th>
              <th className="px-6 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{exam.examName}</td>
                <td className="px-6 py-4">{exam.subject}</td>
                <td className="px-6 py-4">{new Date(exam.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">{exam.duration} min</td>
                <td className="px-6 py-4">{exam.totalMarks}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {exam.attempts}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => setSelectedExam(exam)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(exam.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* Exam Details Modal */}
      {selectedExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">

            <h2 className="text-2xl font-bold mb-4">{selectedExam.examName}</h2>

            <div className="space-y-3 mb-6">
              <p><strong>Subject:</strong> {selectedExam.subject}</p>
              <p><strong>Date:</strong> {new Date(selectedExam.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {selectedExam.time}</p>
              <p><strong>Duration:</strong> {selectedExam.duration} minutes</p>
              <p><strong>Total Marks:</strong> {selectedExam.totalMarks}</p>
              <p><strong>Total Attempts:</strong> {selectedExam.attempts}</p>
              {selectedExam.description && <p><strong>Description:</strong> {selectedExam.description}</p>}
            </div>

            <button
              onClick={() => setSelectedExam(null)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Exams;
