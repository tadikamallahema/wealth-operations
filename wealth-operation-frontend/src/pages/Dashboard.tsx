import {
    useEffect,
    useState
} from "react";

import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

import socket from "../socket/socket";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Bar
} from "recharts";

import {
    AlertTriangle
} from "lucide-react";

const initialAssetData = [
    { name: "Equity", value: 400 },
    { name: "Mutual Funds", value: 300 },
    { name: "Real Estate", value: 200 }
];

const initialTransactionData = [
    { month: "Jan", transactions: 120 },
    { month: "Feb", transactions: 240 },
    { month: "Mar", transactions: 180 },
    { month: "Apr", transactions: 320 }
];

const COLORS = [
    "#06b6d4",
    "#8b5cf6",
    "#f97316"
];

export default function Dashboard() {

    const [alerts, setAlerts] =
        useState<string[]>([]);

    const [assetData, setAssetData] =
        useState(initialAssetData);

    const [transactionData, setTransactionData] =
        useState(initialTransactionData);

useEffect(() => {

   socket.on(
      "test_alert",
      (data) => {

         console.log(data);

         alert(data.message);
      }
   );

   return () => {

      socket.off("test_alert");
   };

}, []);

    return (

        <Layout>

            <div className="grid grid-cols-4 gap-5">

                <StatCard
                    title="Total Investors"
                    value="248K+"
                />

                <StatCard
                    title="AUM"
                    value="₹1.2T"
                />

                <StatCard
                    title="Escalations"
                    value="142"
                />

                <StatCard
                    title="Compliance"
                    value="99.9%"
                />

            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">

                <div
                    className="
                        bg-[#111827]
                        rounded-2xl
                        p-5
                        text-white
                    "
                >

                    <h2 className="text-2xl font-bold mb-5">
                        Asset Distribution
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={350}
                    >

                        <PieChart>

                            <Pie
                                data={assetData}
                                dataKey="value"
                                outerRadius={120}
                                label
                            >

                                {
                                    assetData.map(
                                        (_, index) => (

                                            <Cell
                                                key={index}
                                                fill={
                                                    COLORS[index]
                                                }
                                            />
                                        )
                                    )
                                }

                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

                <div
                    className="
                        bg-[#111827]
                        rounded-2xl
                        p-5
                        text-white
                    "
                >

                    <h2 className="text-2xl font-bold mb-5">
                        Monthly Transactions
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={350}
                    >

                        <BarChart
                            data={transactionData}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis dataKey="month" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="transactions"
                                fill="#06b6d4"
                                radius={[10, 10, 0, 0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

            <div
                className="
                    mt-8
                    bg-[#111827]
                    rounded-2xl
                    p-5
                    text-white
                "
            >

                <div className="flex items-center gap-3">

                    <AlertTriangle
                        className="text-red-500"
                    />

                    <h2 className="text-2xl font-bold">
                        Realtime Alerts
                    </h2>

                </div>

                <div className="mt-5 space-y-4">

                    {
                        alerts.length === 0 && (

                            <p className="text-gray-400">
                                No suspicious activity detected.
                            </p>
                        )
                    }

                    {
                        alerts.map(
                            (alert, index) => (

                                <div
                                    key={index}
                                    className="
                                        bg-red-500/10
                                        border
                                        border-red-500/20
                                        p-4
                                        rounded-xl
                                    "
                                >

                                    {alert}

                                </div>
                            )
                        )
                    }

                </div>

            </div>

        </Layout>
    );
}