import {
    useEffect,
    useState
} from "react";

import Layout from "../components/Layout";
import socket from "../socket/socket";

export default function MonitorDashboard() {

    const [alerts, setAlerts] =
        useState<string[]>([]);

    useEffect(() => {

        socket.on(
            "suspicious_activity_detected",
            (data) => {

                setAlerts(prev => [
                    data.message,
                    ...prev
                ]);
            }
        );

        socket.on(
            "service_down",
            (data) => {

                setAlerts(prev => [
                    data.message,
                    ...prev
                ]);
            }
        );

        socket.on(
            "sip_failure_detected",
            (data) => {

                setAlerts(prev => [
                    data.message,
                    ...prev
                ]);
            }
        );

        return () => {

            socket.off(
                "suspicious_activity_detected"
            );

            socket.off(
                "service_down"
            );

            socket.off(
                "sip_failure_detected"
            );
        };

    }, []);

    return (

        <Layout>

            <h1 className="text-3xl font-bold text-white mb-8">
                Monitor Dashboard
            </h1>

            <div className="bg-[#111827] rounded-xl p-6">

                <h2 className="text-xl font-bold text-white mb-5">
                    Realtime Alerts
                </h2>

                {
                    alerts.length === 0 ? (

                        <p className="text-gray-400">
                            Waiting for alerts...
                        </p>

                    ) : (

                        alerts.map(
                            (
                                alert,
                                index
                            ) => (

                                <div
                                    key={index}
                                    className="
                                        bg-red-500/10
                                        border
                                        border-red-500/20
                                        p-3
                                        rounded-xl
                                        mb-3
                                        text-white
                                    "
                                >
                                    {alert}
                                </div>
                            )
                        )
                    )
                }

            </div>

        </Layout>
    );
}