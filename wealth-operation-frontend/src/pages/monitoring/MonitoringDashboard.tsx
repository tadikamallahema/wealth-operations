import SystemHealth from "./SystemHealth";
import LiveEvents from "./LiveEvents";
import ApiMetrics from "./ApiMetrics";

export default function MonitoringDashboard(){

   return(

      <div className="p-6">

         <h1 className="text-2xl font-bold mb-6">
            Monitoring Dashboard
         </h1>

         <SystemHealth />

         <ApiMetrics />

         <LiveEvents />

      </div>
   );
}