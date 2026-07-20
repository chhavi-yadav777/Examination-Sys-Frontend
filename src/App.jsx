import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Component/LoginPage/Login";
import SignUp from "./Component/SignUpPage/SignUp";

import Panel from "./Component/Admin/Panel";
import Dashboard from "./Component/Admin/Pages/Dashboard";
import Exams from "./Component/Admin/Pages/Exams";
import QuestionBank from "./Component/Admin/Pages/QuestionBank";
import Students from "./Component/Admin/Pages/Students";
import Results from "./Component/Admin/Pages/Results";

import StudentPanel from "./Component/Student/StudentPanel";
import StudentDashboard from "./Component/Student/Pages/Dashboard";
import AvailableExams from "./Component/Student/Pages/AvailableExams";
import TakeExam from "./Component/Student/Pages/TakeExam";
import ResultHistory from "./Component/Student/Pages/ResultHistory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/signup" element={<SignUp />} />

          {/* Admin Routes */}

          <Route path="/admin" element={<Panel />}>

            <Route index element={<Dashboard />} />

            <Route path="dashboard" element={<Dashboard />} />

            <Route path="exams" element={<Exams />} />

            <Route path="questionbank" element={<QuestionBank />} />

            <Route path="students" element={<Students />} />

            <Route path="results" element={<Results />} />

          </Route>

          {/* Student Routes */}

          <Route path="/student" element={<StudentPanel />}>

            <Route index element={<StudentDashboard />} />

            <Route path="dashboard" element={<StudentDashboard />} />

            <Route path="availableexams" element={<AvailableExams />} />

            <Route path="takeexam" element={<TakeExam />} />

            <Route path="resulthistory" element={<ResultHistory />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;