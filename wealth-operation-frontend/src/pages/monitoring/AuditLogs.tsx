import { useEffect, useState } from "react";
import axios from "axios";
import {
  ShieldAlert,
  CheckCircle,
  XCircle,
  Activity,
} from "lucide-react";
import Layout from "../../components/Layout";

type Audit = {
  audit_id: number;

  pan_number: string | null;
  service_name: string | null;

  user_id: string | number | null;

  role_id: number | null;

  action_type: string | null;
  entity_type: string | null;
  entity_id: string | null;

  action_status: string | null;

  endpoint: string | null;

  request_method: string | null;

  ip_address: string | null;

  created_at: string;
};

export default function AuditLogs() {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAudits();
  }, []);

  const fetchAudits = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4004/api/audit"
      );

      console.log(response.data.data);

      setAudits(response.data.data || []);
    } catch (error) {
      console.error("Error fetching audits", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAudits = audits.filter((audit) => {
    const user = String(audit.user_id || "").toLowerCase();

    const action = String(
      audit.action_type || ""
    ).toLowerCase();

    const endpoint = String(
      audit.endpoint || ""
    ).toLowerCase();

    const searchValue = search.toLowerCase();

    return (
      user.includes(searchValue) ||
      action.includes(searchValue) ||
      endpoint.includes(searchValue)
    );
  });

  const failedLogs = audits.filter(
    (a) => a.action_status === "FAILED"
  ).length;

  const successLogs = audits.filter(
    (a) => a.action_status === "SUCCESS"
  ).length;

  const suspiciousLogs = audits.filter(
    (a) =>
      a.action_status === "FAILED" ||
      a.action_type === "DELETE"
  ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-bold">
        Loading Audit Logs...
      </div>
    );
  }

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">
          Audit Logs Dashboard
        </h1>

        <input
          type="text"
          placeholder="Search user/action/endpoint"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border bg-white rounded-xl px-4 py-3 outline-none w-full md:w-80"
        />
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* SUCCESS */}

        <div className="bg-white rounded-2xl p-5 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Successful Actions
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {successLogs}
              </h2>
            </div>

            <CheckCircle
              className="text-green-500"
              size={42}
            />
          </div>
        </div>

        {/* FAILED */}

        <div className="bg-white rounded-2xl p-5 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Failed Actions
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {failedLogs}
              </h2>
            </div>

            <XCircle
              className="text-red-500"
              size={42}
            />
          </div>
        </div>

        {/* SUSPICIOUS */}

        <div className="bg-white rounded-2xl p-5 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Suspicious Activities
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {suspiciousLogs}
              </h2>
            </div>

            <ShieldAlert
              className="text-orange-500"
              size={42}
            />
          </div>
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Activity size={22} />
            Audit Activity
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-4">
                  User
                </th>

                <th className="text-left p-4">
                  Action
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Endpoint
                </th>

                <th className="text-left p-4">
                  Method
                </th>

                <th className="text-left p-4">
                  IP Address
                </th>

                <th className="text-left p-4">
                  Time
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAudits.map((audit) => {
                const suspicious =
                  audit.action_status === "FAILED" ||
                  audit.action_type === "DELETE";

                return (
                  <tr
                    key={audit.audit_id}
                    className={`border-b hover:bg-gray-50 transition ${
                      suspicious
                        ? "bg-red-50"
                        : ""
                    }`}
                  >
                    {/* USER */}

                    <td className="p-4 font-medium">
                      {audit.user_id || "N/A"}
                    </td>

                    {/* ACTION */}

                    <td className="p-4">
                      {audit.action_type || "N/A"}
                    </td>

                    {/* STATUS */}

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          audit.action_status ===
                          "SUCCESS"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {audit.action_status || "N/A"}
                      </span>
                    </td>

                    {/* ENDPOINT */}

                    <td className="p-4">
                      {audit.endpoint || "N/A"}
                    </td>

                    {/* METHOD */}

                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {audit.request_method ||
                          "N/A"}
                      </span>
                    </td>

                    {/* IP */}

                    <td className="p-4">
                      {audit.ip_address || "N/A"}
                    </td>

                    {/* TIME */}

                    <td className="p-4">
                      {audit.created_at
                        ? new Date(
                            audit.created_at
                          ).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredAudits.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-lg">
              No audit logs found
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>
  );
}