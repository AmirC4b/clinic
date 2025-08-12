import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Schedules() {
  const [schedules, setSchedules] = useState([]);

  // جدول زمانی
  const fetchSchedules = async () => {
    try {
      const response = await axios.get(
        "https://nowruzi.top/api/Clinic/schedules"
      );
      console.log(response.data);
      setSchedules(response.data);
    } catch (error) {
      console.log("خطا در گرفتن لیست زمانی", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* هدر */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">جدول برنامه ها</h1>
        <button className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-lg">
          + افزودن برنامه جدید برای پزشک
        </button>
      </div>
      {/* سرچ */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="جستجوی برنامه..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      {/* جدول */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-right">#</th>
              <th className="px-4 py-3 text-right">نام دکتر</th>
              <th className="px-4 py-3 text-right">شماره تماس</th>
              <th className="px-4 py-3 text-right">تخصص</th>
              <th className="px-4 py-3 text-center">تاریخ دردسترس</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, index) => (
              <tr key={schedule.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{schedule.doctor.fullName}</td>
                <td className="px-4 py-3">{schedule.doctor.phoneNumber}</td>
                <td className="px-4 py-3">{schedule.doctor.specialty.name}</td>
                <td className="px-4 py-3 text-center">{schedule.dayDisplay}</td>
              </tr>
            ))}

            {schedules.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  بیماری یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
