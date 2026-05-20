import { useEffect, useState } from "react";
import axios from "axios";

export default function SystemHealth(){

   const [health, setHealth] =
      useState<any>(null);

   useEffect(() => {

      axios.get(
         "http://localhost:4004/metrics/system",
         {
            withCredentials: true
         }
      )
      .then((res) => {

         setHealth(res.data);
      });

   }, []);

   if(!health){

      return <p>Loading...</p>;
   }

   return(

      <div className="grid grid-cols-4 gap-4 mb-6">

         <div className="bg-slate-900 p-4 rounded-xl">
            Redis: {health.redis}
         </div>

         <div className="bg-slate-900 p-4 rounded-xl">
            Postgres: {health.postgres}
         </div>

         <div className="bg-slate-900 p-4 rounded-xl">
            Socket.IO: {health.socket}
         </div>

         <div className="bg-slate-900 p-4 rounded-xl">
            MF Service: {health.mfService}
         </div>

      </div>
   );
}