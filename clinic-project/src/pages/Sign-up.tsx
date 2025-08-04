import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const postData = async (data: any) => {
    try {
      const response = await axios.post(
        "https://nowruzi.top/api/User/Register",
        {
          mobile: data.mobile,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        }
      );

      console.log("ثبت نام با موفقیت انجام شد", response.data);
      toast("ثبت‌نام با موفقیت انجام شد ✅");

      localStorage.setItem("userId", response.data.data.id);
      localStorage.setItem("FullName", response.data.data.fullName);
      navigate("/login");
      reset();
    } catch (error) {
      console.error("خطا در ثبت‌نام:", error);
      toast(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg font-sans">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h2 className="text-center text-3xl font-semibold mb-8 text-gray-800">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit(postData)} className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Mobile</label>
        <input
          type="text"
          {...register("mobile", { required: true, minLength: 11 })}
          className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-[15px] focus:outline-none focus:border-blue-500 transition"
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm mb-2">شماره موبایل الزامی است</p>
        )}

        <label className="mb-1 font-medium text-gray-700">Password</label>
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-[15px] focus:outline-none focus:border-blue-500 transition"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">رمز عبور الزامی است</p>
        )}

        <label className="mb-1 font-medium text-gray-700">First Name</label>
        <input
          type="text"
          {...register("firstName", { required: true })}
          className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-[15px] focus:outline-none focus:border-blue-500 transition"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mb-2">نام الزامی است</p>
        )}

        <label className="mb-1 font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          {...register("lastName", { required: true })}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg text-[15px] focus:outline-none focus:border-blue-500 transition"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mb-2">نام خانوادگی الزامی است</p>
        )}

        <button
          type="submit"
          className="cursor-pointer w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-[16px] font-semibold rounded-lg transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
