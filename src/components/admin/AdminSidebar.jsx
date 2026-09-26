import {
  LayoutDashboard,
  Mail,
  Package,
  Settings,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Enquiries",
    path: "/admin/enquiries",
    icon: Mail,
  },
  {
    title: "Services",
    path: "/admin/services",
    icon: Settings,
  },
  {
    title: "Clients",
    path: "/admin/clients",
    icon: Users,
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: Package,
  },
];

function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-800 bg-slate-950 text-white">
      <div className="flex h-20 items-center border-b border-slate-800 px-6">
        <div>
          <h1 className="text-lg font-bold tracking-wide">
            ALLGEO SOLUTIONS
          </h1>

          <p className="text-xs text-slate-400">
            Admin Panel
          </p>
        </div>
      </div>

      <nav className="space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white text-slate-950! [&_svg]:text-slate-950!"
                    : "text-slate-300! hover:bg-slate-900 hover:text-white!"
                }`
              }
            >
              <Icon size={18} />
              {item.title}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default AdminSidebar;