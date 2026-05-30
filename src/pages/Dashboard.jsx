import { useState, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { doctorInfo } from '../data/doctorData'
import API_URL from '../database/mongodb'

function Dashboard() {
  const [bookings, setBookings] = useState([])

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings`)
      const data = await response.json()
      const formatted = data.map(b => ({
        id: b._id,
        name: b.patientName,
        phone: b.patientPhone,
        day: b.bookingDate,
        time: b.bookingTime,
        reason: b.reason,
        status: b.status
      }))
      setBookings(formatted)
    } catch (error) {
      console.error('خطأ:', error)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`${API_URL}/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      fetchBookings()
    } catch (error) {
      console.error('خطأ:', error)
    }
  }

  const deleteBooking = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
      try {
        await fetch(`${API_URL}/bookings/${id}`, { method: 'DELETE' })
        fetchBookings()
      } catch (error) {
        console.error('خطأ:', error)
      }
    }
  }

  const formatPhone = (phone) => {
    let clean = phone.replace(/[^0-9]/g, '')
    if (clean.startsWith('0')) clean = '964' + clean.slice(1)
    if (!clean.startsWith('964')) clean = '964' + clean
    return clean
  }

  const sendWhatsApp = (booking, type) => {
    const phone = formatPhone(booking.phone)
    const date = booking.day?.split('-').reverse().join('/')
    let msg = ''
    if (type === 'confirm') msg = `مرحباً ${booking.name}،\n\nتم تأكيد موعدك ✅\n\n📅 ${date}\n🕐 ${booking.time}\n👨‍⚕️ ${doctorInfo.name}\n\nننتظرك!`
    else if (type === 'cancel') msg = `مرحباً ${booking.name}،\n\nتم إلغاء موعدك ❌\n\n📅 ${date}\n🕐 ${booking.time}\n\nيرجى التواصل معنا للحجز`
    else if (type === 'reminder') msg = `مرحباً ${booking.name}،\n\nتذكير بموعدك 📅\n\n🕐 ${booking.time}\n👨‍⚕️ ${doctorInfo.name}\n\nننتظرك!`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const confirmed = bookings.filter(b => b.status === 'confirmed')
  const completed = bookings.filter(b => b.status === 'completed')
  const cancelled = bookings.filter(b => b.status === 'cancelled')

  return (
    <div className="container mx-auto p-4 max-w-6xl text-right">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">👨‍⚕️ لوحة تحكم الدكتور</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 rounded-lg p-4 text-center"><div className="text-3xl font-bold text-blue-600">{confirmed.length}</div><div className="text-lg text-blue-800">مواعيد مؤكدة</div></div>
        <div className="bg-green-100 rounded-lg p-4 text-center"><div className="text-3xl font-bold text-green-600">{completed.length}</div><div className="text-lg text-green-800">مكتملة</div></div>
        <div className="bg-red-100 rounded-lg p-4 text-center"><div className="text-3xl font-bold text-red-600">{cancelled.length}</div><div className="text-lg text-red-800">ملغية</div></div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-2xl font-bold p-6 pb-0">جميع المواعيد</h2>
        {bookings.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-lg">لا توجد مواعيد حتى الآن</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-right">المريض</th><th className="p-3 text-right">الهاتف</th><th className="p-3 text-right">التاريخ</th><th className="p-3 text-right">الوقت</th><th className="p-3 text-right">سبب الزيارة</th><th className="p-3 text-right">الحالة</th><th className="p-3 text-right">واتساب</th><th className="p-3 text-right">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{booking.name}</td><td className="p-3">{booking.phone}</td>
                    <td className="p-3">{booking.day ? format(parseISO(booking.day), 'dd/MM/yyyy') : booking.day}</td>
                    <td className="p-3">{booking.time}</td><td className="p-3">{booking.reason}</td>
                    <td className="p-3"><span className={`px-3 py-1 rounded-full text-sm ${booking.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : booking.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{booking.status === 'confirmed' ? 'مؤكد' : booking.status === 'completed' ? 'مكتمل' : 'ملغي'}</span></td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {booking.status === 'confirmed' && <button onClick={() => sendWhatsApp(booking, 'confirm')} className="bg-green-500 text-white px-2 py-1 rounded text-xs">✅</button>}
                        {booking.status === 'cancelled' && <button onClick={() => sendWhatsApp(booking, 'cancel')} className="bg-red-500 text-white px-2 py-1 rounded text-xs">❌</button>}
                        <button onClick={() => sendWhatsApp(booking, 'reminder')} className="bg-orange-500 text-white px-2 py-1 rounded text-xs">🔔</button>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {booking.status === 'confirmed' && <><button onClick={() => updateStatus(booking.id, 'completed')} className="bg-green-500 text-white px-2 py-1 rounded text-xs">✔️</button><button onClick={() => updateStatus(booking.id, 'cancelled')} className="bg-red-500 text-white px-2 py-1 rounded text-xs">✖️</button></>}
                        <button onClick={() => deleteBooking(booking.id)} className="bg-gray-500 text-white px-2 py-1 rounded text-xs">🗑️</button>
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