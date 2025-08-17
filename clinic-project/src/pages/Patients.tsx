import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationalCode: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: 1,
    address: "",
  });
  // برای گرفتن لیست بیماران
  const fetchAllPatients = async () => {
    try {
      const response = await axios.get(
        "https://nowruzi.top/api/Clinic/patients"
      );
      setPatients(response.data);
    } catch (error) {
      console.log("خطا در گرفتن لیست بیماران : ", error);
    }
  };
  // برای اضافه کردن بیمار
  const handleAddPatient = async () => {
    try {
      await axios.post("https://nowruzi.top/api/Clinic/patients", formData);
      setShowForm(false);
      setFormData({
        firstName: "",
        lastName: "",
        nationalCode: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: 1,
        address: "",
      });
      toast.success("بیمار با موفقیت  اضافه شد");
      fetchAllPatients();
    } catch (error) {
      toast.error(error.response.data);
      console.log("خطا در افزودن بیمار:", error);
    }
  };
  // برای سرچ کردن
  const fetchSearchPatients = async (term) => {
    try {
      const response = await axios.get(
        "https://nowruzi.top/api/Clinic/patients/search",
        {
          params: {
            SearchTerm: term,
          },
        }
      );
      setPatients(response.data.data || response.data);
    } catch (error) {
      console.error("خطا در گرفتن بیماران با سرچ:", error);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchAllPatients();
    } else {
      fetchSearchPatients(searchTerm);
    }
  }, [searchTerm]);
  // برای حذف کردن
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://nowruzi.top/api/Clinic/patients/${id}`);
      fetchAllPatients();
      toast.success("بیمار با موفقیت حذف شد");
    } catch (error) {
      toast.error(error.response.data);
      console.log(error);
    }
  };
  // برای ویرایش
  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setFormData({
      firstName: patient.firstName || "",
      lastName: patient.lastName || "",
      nationalCode: patient.nationalCode || "",
      phoneNumber: patient.phoneNumber || "",
      dateOfBirth: patient.dateOfBirth ? patient.dateOfBirth.split("T")[0] : "",
      gender: patient.gender || 1,
      address: patient.address || "",
    });
  };
  // برای بستن مودال
  const handleCloseModal = () => {
    setEditingPatient(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // برای سیو کردن
  const handleSave = async () => {
    try {
      await axios.put(
        `https://nowruzi.top/api/Clinic/patients/${editingPatient.id}`,
        formData
      );
      handleCloseModal();
      fetchAllPatients();
      toast.success("با موفقیت تغییر کرد");
    } catch (error) {
      toast.error(error.response.data);
      alert("ویرایش بیمار با خطا مواجه شد");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* هدر */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">لیست بیماران</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          + افزودن بیمار
        </button>
      </div>
      {/* فرم اضافه کردن بیمار */}
      {showForm && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="نام"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              placeholder="نام خانوادگی"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              placeholder="کد ملی"
              value={formData.nationalCode}
              onChange={(e) =>
                setFormData({ ...formData, nationalCode: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              placeholder="شماره تماس"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
              className="border p-2 rounded"
            />
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: Number(e.target.value) })
              }
              className="border p-2 rounded"
            >
              <option value={1}>مرد</option>
              <option value={2}>زن</option>
            </select>
            <textarea
              placeholder="آدرس"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="border p-2 rounded col-span-2"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleAddPatient}
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

      {/* سرچ */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="جستجوی بیمار..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* جدول */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-right">#</th>
              <th className="px-4 py-3 text-right">نام کامل</th>
              <th className="px-4 py-3 text-right">شماره تماس</th>
              <th className="px-4 py-3 text-right">کد ملی</th>
              <th className="px-4 py-3 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={patient.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{patient.fullName}</td>
                <td className="px-4 py-3">{patient.phoneNumber}</td>
                <td className="px-4 py-3">{patient.nationalCode}</td>
                <td className="px-4 py-3 flex justify-center gap-2 text-center space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => handleEdit(patient)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(patient.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}

            {patients.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  بیماری یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {editingPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">ویرایش بیمار</h2>

            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="نام"
              className="border p-2 rounded mb-2 w-full"
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="نام خانوادگی"
              className="border p-2 rounded mb-2 w-full"
            />
            <input
              name="nationalCode"
              value={formData.nationalCode}
              onChange={handleChange}
              placeholder="کد ملی"
              className="border p-2 rounded mb-2 w-full"
            />
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="شماره تماس"
              className="border p-2 rounded mb-2 w-full"
            />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="border p-2 rounded mb-2 w-full"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-2 rounded mb-4 w-full"
            >
              <option value={1}>مرد</option>
              <option value={2}>زن</option>
            </select>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="آدرس"
              className="border p-2 rounded mb-4 w-full"
            />

            <div className="flex justify-end space-x-2 rtl:space-x-reverse">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                لغو
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
