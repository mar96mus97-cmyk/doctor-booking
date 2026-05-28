import { Link } from 'react-router-dom'
import { doctorInfo } from '../data/doctorData'
import { useUser } from '../context/UserContext'

function Home() {
  const { userRole } = useUser()

  if (userRole === 'doctor') {
    return (
      <div className="container mx-auto p-4 max-w-5xl text-right">
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-2xl shadow-2xl p-8 md:p-12 mb-8 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4">👨‍⚕️</div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
              مرحباً دكتور <span className="text-yellow-300">{doctorInfo.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-lg md:text-xl text-purple-100 mb-8">
              أهلاً بك في لوحة التحكم. تابع مواعيدك وحجوزاتك بكل سهولة
            </p>
            <Link 
              to="/dashboard" 
              className="inline-block bg-white text-purple-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-yellow-300 hover:text-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              📊 الذهاب إلى لوحة التحكم
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                👨‍⚕️
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">{doctorInfo.name}</h2>
                <p className="text-lg text-purple-600 font-semibold">{doctorInfo.specialty}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📋 معلومات العيادة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">📍</div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">العنوان</p>
                  <p className="text-gray-800 font-bold">{doctorInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="bg-green-100 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">📞</div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">رقم الهاتف</p>
                  <p className="text-gray-800 font-bold">{doctorInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="bg-orange-100 text-orange-600 w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🕐</div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">مواعيد العمل</p>
                  <p className="text-gray-800 font-bold">{doctorInfo.workingHours}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="bg-red-100 text-red-600 w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">📅</div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">أيام العطلة</p>
                  <p className="text-gray-800 font-bold">الجمعة والسبت</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-2xl p-8 md:p-12 mb-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-4">🩺</div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            مرحباً بكم في <span className="text-yellow-300">عيادتي</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            احجز موعدك مع الدكتور بكل سهولة وفي دقائق معدودة. نضمن لك تجربة سلسة ومريحة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/booking" 
              className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-yellow-300 hover:text-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              📅 احجز موعدك الآن
            </Link>
           
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
              👨‍⚕️
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">{doctorInfo.name}</h2>
              <p className="text-lg text-blue-600 font-semibold">{doctorInfo.specialty}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-300 group">
              <div className="bg-blue-100 group-hover:bg-blue-600 text-blue-600 group-hover:text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 flex-shrink-0">📍</div>
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">العنوان</p>
                <p className="text-gray-800 font-bold text-lg">{doctorInfo.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-all duration-300 group">
              <div className="bg-green-100 group-hover:bg-green-600 text-green-600 group-hover:text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 flex-shrink-0">📞</div>
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">رقم الهاتف</p>
                <p className="text-gray-800 font-bold text-lg">{doctorInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-all duration-300 group">
              <div className="bg-orange-100 group-hover:bg-orange-600 text-orange-600 group-hover:text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 flex-shrink-0">🕐</div>
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">مواعيد العمل</p>
                <p className="text-gray-800 font-bold text-lg">{doctorInfo.workingHours}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-all duration-300 group">
              <div className="bg-red-100 group-hover:bg-red-600 text-red-600 group-hover:text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 flex-shrink-0">📅</div>
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">أيام العطلة</p>
                <p className="text-gray-800 font-bold text-lg">الجمعة والسبت</p>
              </div>
            </div>
          </div>
        </div>
      </div>

     {/* خطوات الحجز */}
<div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
  <div className="text-center mb-8">
    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">
      📋 كيف تحجز موعد؟
    </h3>
    <p className="text-gray-500">أربع خطوات بسيطة وتحصل على موعدك</p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    
    {/* الخطوة ١ */}
    <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-white rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-extrabold mx-auto mb-4 shadow-lg">
        1
      </div>
      <h4 className="font-bold text-lg text-gray-800 mb-2">اختر اليوم</h4>
      <p className="text-gray-600 text-sm">تصفح الأيام المتاحة واختر ما يناسبك من التقويم</p>
    </div>

    {/* الخطوة ٢ */}
    <div className="text-center p-6 bg-gradient-to-b from-green-50 to-white rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300">
      <div className="bg-gradient-to-br from-green-600 to-green-700 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-extrabold mx-auto mb-4 shadow-lg">
        2
      </div>
      <h4 className="font-bold text-lg text-gray-800 mb-2">اختر الوقت</h4>
      <p className="text-gray-600 text-sm">اختر من بين الأوقات المتاحة للدكتور</p>
    </div>

    {/* الخطوة ٣ */}
    <div className="text-center p-6 bg-gradient-to-b from-purple-50 to-white rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300">
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-extrabold mx-auto mb-4 shadow-lg">
        3
      </div>
      <h4 className="font-bold text-lg text-gray-800 mb-2">أدخل بياناتك</h4>
      <p className="text-gray-600 text-sm">أكمل نموذج الحجز بمعلوماتك الشخصية</p>
    </div>

    {/* الخطوة ٤ */}
    <div className="text-center p-6 bg-gradient-to-b from-orange-50 to-white rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-300">
      <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-extrabold mx-auto mb-4 shadow-lg">
        4
      </div>
      <h4 className="font-bold text-lg text-gray-800 mb-2">تأكيد الحجز</h4>
      <p className="text-gray-600 text-sm">اضغط تأكيد ويتم حجز موعدك فوراً</p>
    </div>

  </div>
</div>

      <div className="text-center mt-8 text-gray-500 text-sm pb-4">
        <p>© 2026 عيادتي - جميع الحقوق محفوظة</p>
      </div>
    </div>
  )
}

export default Home