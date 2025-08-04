import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const navItems = [
    { title: "داشبورد", path: "/" },
    { title: "بیماران", path: "/patients" },
    { title: "پزشکان", path: "/doctors" },
    { title: "نوبت‌ها", path: "/appointments" },
    { title: "تخصص‌ها", path: "/specialties" },
    { title: "برنامه‌ها", path: "/schedules" },
  ];

  return (
    <header className="bg-blue-600 text-white py-4 px-6" dir="rtl">
      <div className="container mx-auto flex items-center justify-between">
        {/* عنوان */}
        <h1 className="text-xl font-bold whitespace-nowrap">
          سیستم مدیریت کلینیک
        </h1>

        {/* منو */}
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

        {/* دکمه ورود */}
        <Link
          to="/sign-up"
          className="bg-white text-black px-4 py-2 rounded-xl shadow hover:bg-gray-100 transition"
        >
          ورود
        </Link>
      </div>
    </header>
  );
};

export default Header;
