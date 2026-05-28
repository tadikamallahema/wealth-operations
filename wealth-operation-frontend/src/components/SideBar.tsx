import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  Landmark,
  Building2,
  UserRound,
  Activity,
  ShieldAlert,
  BadgeAlert,
} from "lucide-react";
import type { JSX } from "react";

export type Role =
  | "Admin"
  | "Operations_manager"
  | "Compliance_officer"
  | "Monitor";

type MenuItem = {
  name: string;
  path: string;
  icon: JSX.Element;
};

type MenuSection = {
  section: string;
  items: MenuItem[];
};

export default function Sidebar() {
  const location = useLocation();

  // TEMP ROLE
  // later get from token/auth context

  const role: Role =
    (localStorage.getItem("role") as Role) || "Admin";

  const menuByRole: Record<Role, MenuSection[]> = {
    // ================= ADMIN =================

    Admin: [
      {
        section: "Operations",

        items: [
          {
            name: "Dashboard",
            path: "/dashboard/admin",
            icon: <LayoutDashboard size={20} />,
          },

          {
            name: "Investors",
            path: "/investors",
            icon: <Users size={20} />,
          },

          {
            name: "Transactions",
            path: "/transactions",
            icon: <ArrowLeftRight size={20} />,
          },

          {
            name: "Equity",
            path: "/equity",
            icon: <Landmark size={20} />,
          },

          {
            name: "Mutual Funds",
            path: "/mutual-funds",
            icon: <Building2 size={20} />,
          },
        ],
      },

      {
        section: "Security & Monitoring",

        items: [
          {
            name: "Monitor Dashboard",
            path: "/monitoring",
            icon: <ShieldAlert size={20} />,
          },

          {
            name: "Audit Logs",
            path: "/audit",
            icon: <Activity size={20} />,
          },

          
        ],
      },

      
    ],

    // ================= OPERATIONS =================

    Operations_manager: [
      {
        section: "Operations",

        items: [
          {
            name: "Dashboard",
            path: "/dashboard/operations",
            icon: <LayoutDashboard size={20} />,
          },

          {
            name: "Investors",
            path: "/investors",
            icon: <Users size={20} />,
          },

          {
            name: "Transactions",
            path: "/transactions",
            icon: <ArrowLeftRight size={20} />,
          },

          {
            name: "Equity",
            path: "/equity",
            icon: <Landmark size={20} />,
          },

          {
            name: "Mutual Funds",
            path: "/mutual-funds",
            icon: <Building2 size={20} />,
          },
        ],
      },
    ],

    // ================= COMPLIANCE =================

    Compliance_officer: [
      {
        section: "Compliance",

        items: [
          {
            name: "Dashboard",
            path: "/dashboard/compliance",
            icon: <LayoutDashboard size={20} />,
          },

          {
            name: "Audit Logs",
            path: "/audit",
            icon: <Activity size={20} />,
          },


          {
            name: "Fraud Detection",
            path: "/fraud-detection",
            icon: <BadgeAlert size={20} />,
          },
        ],
      },
    ],

    // ================= MONITOR =================

    Monitor: [
      {
        section: "Monitoring",

        items: [
          {
            name: "Dashboard",
            path: "/dashboard/monitor",
            icon: <LayoutDashboard size={20} />,
          },

          {
            name: "Monitor Dashboard",
            path: "/monitoring",
            icon: <ShieldAlert size={20} />,
          },

          {
            name: "Audit Logs",
            path: "/audit",
            icon: <Activity size={20} />,
          },

        
        ],
      },
    ],
  };

  const menus = menuByRole[role];

  return (
    <div className="w-[280px] min-h-screen bg-[#071028] border-r border-white/10 text-white px-6 py-7 flex flex-col">
      {/* LOGO */}

      <div>
        <h1 className="text-4xl font-black tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
          FinOps
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          Wealth Operations Platform
        </p>
      </div>

      {/* ROLE */}

      <div className="mt-6 bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-4 py-3">
        <p className="text-xs text-slate-400">
          Logged in as
        </p>

        <p className="font-semibold text-cyan-300">
          {role.replace("_", " ")}
        </p>
      </div>

      {/* MENU */}

      <div className="mt-10 flex flex-col gap-8">
        {menus.map((menuGroup) => (
          <div
            key={menuGroup.section}
            className="flex flex-col gap-3"
          >
            <p className="text-xs uppercase tracking-widest text-slate-500 px-2">
              {menuGroup.section}
            </p>

            {menuGroup.items.map((menu) => {
              const isActive =
                location.pathname === menu.path;

              return (
                <Link
                  key={menu.name}
                  to={menu.path}
                  className={`
                    flex items-center gap-4
                    p-4 rounded-2xl
                    transition-all duration-300

                    ${
                      isActive
                        ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 shadow-lg shadow-cyan-500/10"
                        : "hover:bg-slate-800/70 text-slate-200 hover:border hover:border-cyan-500/10"
                    }
                  `}
                >
                  <div>{menu.icon}</div>

                  <span className="font-medium">
                    {menu.name}
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* PROFILE */}

      <div className="mt-auto">
        <Link
          to="/profile"
          className={`
            flex items-center gap-4
            p-4 rounded-2xl
            border transition-all

            ${
              location.pathname === "/profile"
                ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-300"
                : "bg-slate-900/80 border-white/10 hover:border-cyan-500/20"
            }
          `}
        >
          <UserRound size={20} />

          <div>
            <p className="font-medium">Profile</p>

            <p className="text-xs text-slate-400">
              Account Settings
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}