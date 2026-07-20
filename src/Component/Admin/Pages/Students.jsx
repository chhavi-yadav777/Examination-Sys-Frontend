import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import api from "../../../api/axios";

function Students() {

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const { data } = await api.get("/students");
      setStudents(data);
    } catch (error) {
      alert("Unable to load students");
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      await api.delete(`/students/${id}`);
      setStudents(students.filter(s => s.id !== id));
    }
  };

  return (
    <div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Students Management</h1>
        <p className="text-gray-500 mt-1">View and manage all registered students</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-500">Total Students</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">{students.length}</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-500">Active Students</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">{students.length}</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <p className="text-gray-500">Avg Exams Attempted</p>
          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            {students.length ? (students.reduce((sum, s) => sum + s.examsAttempted, 0) / students.length).toFixed(1) : "0.0"}
          </h2>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">

        <table className="w-full">
          <thead className="bg-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Name</th>
              <th className="px-6 py-4 text-left font-semibold">Email</th>
              <th className="px-6 py-4 text-left font-semibold">Phone</th>
              <th className="px-6 py-4 text-left font-semibold">Course</th>
              <th className="px-6 py-4 text-left font-semibold">Registered</th>
              <th className="px-6 py-4 text-left font-semibold">Exams</th>
              <th className="px-6 py-4 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{student.name}</td>
                <td className="px-6 py-4 text-blue-600">{student.email}</td>
                <td className="px-6 py-4">{student.phone}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {student.course}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(student.registeredDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {student.examsAttempted}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Students;
