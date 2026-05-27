import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { userRole, isAuthenticated, logout } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          {/* الشعار */}
          <div className="flex items-center gap-2">
            <span className="text-3xl">{isAuthenticated ? '👨‍⚕️' : '🩺'}</span>
            <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              عيادتي
            </Link>
            {isAuthenticated && (
              <span className="text-xs px-2 py-1 rounded-full font-bold bg-red-100 text-red-700">
                👨‍⚕️ دكتور
              </span>
            )}
          </div>

          {/* أزرار التنقل للشاشات الكبيرة */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              to="/" 
              className="px-5 py-2.5 rounded-xl font-bold text-gray-700 bg-gray-100 border-2 border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm"
            >
              🏠 الرئيسية
            </Link>
            
            <Link 
              to="/booking" 
              className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-green-600 border-2 border-green-500 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              📅 حجز موعد
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-purple-600 border-2 border-purple-500 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  📊 لوحة التحكم
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-xl font-bold text-red-700 bg-red-50 border-2 border-red-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-sm"
                >
                  🚪 خروج
                </button>
              </>
            ) : (
              <Link 
                to="/doctor-login" 
                className="px-5 py-2.5 rounded-xl font-bold text-purple-700 bg-purple-50 border-2 border-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300 shadow-sm"
              >
                👨‍⚕️ دخول الدكتور
              </Link>
            )}
          </div>

          {/* زر القائمة للموبايل */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* قائمة الموبايل */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className="px-5 py-3 rounded-xl font-bold text-gray-700 bg-gray-100 border-2 border-gray-200 text-center"
            >
              🏠 الرئيسية
            </Link>
            
            <Link 
              to="/booking" 
              onClick={() => setIsMenuOpen(false)}
              className="px-5 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-green-600 border-2 border-green-500 text-center"
            >
              📅 حجز موعد
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-5 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-purple-600 border-2 border-purple-500 text-center"
                >
                  📊 لوحة التحكم
                </Link>
                <button 
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="px-5 py-3 rounded-xl font-bold text-red-700 bg-red-50 border-2 border-red-300 text-center"
                >
                  🚪 تسجيل خروج
                </button>
              </>
            ) : (
              <Link 
                to="/doctor-login" 
                onClick={() => setIsMenuOpen(false)}
                className="px-5 py-3 rounded-xl font-bold text-purple-700 bg-purple-50 border-2 border-purple-300 text-center"
              >
                👨‍⚕️ دخول الدكتور
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar