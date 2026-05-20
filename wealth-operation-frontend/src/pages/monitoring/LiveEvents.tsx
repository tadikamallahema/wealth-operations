import { useEffect, useState } from "react";

import socket from "../../socket/socket";

export default function LiveEvents(){

   const [events, setEvents] =
      useState<any[]>([]);

   useEffect(() => {

      socket.on(
         "test_alert",
         (data) => {

            setEvents(prev => [

               data,

               ...prev
            ]);
         }
      );

      return () => {

         socket.off("test_alert");
      };

   }, []);

   return(

      <div className="bg-slate-900 p-4 rounded-xl mt-6">

         <h2 className="text-xl mb-4">
            Live Events
         </h2>

         {

            events.map((event, idx) => (

               <div
                  key={idx}
                  className="border-b border-slate-700 py-2"
               >
                  {event.message}
               </div>
            ))
         }

      </div>
   );
}