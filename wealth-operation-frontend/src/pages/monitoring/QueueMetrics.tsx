// ============================================
// QueueMetrics.tsx
// ============================================

import { useEffect, useState }
from "react";

import axios from "axios";

export default function QueueMetrics(){

   const [queueData, setQueueData] =
      useState<any>(null);

   useEffect(() => {

      axios.get(
         "http://localhost:4004/metrics/queues",
         {
            withCredentials: true
         }
      )
      .then((res) => {

         setQueueData(res.data);
      });

   }, []);

   if(!queueData){

      return <p>Loading...</p>;
   }

   return(

      <div className="grid grid-cols-3 gap-5 mb-8">

         <div className="bg-slate-900 p-5 rounded-2xl">

            <h2 className="mb-2">
               Waiting Jobs
            </h2>

            <p className="text-cyan-400 text-xl">
               {queueData.waiting}
            </p>

         </div>

         <div className="bg-slate-900 p-5 rounded-2xl">

            <h2 className="mb-2">
               Active Jobs
            </h2>

            <p className="text-green-400 text-xl">
               {queueData.active}
            </p>

         </div>

         <div className="bg-slate-900 p-5 rounded-2xl">

            <h2 className="mb-2">
               Failed Jobs
            </h2>

            <p className="text-red-400 text-xl">
               {queueData.failed}
            </p>

         </div>

      </div>
   );
}