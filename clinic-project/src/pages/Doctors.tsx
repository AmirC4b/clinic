import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import type { IDoctor } from "../types/IDoctor";
import type { ISpeciality } from "../types/ISpeciality";

export default function Doctors() {
  interface DoctorFormInput {
    specialtyId: number;
    firstName: string;
    lastName: string;
    medicalLicenseNumber: string;
    phoneNumber: string;
    gender: number;
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [specialties, setspecialties] = useState<ISpeciality[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DoctorFormInput>({
    defaultValues: {
      specialtyId: 0,
      firstName: "",
      lastName: "",
      medicalLicenseNumber: "ML00",
      phoneNumber: "09",
      gender: 1,
    },
  });
  // برای گرفتن لیست تخصص ها
  const fetchspecialty = async () => {
    try {
      const res = await axios.get("https://nowruzi.top/api/Clinic/specialties");
      setspecialties(res.data);
    } catch (error) {
      console.log("خطا در گرفتن تخصص ها", error);
    }
  };

  // برای گرفتن لیست دکتر ها
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        "https://nowruzi.top/api/Clinic/doctors"
      );
      setDoctors(response.data);
    } catch (error) {
      console.log("خطا در گرفتن لیست دکتر ها", error);
    }
  };
  // برای سرچ
  const fetchSearchDoctors = async (term: string) => {
    try {
      const response = await axios.get(
        "https://nowruzi.top/api/Clinic/doctors/search",
        {
          params: {
            SearchTerm: term,
          },
        }
      );
      setDoctors(response.data.data || response.data);
    } catch (error) {
      console.error("خطا در گرفتن بیماران با سرچ:", error);
    }
  };

  // برای اضافه کردن دکتر
  const onSubmit = async (data: DoctorFormInput) => {
    console.log(data);
    try {
      await axios.post("https://nowruzi.top/api/Clinic/doctors", data);
      toast.success("دکتر با موفقیت اضافه شد");
      reset();
      fetchDoctors();
    } catch (error: any) {
      toast.error(error.response.data);
      console.log("خطا در افزودن دکتر:", error);
    }
  };
  useEffect(() => {
    fetchspecialty();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchDoctors();
    } else {
      fetchSearchDoctors(searchTerm);
    }
  }, [searchTerm]);

  // برای حذف کردن
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://nowruzi.top/api/Clinic/doctors/${id}`);
      toast.success("دکتر با موفقیت حذف شد");
      fetchDoctors();
    } catch (error: any) {
      toast.error(error.response.data);
      console.log(error);
    }
  };
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">لیست دکتر</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          + افزودن دکتر
        </button>
      </div>
      {/* فرم اضافه کردن دکتر */}
      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-100 p-4 rounded-lg mb-4 grid grid-cols-2 gap-4"
        >
          <input
            placeholder="نام"
            {...register("firstName", { required: "نام الزامی است" })}
            className="border p-2 rounded"
          />
          {errors.firstName && (
            <span className="text-red-500">نام الزامی می باشد</span>
          )}

          <input
            placeholder="نام خانوادگی"
            {...register("lastName", { required: "نام خانوادگی الزامی است" })}
            className="border p-2 rounded"
          />
          {errors.lastName && (
            <span className="text-red-500">نام و نام خانوادگی الزامی است</span>
          )}

          <input
            placeholder="شماره نظام پزشکی"
            {...register("medicalLicenseNumber", {
              required: "شماره نظام پزشکی الزامی است",
              minLength: 11,
              pattern: {
                value: /^ML00\d+$/,
                message: "باید با ML00 شروع شود و بعدش عدد بیاید",
              },
            })}
            className="border p-2 rounded"
          />
          {errors.medicalLicenseNumber && (
            <span className="text-red-500">شماره نظام پزشکی الزامی میباشد</span>
          )}

          <input
            placeholder="شماره تماس"
            {...register("phoneNumber", {
              required: "شماره تماس الزامی است",
              minLength: 11,
              pattern: {
                value: /^09\d{9}$/,
                message: "شماره باید با 09 شروع شود و 11 رقم باشد",
              },
            })}
            className="border p-2 rounded"
          />
          {errors.phoneNumber && (
            <span className="text-red-500">شماره تماس الزامی است</span>
          )}
          <select
            {...register("gender", { required: "انتخاب جنسیت الزامی است" })}
            className="border p-2 rounded"
          >
            <option value={1}>مرد</option>
            <option value={2}>زن</option>
          </select>
          {errors.gender && (
            <span className="text-red-500">انتخاب جنسیت الزامی است</span>
          )}
          <select
            {...register("specialtyId", { required: "انتخاب تخصص الزامی است" })}
            className="border p-2 rounded"
          >
            <option value={0}>انتخاب تخصص</option>
            {specialties.map((sp: ISpeciality) => (
              <option key={sp.id} value={sp.id}>
                {sp.name}
              </option>
            ))}
          </select>
          {errors.specialtyId && (
            <span className="text-red-500">انتخاب تخصص الزامی است</span>
          )}

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            ثبت
          </button>
        </form>
      )}
      {/* سرچ */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="جستجوی دکتر..."
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
              <th className="px-4 py-3 text-right">تخصص</th>
              <th className="px-4 py-3 text-right">نوبت ها</th>
              <th className="px-4 py-3 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor: IDoctor, index: number) => (
              <tr key={doctor.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{doctor.fullName}</td>
                <td className="px-4 py-3">{doctor.phoneNumber}</td>
                <td className="px-4 py-3">{doctor.specialty.name}</td>
                <td className="px-4 py-3">{doctor.schedulesCount}</td>
                <td className="px-4 py-3  flex justify-center gap-2  text-center space-x-2 rtl:space-x-reverse">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(doctor.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
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
