import { useState } from 'react'
import { doctorInfo } from '../data/doctorData'
import { format, addDays, isFriday, isSaturday } from 'date-fns'
import API_URL from '../database/mongodb'

function Booking() {
  const today = new Date()
  const nextTwoWeeks = Array.from({ length: 14 }, (_, i) => addDays(today, i))
  
  const availableDays = nextTwoWeeks.filter(day => {
    return !isFriday(day) && !isSaturday(day)
  })

  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [showForm, setShowForm] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    reason: ''
  })
  
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ]

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    setShowForm(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: formData.name,
          patientPhone: formData.phone,
          bookingDate: format(selectedDay, 'yyyy-MM-dd'),
          bookingTime: selectedTime,
          reason: formData.reason,
          status: 'confirmed'
        })
      })
      
      if (response.ok) {
        setBookingConfirmed(true)
      } else {
        alert('حدث خطأ في الحجز')
      }
    } catch (error) {
      console.error('خطأ:', error)
      alert('حدث خطأ في الاتصال بالسيرفر')
    }
  }

  const handleNewBooking = () => {
    setSelectedDay(null)
    setSelectedTime(null)
    setShowForm(false)
    setFormData({ name: '', phone: '', reason: '' })
    setBookingConfirmed(false)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-right">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">{doctorInfo.name}</h2>
        <p className="text-lg text-gray-600">🏥 {doctorInfo.specialty}</p>
        <p className="text-lg text-gray-600">📍 {doctorInfo.address}</p>
        <p className="text-lg text-gray-600">📞 {doctorInfo.phone}</p>
        <p className="text-lg text-gray-600">🕐 مواعيد العمل: {doctorInfo.workingHours}</p>
      </div>

      {bookingConfirmed && (
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-6 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-green-700 mb-2">تم الحجز بنجاح!</h3>
          <div className="text-lg text-gray-700 space-y-2">
            <p>📅 التاريخ: {format(selectedDay, 'dd/MM/yyyy')}</p>
            <p>🕐 الوقت: {selectedTime}</p>
            <p>👤 الاسم: {formData.name}</p>
            <p>📞 رقم الهاتف: {formData.phone}</p>
          </div>
          <button
            onClick={handleNewBooking}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            حجز موعد جديد
          </button>
        </div>
      )}

      {!bookingConfirmed && (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-2xl font-bold text-right mb-4">اختر اليوم المناسب:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableDays.map((day, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedDay(day)
                    setSelectedTime(null)
                    setShowForm(false)
                  }}
                  className={`p-3 rounded-lg text-center transition-all ${
                    selectedDay && format(selectedDay, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-blue-100'
                  }`}
                >
                  <div className="font-bold">{format(day, 'dd/MM')}</div>
                  <div className="text-sm">{format(day, 'EEEE')}</div>
                </button>
              ))}
            </div>
          </div>

          {selectedDay && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-2xl font-bold text-right mb-4">
                اختر الوقت المناسب ليوم {format(selectedDay, 'dd/MM/yyyy')}:
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {timeSlots.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSelect(time)}
                    className={`p-3 rounded-lg transition-all text-center ${
                      selectedTime === time
                        ? 'bg-green-600 text-white'
                        : 'bg-green-100 hover:bg-green-500 hover:text-white'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {showForm && selectedTime && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-right mb-4">إكمال بيانات الحجز:</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-right text-gray-700 mb-2">الاسم الكامل:</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
                    className="w-full p-3 border rounded-lg text-right" placeholder="أدخل اسمك الكامل" />
                </div>
                <div>
                  <label className="block text-right text-gray-700 mb-2">رقم الهاتف:</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required
                    className="w-full p-3 border rounded-lg text-right" placeholder="0770 000 0000" />
                </div>
                <div>
                  <label className="block text-right text-gray-700 mb-2">سبب الزيارة:</label>
                  <textarea name="reason" value={formData.reason} onChange={handleInputChange} required rows="3"
                    className="w-full p-3 border rounded-lg text-right" placeholder="اذكر سبب الزيارة باختصار" />
                </div>
                <button type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-xl font-bold">
                  تأكيد الحجز ✅
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Booking