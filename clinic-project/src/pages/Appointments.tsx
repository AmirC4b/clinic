import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState({
    cancellationReason: "",
  });
  const [doctor, setDoctor] = useState([]);
  const [patient, setPatient] = useState([]);
  const [formData, setFormData] = useState({
    patientId: 0,
    doctorScheduleId: 0,
    reason: "",
    notes: "",
  });
  const [searchData, setSearchData] = useState({
    DoctorId: 0,
    FromDate: "",
    ToDate: "",
    IsCancelled: "",
  });

  // گرفتن لیست دکتر ها
  const fetchDoctor = async () => {
    try {
      const response = await axios.get(
        "https://nowruzi.top/api/Clinic/schedules"
      );
      console.log(response.data);

      setDoctor(response.data);
    } catch (error) {
      console.log("گرفتن لیست محصولات با خطا مواجهه شد", error);
    }
  };

  // گرفتن لیست بیماران
  const fetchPatient = async () => {
    try {
      const response = await axios.get(
        "https://nowruzi.top/api/Clinic/patients"
      );
      setPatient(response.data);
    } catch (error) {
      console.log("گرفتن لیست بیماران با خطا مواجهه شد", error);
    }
  };

  // برای گرفتن لیست نوبت ها
  const fetchAppointment = async () => {
    try {
      const response = await axios.get(
        "https://nowruzi.top/api/Clinic/appointments"
      );
      setAppointments(response.data);
    } catch (error) {
      console.log("گرفتن لیست با خطا مواجهه شد ", error);
    }
  };

  // برای رزرو نوبت
  const handleAddAppointment = async () => {
    try {
      await axios.post("https://nowruzi.top/api/Clinic/appointments", formData);
      setShowForm(false);
      setFormData({
        patientId: 0,
        doctorScheduleId: 0,
        reason: "",
        notes: "",
      });
      toast.success("رزرو نوبت با موفقیت انجام شد");
      fetchAppointment();
    } catch (error) {
      toast.error(error.response.data);
      console.log("رزرو نوبت با خطا مواجهه شد", error);
    }
  };

  // جستجو
  const serachAppointment = async () => {
    try {
      const response = await axios.get(
        "https://nowruzi.top/api/Clinic/appointments/search",
        {
          params: {
            DoctorId: searchData.DoctorId || undefined,
            FromDate: searchData.FromDate || undefined,
            ToDate: searchData.ToDate || undefined,
            IsCancelled:
              searchData.IsCancelled !== ""
                ? searchData.IsCancelled
                : undefined,
          },
        }
      );
      console.log(response.data);
      setAppointments(response.data);
    } catch (error) {
      console.log("خطا در جستجو", error);
    }
  };

  useEffect(() => {
    fetchDoctor();
    fetchAppointment();
    fetchPatient();
  }, []);

  // برای حذف کردن
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://nowruzi.top/api/Clinic/appointments/${id}`);
      toast.success("نوبت با موفقیت حذف شد");
      fetchAppointment();
    } catch (error) {
      toast.error(error.response.data);
      console.log("عملیات حذف با خطا مواجهه شد", error);
    }
  };
  // برای لغو کردن
  const handleCancel = async () => {
    try {
      await axios.post(
        `https://nowruzi.top/api/Clinic/appointments/${selectedId}/cancel`,
        cancelReason
      );
      setCancelModal(false);
      toast.success("نوبت با موفقیت لغو شد");
      fetchAppointment();
    } catch (error) {
      toast.error(error.response.data);
      console.log("خطا در لغو نوبت ", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* هدر */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">نوبت ها</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          + رزرو نوبت
        </button>
      </div>

      {/* فرم رزرو نوبت */}
      {showForm && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* انتخاب بیمار */}
            <select
              className="border p-2 rounded"
              value={formData.patientId}
              onChange={(e) =>
                setFormData({ ...formData, patientId: Number(e.target.value) })
              }
            >
              <option value={0}>انتخاب بیمار</option>
              {patient.map((pt: any) => (
                <option key={pt.id} value={pt.id}>
                  {pt.fullName}
                </option>
              ))}
            </select>
            {/* انتخاب پزشک */}
            <select
              className="border p-2 rounded"
              value={formData.doctorScheduleId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  doctorScheduleId: Number(e.target.value),
                })
              }
            >
              <option value={0}>انتخاب پزشک</option>
              {doctor.map((dc: any) => (
                <option key={dc.id} value={dc.id}>
                  {dc.doctor.fullName}    {dc.dayDisplay}   {" "}
                  {dc.isAvailable ? "✅" : "❌"}
                </option>
              ))}
            </select>
            {/* دلیل رزرو */}
            <textarea
              placeholder="دلیل رزرو"
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
              className="border p-2 rounded col-span-2 resize-none"
            />
            {/* توضیحات */}
            <textarea
              placeholder="توضیحات"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="border p-2 rounded col-span-2 resize-none"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleAddAppointment}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              ثبت
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              انصراف
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
            <option key={dc.doctor.id} value={dc.doctor.id}>
              {dc.doctor.fullName}
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
          value={searchData.IsCancelled}
          onChange={(e) =>
            setSearchData({
              ...searchData,
              IsCancelled: e.target.value,
            })
          }
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="false">فعال</option>
          <option value="true">لغو شده</option>
        </select>
      </div>

      {/* دکمه جستجو */}
      <div className="flex justify-end mb-4">
        <button
          onClick={serachAppointment}
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
            {appointments.map((appo: any, index: number) => (
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
                    <button
                      onClick={() => {
                        setSelectedId(appo.id);
                        setCancelModal(true);
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      لغو
                    </button>
                  ) : (
                    <></>
                  )}
                  {appo.status === "لغو شده" ? (
                    <button
                      onClick={() => handleDelete(appo.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
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
        {/* مودال لغو کردن نوبت */}
        {cancelModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
              <h2 className="text-lg font-bold mb-4 text-gray-800">لغو نوبت</h2>
              <textarea
                className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                rows="4"
                placeholder="دلیل لغو را وارد کنید..."
                value={cancelReason.cancellationReason}
                onChange={(e) =>
                  setCancelReason({
                    ...cancelReason,
                    cancellationReason: e.target.value,
                  })
                }
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setCancelModal(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  انصراف
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  تایید لغو
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
