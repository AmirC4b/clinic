import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Specialties() {
  const [specialties, setspecialties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });
  // برای گرفتن لیست تخصص ها
  const handleSpecialities = async () => {
    try {
      const response = await axios.get(
        "https://nowruzi.top/api/Clinic/specialties"
      );
      setspecialties(response.data);
    } catch (error) {
      console.log("خطا در گرفتن لیست تخصص ها:", error);
    }
  };
  // اضافه کردن تخصص
  const handleAddspcial = async () => {
    try {
      await axios.post("https://nowruzi.top/api/Clinic/specialties", formData);
      setShowForm(false);
      setFormData({
        name: "",
      });
      toast.success("تخصص با موفقیت اضافه شد");
      handleSpecialities();
    } catch (error) {
      toast.error(error.response.data);
      console.log("خطا در افزودن بیمار", error);
    }
  };

  useEffect(() => {
    handleSpecialities();
  }, []);

  // برای حذف کردن
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://nowruzi.top/api/Clinic/specialties/${id}`);
      toast.success("تخصص با موفقیت حذف شد");
      handleSpecialities();
    } catch (error) {
      toast.error(error.response.data);
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* بخش هدر و دکمه افزودن */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">لیست تخصص ها</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 cursor-pointer  hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          + افزودن تخصص
        </button>
      </div>
      {/* فرم افزودن تخصص */}
      {showForm && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-1 ">
            <input
              type="text"
              className="border p-4 rounded"
              value={formData.name}
              placeholder="نام تخصص"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              onClick={handleAddspcial}
              className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              ثبت
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-400 cursor-pointer hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              انصراف
            </button>
          </div>
        </div>
      )}
      {/* جدول */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-center">#</th>
              <th className="px-4 py-3 text-center">نام تخصص</th>
              <th className="px-4 py-3 text-center">تعداد دکتر</th>
              <th className="px-4 py-3 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {specialties.map((special: any, index:any) => (
              <tr key={special.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-center">{index + 1}</td>
                <td className="px-4 py-3 text-center">{special.name}</td>
                <td className="px-4 py-3 text-center">
                  {special.doctorsCount}
                </td>
                <td className="px-4 py-3 flex gap-2 text-center justify-center  space-x-2 rtl:space-x-reverse">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(special.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
            {specialties.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
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
