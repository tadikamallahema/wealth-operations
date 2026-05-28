import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

type Investor = {
   investor_id: string;
   total_holdings: number;
   exchanges: string[];
};

export default function Investors() {

   const [investors, setInvestors] =
      useState<Investor[]>([]);

   useEffect(() => {
      fetchInvestors();
   }, []);

   const fetchInvestors = async () => {

      try {

         const response = await axios.get(
            "http://localhost:4004/api/portfolio"
         );

         console.log(response.data);

         const portfolio =
            response.data.portfolio;

         const holdings =
            portfolio?.equity?.holdings || [];

         const groupedInvestors: any = {};

         holdings.forEach((holding: any) => {

            const investorId =
               holding.investor_id;

            if (!groupedInvestors[investorId]) {

               groupedInvestors[investorId] = {

                  investor_id: investorId,

                  total_holdings: 0,

                  exchanges: []

               };
            }

            groupedInvestors[
               investorId
            ].total_holdings += 1;

            if (
               !groupedInvestors[
                  investorId
               ].exchanges.includes(
                  holding.exchange
               )
            ) {

               groupedInvestors[
                  investorId
               ].exchanges.push(
                  holding.exchange
               );
            }

         });

         setInvestors(
            Object.values(groupedInvestors)
         );

      } catch (error) {

         console.log(error);

      }
   };

   return (

      <div className="dashboard-layout text-white">

         <Layout>

            <div className="main-content">

               <div className="p-8 bg-[#071028] min-h-screen">

                  {/* ================================= */}
                  {/* HEADER */}
                  {/* ================================= */}

                  <div className="flex justify-between items-center mb-10">

                     <div>

                        <h1 className="text-4xl font-bold">

                           Investors

                        </h1>

                        <p className="text-slate-400 mt-2">

                           Investor portfolio overview

                        </p>

                     </div>

                     <div
                        className="
                           bg-cyan-500
                           text-black
                           px-5
                           py-2
                           rounded-xl
                           font-bold
                        "
                     >

                        Active Users

                     </div>

                  </div>

                  {/* ================================= */}
                  {/* METRICS */}
                  {/* ================================= */}

                  <div className="grid grid-cols-2 gap-6 mb-10">

                     <div
                        className="
                           bg-gradient-to-br
                           from-cyan-600
                           to-cyan-900
                           rounded-2xl
                           p-6
                        "
                     >

                        <p className="text-cyan-100">

                           Total Investors

                        </p>

                        <h2 className="text-5xl font-bold mt-3">

                           {investors.length}

                        </h2>

                     </div>

                     <div
                        className="
                           bg-gradient-to-br
                           from-purple-600
                           to-indigo-900
                           rounded-2xl
                           p-6
                        "
                     >

                        <p className="text-purple-100">

                           Total Holdings

                        </p>

                        <h2 className="text-5xl font-bold mt-3">

                           {
                              investors.reduce(
                                 (
                                    acc,
                                    investor
                                 ) =>

                                    acc +
                                    investor.total_holdings,

                                 0
                              )
                           }

                        </h2>

                     </div>

                  </div>

                  {/* ================================= */}
                  {/* INVESTOR TABLE */}
                  {/* ================================= */}

                  <div
                     className="
                        bg-slate-900
                        border
                        border-slate-800
                        rounded-2xl
                        p-6
                     "
                  >

                     <div className="mb-6">

                        <h2 className="text-2xl font-bold">

                           Investor List

                        </h2>

                     </div>

                     <div className="overflow-x-auto">

                        <table className="w-full">

                           <thead>

                              <tr
                                 className="
                                    border-b
                                    border-slate-700
                                    text-left
                                 "
                              >

                                 <th className="pb-4">

                                    Investor ID

                                 </th>

                                 <th className="pb-4">

                                    Holdings

                                 </th>

                                 <th className="pb-4">

                                    Exchanges

                                 </th>

                                 <th className="pb-4">

                                    Status

                                 </th>

                              </tr>

                           </thead>

                           <tbody>

                              {
                                 investors.map(
                                    (
                                       investor,
                                       index
                                    ) => (

                                       <tr
                                          key={index}

                                          className="
                                             border-b
                                             border-slate-800
                                             hover:bg-slate-800/40
                                             transition-all
                                          "
                                       >

                                          <td
                                             className="
                                                py-5
                                                font-semibold
                                             "
                                          >

                                             {
                                                investor.investor_id
                                             }

                                          </td>

                                          <td className="py-5">

                                             {
                                                investor.total_holdings
                                             }

                                          </td>

                                          <td className="py-5">

                                             <div className="flex gap-2">

                                                {
                                                   investor.exchanges.map(
                                                      (
                                                         exchange: string,
                                                         idx: number
                                                      ) => (

                                                         <span
                                                            key={idx}

                                                            className="
                                                               bg-cyan-500/20
                                                               text-cyan-400
                                                               px-3
                                                               py-1
                                                               rounded-full
                                                               text-sm
                                                            "
                                                         >

                                                            {
                                                               exchange
                                                            }

                                                         </span>
                                                      )
                                                   )
                                                }

                                             </div>

                                          </td>

                                          <td className="py-5">

                                             <span
                                                className="
                                                   bg-green-500/20
                                                   text-green-400
                                                   px-3
                                                   py-1
                                                   rounded-full
                                                   text-sm
                                                   font-semibold
                                                "
                                             >

                                                ACTIVE

                                             </span>

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

            </div>

         </Layout>

      </div>
   );
}