import { NavLink } from "react-router-dom";
import {
  BarChart2,
  Users,
  User,
  Calendar,
  Stethoscope,
  ClipboardList,
  FileBarChart,
  Settings,
} from "lucide-react"; // استفاده از آیکون‌های lucide

const navItems = [
  { title: "داشبورد", to: "/", icon: <BarChart2 size={20} /> },
  { title: "مدیریت بیماران", to: "/patients", icon: <Users size={20} /> },
  { title: "مدیریت پزشکان", to: "/doctors", icon: <User size={20} /> },
  {
    title: "مدیریت نوبت‌ها",
    to: "/appointments",
    icon: <Calendar size={20} />,
  },
  {
    title: "تخصص‌های پزشکی",
    to: "/specialties",
    icon: <Stethoscope size={20} />,
  },
  {
    title: "برنامه‌های کاری",
    to: "/schedules",
    icon: <ClipboardList size={20} />,
  },
  { title: "گزارشات", to: "/reports", icon: <FileBarChart size={20} /> },
  { title: "تنظیمات سیستم", to: "/settings", icon: <Settings size={20} /> },
];

const Sidebar = () => {
  return (
    <aside
      className="w-64 bg-white border-l border-gray-200 h-screen flex flex-col justify-between px-4 py-6 text-sm"
      dir="rtl"
    >
      <div>
        <h2 className="text-lg font-bold mb-6 text-center">منوی مدیریت</h2>
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center text-gray-400 text-xs">نسخه ۱.۰.۰</div>
    </aside>
  );
};

export default Sidebar;
