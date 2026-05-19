import { Link } from "react-router-dom";

import {
    LayoutDashboard,
    Users,
    ArrowLeftRight,
    Landmark,
    Building2,
    CircleDollarSign,
    UserRound
} from "lucide-react";

export default function Sidebar() {

    const menus = [
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
        },
        {
            name: "Profile",
            path: "/profile",
            icon: <UserRound size={20} />
        }
    ];

    return (

        <div
            className="
                w-[260px]
                bg-[#0b1120]
                border-r
                border-white/10
                text-white
                p-6
                flex
                flex-col
            "
        >

            <h1
                className="
                    text-4xl
                    font-bold
                    bg-gradient-to-r
                    from-cyan-400
                    to-violet-500
                    bg-clip-text
                    text-transparent
                "
            >
                AetherOps
            </h1>

            <div className="mt-10 flex flex-col gap-3">

                {
                    menus.map((menu) => (

                        <Link
                            key={menu.name}
                            to={menu.path}
                            className="
                                flex
                                items-center
                                gap-4
                                p-4
                                rounded-xl
                                hover:bg-cyan-500/10
                                hover:border
                                hover:border-cyan-500/20
                                transition-all
                            "
                        >

                            {menu.icon}

                            <span>{menu.name}</span>

                        </Link>
                    ))
                }

            </div>

        </div>
    );
}