import axios from "axios";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { toast } from "react-toastify";

export default function Schedules() {
  const [schedules, setSchedules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [doctor, setdoctor] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: 0,
    day: "",
    startTime: "",
    endTime: "",
  });
  const [searchData, setSearchData] = useState({
    DoctorId: 0,
    FromDate: "",
    ToDate: "",
    IsAvailable: "",
  });
  // اضافه کردن دکتر برای اضافه کردن جدول زمانی
  const fetchDoctor = async () => {
    try {
      const response = await axios.get(
        "https://nowruzi.top/api/Clinic/doctors"
      );
      setdoctor(response.data);
    } catch (error) {
      console.log("اضافه کردن دکتر به مشکل برخورد");
    }
  };

  // جدول زمانی
  const fetchSchedules = async () => {
    try {
      const response = await axios.get(
        "https://nowruzi.top/api/Clinic/schedules"
      );
      setSchedules(response.data);
    } catch (error) {
      console.log("خطا در گرفتن لیست زمانی", error);
    }
  };
  // اضافه کردن برنامه
  const addSchedules = async (id: number) => {
    try {
      await axios.post("https://nowruzi.top/api/Clinic/schedules", formData);
      setShowForm(false);
      setFormData({
        doctorId: id,
        day: "",
        startTime: "",
        endTime: "",
      });
      toast.success("جدول زمانی با موفقیت اضافه شد");
      fetchSchedules();
    } catch (error) {
      toast.error(error.response.data);
      console.log("خطا در افزودن برنامه زمانی", error);
    }
  };
  // جستجو
  const searchSchedules = async () => {
    try {
      const response = await axios.get(
        "https://nowruzi.top/api/Clinic/schedules/search",
        {
          params: {
            DoctorId: searchData.DoctorId || undefined,
            FromDate: searchData.FromDate || undefined,
            ToDate: searchData.ToDate || undefined,
            IsAvailable:
              searchData.IsAvailable !== ""
                ? searchData.IsAvailable
                : undefined,
          },
        }
      );
      setSchedules(response.data);
    } catch (error) {
      console.log("خطا در جستجو", error);
    }
  };

  useEffect(() => {
    fetchDoctor();
    fetchSchedules();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://nowruzi.top/api/Clinic/schedules/${id}`);
      toast.success("با موفقیت حذف شد");
      fetchSchedules();
    } catch (error) {
      toast.error(error.response.data);
      console.log("حذف کردن با مشکل برخورد", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* هدر */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">جدول برنامه ها</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          + افزودن برنامه جدید برای پزشک
        </button>
      </div>
      {/* فرم اضافه کردن برنامه */}
      {showForm && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* انتخاب پزشک */}
            <select
              className="border p-2 rounded"
              value={formData.doctorId}
              onChange={(e) =>
                setFormData({ ...formData, doctorId: Number(e.target.value) })
              }
            >
              <option value={0}>انتخاب پزشک</option>
              {doctor.map((dc: any) => (
                <option key={dc.id} value={dc.id}>
                  {dc.fullName}
                </option>
              ))}
            </select>

            {/* تاریخ (روز) */}
            <input
              type="date"
              className="border p-2 rounded"
              value={formData.day}
              onChange={(e) =>
                setFormData({ ...formData, day: e.target.value })
              }
            />

            {/* ساعت شروع */}
            <input
              type="time"
              className="border p-2 rounded"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
            />

            {/* ساعت پایان */}
            <input
              type="time"
              className="border p-2 rounded"
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
            />
          </div>

          {/* دکمه افزودن */}
          <div className="flex justify-end">
            <button
              onClick={addSchedules}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              افزودن
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-4 gap-4 mb-4">
        {/* انتخاب پزشک */}
        <select
          className="border p-2 rounded"
          value={searchData.DoctorId}
          onChange={(e) =>
            setSearchData({ ...searchData, DoctorId: Number(e.target.value) })
          }
        >
          <option value={0}>همه پزشکان</option>
          {doctor.map((dc: any) => (
            <option key={dc.id} value={dc.id}>
              {dc.fullName}
            </option>
          ))}
        </select>

        {/* تاریخ شروع */}
        <input
          type="date"
          className="border p-2 rounded"
          value={searchData.FromDate}
          onChange={(e) =>
            setSearchData({ ...searchData, FromDate: e.target.value })
          }
        />

        {/* تاریخ پایان */}
        <input
          type="date"
          className="border p-2 rounded"
          value={searchData.ToDate}
          onChange={(e) =>
            setSearchData({ ...searchData, ToDate: e.target.value })
          }
        />

        {/* وضعیت نوبت‌دهی */}
        <select
          className="border p-2 rounded"
          value={searchData.IsAvailable}
          onChange={(e) =>
            setSearchData({
              ...searchData,
              IsAvailable:
                e.target.value === "" ? "" : e.target.value === "true",
            })
          }
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="true">فعال</option>
          <option value="false">غیرفعال</option>
        </select>
      </div>

      {/* دکمه جستجو */}
      <div className="flex justify-end mb-4">
        <button
          onClick={searchSchedules}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          جستجو
        </button>
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
              <th className="px-4 py-3 text-right">تعداد نوبت</th>
              <th className="px-4 py-3 text-right">تاریخ دردسترس</th>
              <th className="px-4 py-3 text-right">ساعت حضور</th>
              <th className="px-4 py-3 text-right">نوبت دهی</th>
              <th className="px-4 py-3 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule:any, index:any) => (
              <tr key={schedule.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{schedule.doctor.fullName}</td>
                <td className="px-4 py-3">{schedule.doctor.phoneNumber}</td>
                <td className="px-4 py-3">{schedule.doctor.specialty.name}</td>
                <td className="px-4 py-3">{schedule.appointmentsCount}</td>
                <td className="px-4 py-3 text-center">{schedule.dayDisplay}</td>
                <td className="px-4 py-3 text-center">
                  <span>{schedule.endTimeDisplay}-</span>
                  <span>{schedule.startTimeDisplay}</span>
                </td>
                <td className="px-4 py-3">
                  {schedule.isAvailable ? <Check /> : <X />}
                </td>
                <td className="px-4 py-3 flex justify-center gap-2 text-center space-x-2 rtl:space-x-reverse">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(schedule.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}

            {schedules.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
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
