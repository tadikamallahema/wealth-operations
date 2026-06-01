import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

export default function OperationsDashboard() {

    return (

        <Layout>

            <h1 className="text-3xl font-bold text-white mb-8">
                Operations Dashboard
            </h1>

            <div className="grid grid-cols-4 gap-5">

                <StatCard
                    title="Pending Reviews"
                    value="34"
                />

                <StatCard
                    title="Transactions"
                    value="1200"
                />

                <StatCard
                    title="Failed SIPs"
                    value="16"
                />

                <StatCard
                    title="Investor Requests"
                    value="49"
                />

            </div>

        </Layout>
    );
}