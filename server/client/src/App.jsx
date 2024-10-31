import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import AdminSignIn from './pages/adminSignIn/AdminSignIn'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/Navbar';
import ProtectedRoute from './ProtectedRoute';
import ParentSignIn from './pages/parentSignIn/ParentSignIn';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import TeacherDashboard from './pages/teachersDashboard/TeacherDashboard';

function App() {

  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<AdminSignIn />}/>
        <Route path='/parent-sign-in' element={<ParentSignIn />}/>
        <Route 
          path='/sign-in-type' 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
         <Route 
          path='/admin-dashboard' 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path='/admin-dashboard/teachers' 
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          } 
        />
        
      </Routes>
    </Router>
  )
}
// to='/admin-dashboard/teachers'

export default App
