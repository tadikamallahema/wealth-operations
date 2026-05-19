import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

import {PieChart,Pie,Cell,Tooltip,ResponsiveContainer,BarChart,XAxis,YAxis,CartesianGrid,Bar} from "recharts";

const assetData = [
    { name: "Equity", value: 400 },
    { name: "Mutual Funds", value: 300 },
    { name: "Real Estate", value: 200 }
];

const transactionData = [
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
    return (
        <Layout>
            <div className="grid grid-cols-4 gap-5">
                <StatCard title="Total Investors" value="248K+"/>

                <StatCard title="AUM" value="₹1.2T"
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

        </Layout>
    );
}