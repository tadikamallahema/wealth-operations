// ============================================
// ApiMetrics.tsx
// ============================================

import { useEffect, useState }
from "react";

import axios from "axios";

export default function ApiMetrics(){

   const [metrics, setMetrics] =
      useState<any>(null);

   useEffect(() => {

      axios.get(
         "http://localhost:4004/metrics/performance",
         {
            withCredentials: true
         }
      )
      .then((res) => {

         setMetrics(res.data);
      });

   }, []);

   if(!metrics){

      return <p>Loading...</p>;
   }

   return(

      <div className="grid grid-cols-3 gap-5 mb-8">

         <div className="bg-slate-900 p-5 rounded-2xl">

            <h2 className="mb-2">
               Avg Latency
            </h2>

            <p className="text-cyan-400 text-xl">
               {metrics.avgLatency} ms
            </p>

         </div>

         <div className="bg-slate-900 p-5 rounded-2xl">

            <h2 className="mb-2">
               Failed Requests
            </h2>

            <p className="text-red-400 text-xl">
               {metrics.failedRequests}
            </p>

         </div>

         <div className="bg-slate-900 p-5 rounded-2xl">

            <h2 className="mb-2">
               Slowest API
            </h2>

            <p className="text-yellow-400 text-xl">
               {metrics.slowestApi}
            </p>

         </div>

      </div>
   );
}