import axios from "axios";
import {Bell,Search} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate=useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:4004/api/auth/logout",
                {},
                {withCredentials: true}
            );
            navigate("/", { replace: true });
        } catch (err:any) {
            console.error("Logout failed:",err.response?.data || err.message);
        }
    };

    return (
        <div
            className=" h-[80px] bg-[#0f172a] border-b border-white/10 px-8 flex justify-between items-center text-white">
            <h1 className="text-2xl font-semibold">Wealth Operations Dashboard</h1>
            <div className="flex items-center gap-5">
                <div
                    className=" flex items-center gap-3 bg-[#111827] px-4 py-3  rounded-xl">
                    <Search size={18} />
                  <input
                        type="text"
                        placeholder="Search..."
                        className=" bg-transparentoutline-none" />
                </div>
                <button
                    className=" relative bg-[#111827] p-3 rounded-xl">
                    <Bell />
                    <div
                        className=" absolute top-2 right-2 w-2 h-2 rounded-fullbg-red-500"/>
                </button>
                <button
                    className=" bg-gradient-to-r from-red-500 to-pink-500 px-5 py-3 rounded-xl"
                    onClick={handleLogout}>Logout
                </button>
            </div>
        </div>
    );
}