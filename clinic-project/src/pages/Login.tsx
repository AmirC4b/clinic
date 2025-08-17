import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleLogin = async (data: any) => {
    try {
      const response = await axios.post("https://nowruzi.top/api/User/Login", {
        mobile: data.mobile,
        password: data.password,
      });

      console.log("ورود با موفقیت انجام شد", response.data);
      toast("ثبت‌ نام با موفقیت انجام شد ✅");

      localStorage.setItem("userId", response.data.data.id);
      localStorage.setItem("FullName", response.data.data.fullName);
      navigate("/");
      reset();
    } catch (error) {
      console.error("خطا در ورود:", error);
      toast(error.response.data.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col">
        <label className="font-semibold mb-1">Mobile</label>
        <input
          type="text"
          {...register("mobile", { required: true, minLength: 11 })}
          className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm mb-2">شماره موبایل الزامی است</p>
        )}

        <label className="font-semibold mb-1">Password</label>
        <input
          type="password"
          {...register("password", { required: true })}
          className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">رمز عبور الزامی است</p>
        )}

        <button
          type="submit"
          className=" cursor-pointer mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
