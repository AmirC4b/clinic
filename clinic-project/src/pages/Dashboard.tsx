import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  UserCheck,
  CalendarDays,
  Users,
  Wallet,
  User,
  CheckCircle,
} from "lucide-react";

export default function Dashboard() {
  const [patientsNum, setPatientsNum] = useState(0);
  const [activeDoctors, setActiveDoctors] = useState(0);

  const stats = [
    {
      title: "پزشکان فعال",
      value: activeDoctors,
      icon: <UserCheck className="w-6 h-6 text-purple-700" />,
      iconBg: "bg-purple-100",
    },
    {
      title: "نوبت‌های امروز",
      value: 45,
      icon: <CalendarDays className="w-6 h-6 text-green-700" />,
      iconBg: "bg-green-100",
    },
    {
      title: "کل بیماران",
      value: patientsNum,
      icon: <Users className="w-6 h-6 text-blue-700" />,
      iconBg: "bg-blue-100",
    },
    {
      title: "درآمد ماهانه",
      value: "۱۲,۵۰۰,۰۰۰ تومان",
      icon: <Wallet className="w-6 h-6 text-orange-700" />,
      iconBg: "bg-orange-100",
    },
  ];

  //نمایش تعداد بیماران کل از Api
  const fetchPatients = async () => {
    try {
      const res = await axios.get("https://nowruzi.top/api/Clinic/patients");
      setPatientsNum(res.data.length);
    } catch (err) {
      console.error("خطا در دریافت بیماران:", err);
    }
  };

  // نمایش دکتران فعال با Api
  const fetchActiveDoctors = async () => {
    try {
      const res = await axios.get("https://nowruzi.top/api/Clinic/doctors");
      setActiveDoctors(res.data.length);
    } catch (err) {
      console.error("خطا در دریافت پزشکان فعال:", err);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchActiveDoctors();
  }, []);

  return (
    <>
      <div>
        <h1 className="font-bold text-3xl text-gray-800">داشبورد</h1>
        <p className="pt-2 text-gray-600">خوش آمدید به سیستم مدیریت کلینیک</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white rounded-2xl shadow p-4"
          >
            <div className="text-right">
              <p className="text-gray-600 text-sm font-semibold">
                {stat.title}
              </p>
              <h2 className="text-2xl font-extrabold text-gray-800 mt-1">
                {stat.value}
              </h2>
            </div>
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full ${stat.iconBg}`}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* فعالیت‌های امروز */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-right">
            فعالیت‌های امروز
          </h3>
          <div className="space-y-4">
            {[
              {
                title: "نوبت جدید ثبت شد",
                time: "۲ دقیقه پیش",
                iconBg: "bg-gray-200",
                icon: <CalendarDays className="w-5 h-5 text-gray-600" />,
              },
              {
                title: "نوبت تایید شد",
                time: "۱۵ دقیقه پیش",
                iconBg: "bg-green-100",
                icon: <CheckCircle className="w-5 h-5 text-green-600" />,
              },
              {
                title: "بیمار جدید ثبت شد",
                time: "۱ ساعت پیش",
                iconBg: "bg-black/10",
                icon: <User className="w-5 h-5 text-gray-800" />,
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="text-right">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${item.iconBg}`}
                >
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* نوبت‌های اخیر */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-right">
            نوبت‌های اخیر
          </h3>
          <div className="space-y-4">
            {[
              {
                time: "10:00",
                patient: "احمد محمدی",
                doctor: "دکتر رضایی",
                status: "تایید شده",
              },
              {
                time: "11:30",
                patient: "فاطمه احمدی",
                doctor: "دکتر کریمی",
                status: "در انتظار",
              },
              {
                time: "14:00",
                patient: "علی حسینی",
                doctor: "دکتر نوری",
                status: "تایید شده",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b pb-3 last:border-none"
              >
                <div className="text-right">
                  <p className="font-semibold">{item.patient}</p>
                  <p className="text-sm text-gray-500">{item.doctor}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-700">
                    {item.time}
                  </p>
                  <span
                    className={`text-xs rounded px-2 py-1 inline-block mt-1 ${
                      item.status === "تایید شده"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
