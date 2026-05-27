import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

// الرمز السري للدكتور (تقدر تغيره)
const DOCTOR_PIN = '1234'

export function UserProvider({ children }) {
  const [userRole, setUserRole] = useState('patient') // 'patient' أو 'doctor'
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // دالة تسجيل دخول الدكتور
  const loginAsDoctor = (pin) => {
    if (pin === DOCTOR_PIN) {
      setUserRole('doctor')
      setIsAuthenticated(true)
      return true // نجاح
    }
    return false // فشل
  }

  // دالة تسجيل خروج الدكتور
  const logout = () => {
    setUserRole('patient')
    setIsAuthenticated(false)
  }

  return (
    <UserContext.Provider value={{ 
      userRole, 
      isAuthenticated, 
      loginAsDoctor, 
      logout 
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}