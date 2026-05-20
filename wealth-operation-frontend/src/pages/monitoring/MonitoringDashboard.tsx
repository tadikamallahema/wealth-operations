import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function MonitoringDashboard() {

   const [logs, setLogs] = useState<any[]>([]);

   useEffect(() => {

      fetchLogs();

      const interval = setInterval(() => {

         fetchLogs();

      }, 10000);

      return () => clearInterval(interval);

   }, []);

   const fetchLogs = async () => {

      try {

         const response = await axios.get(
            "http://localhost:4004/api/monitoring/logs"
         );

         setLogs(response.data.logs);

      } catch (error) {

         console.log(error);

      }

   };

   return (

      <Layout>

         <div className="min-h-screen bg-[#020617] text-white p-8">

            {/* HEADER */}

            <div className="mb-10">

               <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                  Monitoring Dashboard

               </h1>

               <p className="text-slate-400 mt-3">

                  Real-time telemetry monitoring

               </p>

            </div>

            {/* METRICS */}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

               <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

                  <p className="text-slate-400">

                     Total Requests

                  </p>

                  <h2 className="text-5xl font-black text-cyan-400 mt-4">

                     {logs.length}

                  </h2>

               </div>

               <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

                  <p className="text-slate-400">

                     Errors

                  </p>

                  <h2 className="text-5xl font-black text-red-400 mt-4">

                     {
                        logs.filter(
                           (log) =>
                              log.status >= 400
                        ).length
                     }

                  </h2>

               </div>

               <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

                  <p className="text-slate-400">

                     APIs Used

                  </p>

                  <h2 className="text-5xl font-black text-purple-400 mt-4">

                     {
                        new Set(
                           logs.map(
                              (log) => log.url
                           )
                        ).size
                     }

                  </h2>

               </div>

               <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

                  <p className="text-slate-400">

                     Avg Response

                  </p>

                  <h2 className="text-5xl font-black text-emerald-400 mt-4">

                     {
                        logs.length > 0

                           ?

                           (
                              logs.reduce(

                                 (acc, log) =>

                                    acc +
                                    parseInt(
                                       log.duration
                                    ),

                                 0
                              ) / logs.length
                           ).toFixed(0)

                           :

                           0
                     }ms

                  </h2>

               </div>

            </div>

            {/* LOG TABLE */}

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">

               <div className="px-8 py-6 border-b border-slate-800">

                  <h2 className="text-3xl font-bold">

                     Live Request Logs

                  </h2>

               </div>

               <div className="overflow-x-auto">

                  <table className="w-full">

                     <thead className="bg-slate-950">

                        <tr className="text-left text-slate-400 uppercase text-sm">

                           <th className="px-6 py-4">

                              Method

                           </th>

                           <th className="px-6 py-4">

                              URL

                           </th>

                           <th className="px-6 py-4">

                              Status

                           </th>

                           <th className="px-6 py-4">

                              Duration

                           </th>

                           <th className="px-6 py-4">

                              Browser

                           </th>

                           <th className="px-6 py-4">

                              OS

                           </th>

                        </tr>

                     </thead>

                     <tbody>

                        {

                           logs.map(

                              (
                                 log,
                                 index
                              ) => (

                                 <tr
                                    key={index}
                                    className="border-t border-slate-800 hover:bg-slate-800/30"
                                 >

                                    <td className="px-6 py-5">

                                       {log.method}

                                    </td>

                                    <td className="px-6 py-5">

                                       {log.url}

                                    </td>

                                    <td className="px-6 py-5">

                                       <span
                                          className={`

                                          px-3 py-1 rounded-full text-sm

                                          ${
                                             log.status >= 400

                                                ?

                                                "bg-red-500/10 text-red-400"

                                                :

                                                "bg-green-500/10 text-green-400"
                                          }

                                          `}
                                       >

                                          {log.status}

                                       </span>

                                    </td>

                                    <td className="px-6 py-5">

                                       {log.duration}

                                    </td>

                                    <td className="px-6 py-5">

                                       {log.browser}

                                    </td>

                                    <td className="px-6 py-5">

                                       {log.os}

                                    </td>

                                 </tr>
                              )
                           )
                        }

                     </tbody>

                  </table>

               </div>

            </div>

         </div>

      </Layout>
   );
}