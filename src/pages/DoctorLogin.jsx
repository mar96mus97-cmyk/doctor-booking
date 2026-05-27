import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function DoctorLogin() {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const { loginAsDoctor } = useUser()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = loginAsDoctor(pin)
    
    if (success) {
      navigate('/dashboard')
    } else {
      setError('❌ الرمز السري غير صحيح')
      setPin('')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">👨‍⚕️</div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">تسجيل دخول الدكتور</h2>
          <p className="text-gray-500">أدخل الرمز السري للوصول إلى لوحة التحكم</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-right text-gray-700 font-bold mb-2">
              🔐 الرمز السري:
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value)
                setError('')
              }}
              placeholder="أدخل الرمز السري"
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-center text-2xl tracking-widest focus:border-purple-500 focus:outline-none transition"
              maxLength="4"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-center font-bold">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl text-xl font-bold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            🚀 دخول
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>الرمز الافتراضي: 1234</p>
        </div>
      </div>
    </div>
  )
}

export default DoctorLogin