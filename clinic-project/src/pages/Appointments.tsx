import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointment = async () => {
    try {
      const response = await axios.get(
        "https://nowruzi.top/api/Clinic/appointments"
      );
      console.log(response.data);
      setAppointments(response.data);
    } catch (error) {
      console.log("گرفتن لیست با خطا مواجهه شد ", error);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* هدر */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">نوبت ها</h1>
      </div>
      {/* جدول */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-right">#</th>
              <th className="px-4 py-3 text-right">نام بیمار</th>
              <th className="px-4 py-3 text-right">نام دکتر</th>
              <th className="px-4 py-3 text-right">شماره بیمار</th>
              <th className="px-4 py-3 text-right">تاریخ نوبت</th>
              <th className="px-4 py-3 text-right">دلیل</th>
              <th className="px-4 py-3 text-right">وضعیت</th>
              <th className="px-4 py-3 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appo, index) => (
              <tr key={appo.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{appo.patient.fullName}</td>
                <td className="px-4 py-3">
                  {appo.doctorSchedule.doctor.fullName}
                </td>
                <td className="px-4 py-3">{appo.patient.phoneNumber}</td>
                <td className="px-4 py-3">{appo.doctorSchedule.dayDisplay}</td>
                <td className="px-4 py-3">{appo.reason}</td>
                <td className="px-4 py-3">{appo.status}</td>
                <td className="px-4 py-3 flex justify-center gap-2 text-center space-x-2 rtl:space-x-reverse">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                    ویرایش
                  </button>
                  {appo.status === "فعال" ? (
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                      لغو
                    </button>
                  ) : (
                    <></>
                  )}
                  {appo.status === "لغو شده" ? (
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                      حذف
                    </button>
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
