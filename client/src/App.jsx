import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import ManageYearPage from './pages/ManageYearPage'
import ManageStream from './pages/Master/ManageStream'
import ManageSemesterProgram from './pages/Master/ManageSemesterProgram'
import ManageInstituteSemester from './pages/Master/ManageInstituteSemester'
import ManageExamCenter from './pages/ManageExamCenter'
import ManageStateDistrictCity from './pages/ManageStateDistrictCity'
import ManageCastCategory from './pages/ManageCastCategory'
import ManageUserRights from './pages/ManageUserRights'
import ManageInstitute from './pages/ManageInstitute'
import ManageDegree from './pages/ManageDegree'
import ManageStudentDetail from './pages/ManageStudentDetail'
import YearConfiguration from './pages/YearConfiguration'
import ManageProgram from './pages/ManageProgram'
import ManageExam from './pages/ManageExam'
import ManageExamGroup from './pages/ManageExamGroup'
import SynchronizeSubject from './pages/SynchronizeSubject'
import ManageSubjectHead from './pages/ManageSubjectHead'
import ManageExamFee from './pages/ManageExamFee'
import ManageBacklogNorms from './pages/ManageBacklogNorms'
import SetAttendanceEligibility from './pages/SetAttendanceEligibility'
import StudentTermGrant from './pages/StudentTermGrant'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<ManageYearPage />} />
              <Route path="/master/manage-stream" element={<ManageStream />} />
              <Route path="/master/manage-semester-program" element={<ManageSemesterProgram />} />
              <Route path="/master/manage-institute-wise-semester" element={<ManageInstituteSemester />} />
              <Route path="/master/manage-exam-center" element={<ManageExamCenter />} />
              <Route path="/master/manage-state-district-city" element={<ManageStateDistrictCity />} />
              <Route path="/master/manage-cast-category" element={<ManageCastCategory />} />
              <Route path="/master/manage-user-rights" element={<ManageUserRights />} />
              <Route path="/master/manage-institute" element={<ManageInstitute />} />
              <Route path="/master/manage-degree" element={<ManageDegree />} />
              <Route path="/master/manage-student-detail" element={<ManageStudentDetail />} />
              <Route path="/pre-examination/year-configuration" element={<YearConfiguration />} />
              <Route path="/pre-examination/manage-program" element={<ManageProgram />} />
              <Route path="/pre-examination/manage-exam-term" element={<ManageExam />} />
              <Route path="/pre-examination/manage-exam-group" element={<ManageExamGroup />} />
              <Route path="/pre-examination/synchronize-subject" element={<SynchronizeSubject />} />
              <Route path="/pre-examination/manage-subject-head" element={<ManageSubjectHead />} />
                <Route path="/pre-examination/manage-exam-fee" element={<ManageExamFee />} />
                <Route path="/pre-examination/manage-backlog-norms" element={<ManageBacklogNorms />} />
              <Route path="/pre-examination/set-attendance-eligibility" element={<SetAttendanceEligibility />} />
              <Route path="/pre-examination/student-term-grant" element={<StudentTermGrant />} />
            </Routes>
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App
