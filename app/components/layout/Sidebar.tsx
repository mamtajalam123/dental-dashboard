"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  Users,
  MessageSquare,
  ImageIcon,
  Mail,
  Tags,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    href: "/dashboard/appointments",
    icon: CalendarDays,
  },
  {
    title: "Services",
    href: "/dashboard/services",
    icon: Stethoscope,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Feedback",
    href: "/dashboard/feedback",
    icon: MessageSquare,
  },
  {
    title: "Gallery",
    href: "/dashboard/gallery",
    icon: ImageIcon,
  },
  {
    title: "Contact Messages",
    href: "/dashboard/contact",
    icon: Mail,
  },
  {
 title:"Categories",
 href:"/dashboard/categories",
 icon:Tags
}
 
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        hidden
        lg:flex
        fixed
        left-0
        top-0
        z-40
        h-screen
        w-[270px]
        flex-col
        border-r
        border-slate-200
        bg-white
      "
    >
      {/* Logo */}

      <div className="flex items-center gap-3 border-b border-slate-200 p-6">
        <Image
          src="/logo/logo.png"
          alt="Logo"
          width={48}
          height={48}
          priority
        />

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            DR. SULTAN
          </h2>

          <p className="text-sm text-slate-500">
            DENTAL CARE
          </p>
        </div>
      </div>

      {/* Menu */}

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {menus.map((item) => {
            const Icon = item.icon;

          const active =
  item.href === "/dashboard"
    ? pathname === "/dashboard"
    : pathname === item.href ||
      pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all ${
                  active
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                }`}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}

      <div className="border-t border-slate-200 p-5">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-800">
            Dr. Sultan Dental Care
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Dashboard v1.0.0
          </p>
        </div>
      </div>
    </aside>
  );
}