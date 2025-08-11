import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Header = () => {
  const navigate = useNavigate();
  const [userFullName, setUserFullName] = useState("");
  const [logged, setLogged] = useState(false);
  const navItems = [
    { title: "داشبورد", path: "/" },
    { title: "بیماران", path: "/patients" },
    { title: "پزشکان", path: "/doctors" },
    { title: "نوبت‌ها", path: "/appointments" },
    { title: "تخصص‌ها", path: "/specialties" },
    { title: "برنامه‌ها", path: "/schedules" },
  ];

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fullName = localStorage.getItem("FullName");

    if (fullName && userId) {
      setLogged(true);
      setUserFullName(fullName);
    } else {
      setLogged(false);
      setUserFullName("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("FullName");
    setLogged(false);
    setUserFullName("");
    navigate("/");
    toast.success("با موفقیت خارج شدید");
  };

  return (
    <header className="bg-blue-600 text-white py-4 px-6 fixed top-0 w-full z-50" dir="rtl">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold whitespace-nowrap">
          سیستم مدیریت کلینیک
        </h1>

        <nav>
          <ul className="flex gap-6 text-sm font-medium">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link to={item.path} className="hover:text-gray-200 transition">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-2">
          {logged ? (
            <>
              <span className="text-white font-bold">{userFullName}</span>
              <span onClick={handleLogout} className="cursor-pointer">
                Logout
              </span>
            </>
          ) : (
            <>
              <Link
                to="/sign-up"
                className="bg-white text-black px-4 py-2 rounded-xl shadow hover:bg-gray-100 transition"
              >
                ثبت نام
              </Link>
              <Link
                to="/login"
                className="bg-white text-black px-4 py-2 rounded-xl shadow hover:bg-gray-100 transition"
              >
                ورود
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
