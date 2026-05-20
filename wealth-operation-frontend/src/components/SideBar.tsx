import { Link, useLocation } from "react-router-dom";

import {
    LayoutDashboard,
    Users,
    ArrowLeftRight,
    Landmark,
    Building2,
    CircleDollarSign,
    UserRound,
    Activity,
    ShieldAlert,
    ServerCog,
    BellRing
} from "lucide-react";

export default function Sidebar() {

    const location = useLocation();

    const menus = [

        {
            section: "Operations",

            items: [

                {
                    name: "Dashboard",
                    path: "/dashboard",
                    icon: <LayoutDashboard size={20} />
                },

                {
                    name: "Investors",
                    path: "/investors",
                    icon: <Users size={20} />
                },

                {
                    name: "Transactions",
                    path: "/transactions",
                    icon: <ArrowLeftRight size={20} />
                },

                {
                    name: "SIP",
                    path: "/sip",
                    icon: <CircleDollarSign size={20} />
                },

                {
                    name: "Equity",
                    path: "/equity",
                    icon: <Landmark size={20} />
                },

                {
                    name: "Mutual Funds",
                    path: "/mutual-funds",
                    icon: <Building2 size={20} />
                }
            ]
        },

        {
            section: "Monitoring",

            items: [

                {
                    name: "System Health",
                    path: "/monitoring/system-health",
                    icon: <Activity size={20} />
                },

                {
                    name: "Operational Cases",
                    path: "/monitoring/cases",
                    icon: <ShieldAlert size={20} />
                },

                {
                    name: "Service Metrics",
                    path: "/monitoring/service-metrics",
                    icon: <ServerCog size={20} />
                },

                {
                    name: "Live Alerts",
                    path: "/monitoring/live-alerts",
                    icon: <BellRing size={20} />
                }
            ]
        }
    ];

    return (

        <div
            className="w-[280px] min-h-screen bg-[#071028] border-r border-white/10 text-white px-6 py-7 flex flex-col">

            {/* LOGO */}

            <div>

                <h1
                    className="text-4xl font-black tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">

                    FinOps

                </h1>

                <p className="text-slate-400 text-sm mt-2">

                    Wealth Operations Platform

                </p>

            </div>

            {/* MENU */}

            <div className="mt-10 flex flex-col gap-8">

                {

                    menus.map((menuGroup) => (

                        <div
                            key={menuGroup.section}
                            className="flex flex-col gap-3">

                            <p className="text-xs uppercase tracking-widest text-slate-500 px-2">

                                {menuGroup.section}

                            </p>

                            {

                                menuGroup.items.map((menu) => {

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

                                                ${isActive
                                                    ?
                                                    "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 shadow-lg shadow-cyan-500/10"
                                                    :
                                                    "hover:bg-slate-800/70 text-slate-200 hover:border hover:border-cyan-500/10"
                                                }

                                            `}
                                        >

                                            <div>

                                                {menu.icon}

                                            </div>

                                            <span className="font-medium">

                                                {menu.name}

                                            </span>

                                        </Link>
                                    );
                                })
                            }

                        </div>
                    ))
                }

            </div>

            {/* PROFILE */}

            <div className="mt-auto">

                <Link
                    to="/profile"

                    className={`

                        flex items-center gap-4
                        p-4 rounded-2xl
                        border transition-all

                        ${location.pathname === "/profile"
                            ?
                            "bg-cyan-500/15 border-cyan-500/30 text-cyan-300"
                            :
                            "bg-slate-900/80 border-white/10 hover:border-cyan-500/20"
                        }

                    `}
                >

                    <UserRound size={20} />

                    <div>

                        <p className="font-medium">

                            Profile

                        </p>

                        <p className="text-xs text-slate-400">

                            Admin Settings

                        </p>

                    </div>

                </Link>

            </div>

        </div>
    );
}