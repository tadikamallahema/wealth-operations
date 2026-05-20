import Layout from "../components/Layout";
import { motion } from "framer-motion";
import {
    User,
    Mail,
    ShieldCheck
} from "lucide-react";
export default function Profile() {

    return (

        <Layout>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                    bg-[#111827]
                    p-8
                    rounded-3xl
                    shadow-lg
                    border
                    border-cyan-500/20
                    text-white
                    max-w-2xl
                "
            >
                <div className="flex items-center gap-5">

                    <div
                        className="
                            w-24
                            h-24
                            rounded-full
                            bg-gradient-to-r
                            from-cyan-500
                            to-violet-500
                            flex
                            justify-center
                            items-center
                            text-4xl
                            font-bold
                        "
                    >
                        A
                    </div>
                     <div>

                        <h1 className="text-4xl font-bold">
                            Admin
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Wealth Operations Manager
                        </p>

                    </div>

                </div>

                <div className="mt-10 space-y-5">

                    <div className="flex items-center gap-4">

                        <User className="text-cyan-400" />

                        <p>Admin User</p>

                    </div>

                    <div className="flex items-center gap-4">

                        <Mail className="text-violet-400" />
                         <p>admin@gmail.com</p>

                    </div>

                    <div className="flex items-center gap-4">

                        <ShieldCheck className="text-green-400" />

                        <p>Super Admin Access</p>

                    </div>

                </div>

            </motion.div>

        </Layout>
    );
}