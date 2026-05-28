import { useState, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { doctorInfo } from '../data/doctorData'

function Dashboard() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    savedBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    setBookings(savedBookings)
  }, [])

  // دالة تغيير حالة الحجز
  const updateStatus = (id, newStatus) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    )
    setBookings(updatedBookings)
    localStorage.setItem('bookings', JSON.stringify(updatedBookings))
  }

  // دالة حذف حجز
  const deleteBooking = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
      const updatedBookings = bookings.filter(booking => booking.id !== id)
      setBookings(updatedBookings)
      localStorage.setItem('bookings', JSON.stringify(updatedBookings))
    }
  }

  // دالة تجهيز رقم الهاتف بمفتاح البلد
  const formatPhone = (phone) => {
    // نشيل كل شي مو رقم
    let cleanPhone = phone.replace(/[^0-9]/g, '')
    
    // إذا بدأ بصفر، نبدله بـ 964
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '964' + cleanPhone.slice(1)
    }
    
    // إذا ما بدأ بـ 964، نضيفها
    if (!cleanPhone.startsWith('964')) {
      cleanPhone = '964' + cleanPhone
    }
    
    return cleanPhone
  }

  // دالة إرسال رسالة واتساب
  const sendWhatsApp = (booking, messageType) => {
    const phone = formatPhone(booking.phone)
    
    // تنسيق التاريخ
    const formattedDate = booking.day.split('-').reverse().join('/')
    
    let message = ''
    
    if (messageType === 'confirm') {
      message = `مرحباً ${booking.name}،\n\nتم تأكيد موعدك ✅\n\n📅 التاريخ: ${formattedDate}\n🕐 الوقت: ${booking.time}\n👨‍⚕️ الدكتور: ${doctorInfo.name}\n📍 العنوان: ${doctorInfo.address}\n\nننتظرك في الموعد المحدد. شكراً لثقتكم بنا!`
    } else if (messageType === 'cancel') {
      message = `مرحباً ${booking.name}،\n\nنعتذر منك، تم إلغاء موعدك ❌\n\n📅 التاريخ: ${formattedDate}\n🕐 الوقت: ${booking.time}\n👨‍⚕️ الدكتور: ${doctorInfo.name}\n\nيرجى التواصل معنا على الرقم ${doctorInfo.phone} لحجز موعد بديل. شكراً لتفهمك!`
    } else if (messageType === 'reminder') {
      message = `مرحباً ${booking.name}،\n\nتذكير بموعدك 📅\n\n📅 التاريخ: ${formattedDate}\n🕐 الوقت: ${booking.time}\n👨‍⚕️ الدكتور: ${doctorInfo.name}\n📍 العنوان: ${doctorInfo.address}\n📞 للتواصل: ${doctorInfo.phone}\n\nننتظرك!`
    }
    
    // إنشاء رابط واتساب
    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`
    
    // فتح الرابط في نافذة جديدة
    window.open(whatsappURL, '_blank')
  }

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed')
  const completedBookings = bookings.filter(b => b.status === 'completed')
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled')

  return (
    <div className="container mx-auto p-4 max-w-6xl text-right">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">👨‍⚕️ لوحة تحكم الدكتور</h1>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">{confirmedBookings.length}</div>
          <div className="text-lg text-blue-800">مواعيد مؤكدة</div>
        </div>
        <div className="bg-green-100 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-600">{completedBookings.length}</div>
          <div className="text-lg text-green-800">مكتملة</div>
        </div>
        <div className="bg-red-100 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-red-600">{cancelledBookings.length}</div>
          <div className="text-lg text-red-800">ملغية</div>
        </div>
      </div>

      {/* جدول المواعيد */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-2xl font-bold p-6 pb-0">جميع المواعيد</h2>
        
        {bookings.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-lg">
            لا توجد مواعيد حتى الآن
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-right">المريض</th>
                  <th className="p-3 text-right">الهاتف</th>
                  <th className="p-3 text-right">التاريخ</th>
                  <th className="p-3 text-right">الوقت</th>
                  <th className="p-3 text-right">سبب الزيارة</th>
                  <th className="p-3 text-right">الحالة</th>
                  <th className="p-3 text-right">واتساب</th>
                  <th className="p-3 text-right">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{booking.name}</td>
                    <td className="p-3">{booking.phone}</td>
                    <td className="p-3">{format(parseISO(booking.day), 'dd/MM/yyyy')}</td>
                    <td className="p-3">{booking.time}</td>
                    <td className="p-3">{booking.reason}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === 'confirmed' 
                          ? 'bg-blue-100 text-blue-700' 
                          : booking.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {booking.status === 'confirmed' ? 'مؤكد' : 
                         booking.status === 'completed' ? 'مكتمل' : 'ملغي'}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => sendWhatsApp(booking, 'confirm')}
                            className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                            title="إرسال تأكيد"
                          >
                            ✅
                          </button>
                        )}
                        {booking.status === 'cancelled' && (
                          <button
                            onClick={() => sendWhatsApp(booking, 'cancel')}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                            title="إرسال إلغاء"
                          >
                            ❌
                          </button>
                        )}
                        <button
                          onClick={() => sendWhatsApp(booking, 'reminder')}
                          className="bg-orange-500 text-white px-2 py-1 rounded text-xs hover:bg-orange-600"
                          title="تذكير"
                        >
                          🔔
                        </button>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {booking.status === 'confirmed' && (
                          <>
                            <button
                              onClick={() => updateStatus(booking.id, 'completed')}
                              className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                              title="تأكيد الحضور"
                            >
                              ✔️
                            </button>
                            <button
                              onClick={() => updateStatus(booking.id, 'cancelled')}
                              className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                              title="إلغاء"
                            >
                              ✖️
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600"
                          title="حذف"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard