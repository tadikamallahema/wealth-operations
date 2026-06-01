import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

export default function ComplianceDashboard() {

    return (

        <Layout>

            <h1 className="text-3xl font-bold text-white mb-8">
                Compliance Dashboard
            </h1>

            <div className="grid grid-cols-4 gap-5">

                <StatCard
                    title="Flagged Investors"
                    value="18"
                />

                <StatCard
                    title="Open Cases"
                    value="9"
                />

                <StatCard
                    title="AML Alerts"
                    value="12"
                />

                <StatCard
                    title="Audit Reviews"
                    value="45"
                />

            </div>

        </Layout>
    );
}