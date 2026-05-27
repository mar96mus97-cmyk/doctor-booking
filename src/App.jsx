import { Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from './context/UserContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Booking from './pages/Booking'
import Dashboard from './pages/Dashboard'
import DoctorLogin from './pages/DoctorLogin'

function App() {
  const { userRole, isAuthenticated } = useUser()

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        
        {/* صفحة تسجيل دخول الدكتور */}
        <Route path="/doctor-login" element={<DoctorLogin />} />
        
        {/* لوحة التحكم - محمية: فقط للدكتور المسجل دخوله */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/doctor-login" replace />
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App