import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function Equity() {

   const [portfolio, setPortfolio] =
      useState<any>(null);

   useEffect(() => {
      fetchPortfolio();
   }, []);

   const fetchPortfolio = async () => {

      try {

         const response = await axios.get(
            "http://localhost:4004/api/portfolio"
         );

         setPortfolio(response.data.portfolio);

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

                           Equity Portfolio

                        </h1>

                        <p className="text-slate-400 mt-2">

                           Monitor holdings, market prices and transactions

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

                        NSE / BSE

                     </div>

                  </div>

                  {/* ================================= */}
                  {/* SUMMARY */}
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

                           Total Holdings

                        </p>

                        <h2 className="text-5xl font-bold mt-3">

                           {
                              portfolio?.summary
                                 ?.equityHoldingsCount
                           }

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

                           Transactions

                        </p>

                        <h2 className="text-5xl font-bold mt-3">

                           {
                              portfolio?.summary
                                 ?.equityTransactionsCount
                           }

                        </h2>

                     </div>

                  </div>

                  {/* ================================= */}
                  {/* HOLDINGS */}
                  {/* ================================= */}

                  <div className="mb-12">

                     <h2 className="text-2xl font-bold mb-6">

                        Holdings

                     </h2>

                     <div className="grid grid-cols-2 gap-6">

                        {
                           portfolio?.equity?.holdings?.map(
                              (holding: any) => (

                                 <div
                                    key={holding.id}

                                    className="
                                       bg-slate-900
                                       border
                                       border-slate-800
                                       rounded-2xl
                                       p-6
                                       hover:border-cyan-500/30
                                       transition-all
                                    "
                                 >

                                    <div className="flex justify-between items-start">

                                       <div>

                                          <h3 className="text-2xl font-bold">

                                             {
                                                holding.stock_symbol
                                             }

                                          </h3>

                                          <p className="text-slate-400 mt-1">

                                             {
                                                holding.exchange
                                             }

                                          </p>

                                       </div>

                                       <div>

                                          <p
                                             className="
                                                text-cyan-400
                                                text-2xl
                                                font-bold
                                             "
                                          >

                                             ₹
                                             {
                                                Number(
                                                   holding.current_market_price
                                                ).toFixed(2)
                                             }

                                          </p>

                                       </div>

                                    </div>

                                    <div className="mt-6 space-y-4">

                                       <div className="flex justify-between">

                                          <span className="text-slate-400">

                                             Investor

                                          </span>

                                          <span className="font-semibold">

                                             {
                                                holding.investor_id
                                             }

                                          </span>

                                       </div>

                                       <div className="flex justify-between">

                                          <span className="text-slate-400">

                                             Quantity

                                          </span>

                                          <span className="font-semibold">

                                             {
                                                Number(
                                                   holding.quantity
                                                ).toFixed(2)
                                             }

                                          </span>

                                       </div>

                                       <div className="flex justify-between">

                                          <span className="text-slate-400">

                                             Avg Buy

                                          </span>

                                          <span className="font-semibold">

                                             ₹
                                             {
                                                Number(
                                                   holding.avg_buy_price
                                                ).toFixed(2)
                                             }

                                          </span>

                                       </div>

                                    </div>

                                 </div>
                              )
                           )
                        }

                     </div>

                  </div>

                  {/* ================================= */}
                  {/* TRANSACTIONS */}
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

                     <div className="flex justify-between items-center mb-6">

                        <h2 className="text-2xl font-bold">

                           Transactions

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

                                    Stock

                                 </th>

                                 <th className="pb-4">

                                    Type

                                 </th>

                                 <th className="pb-4">

                                    Quantity

                                 </th>

                                 <th className="pb-4">

                                    Price

                                 </th>

                                 <th className="pb-4">

                                    Exchange

                                 </th>

                              </tr>

                           </thead>

                           <tbody>

                              {
                                 portfolio?.equity?.transactions?.map(
                                    (transaction: any) => (

                                       <tr
                                          key={transaction.id}

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
                                                transaction.stock_symbol
                                             }

                                          </td>

                                          <td className="py-5">

                                             <span
                                                className={`
                                                   px-3
                                                   py-1
                                                   rounded-full
                                                   text-sm
                                                   font-semibold

                                                   ${
                                                      transaction.transaction_type ===
                                                      "BUY"

                                                         ?

                                                         "bg-green-500/20 text-green-400"

                                                         :

                                                         "bg-red-500/20 text-red-400"
                                                   }
                                                `}
                                             >

                                                {
                                                   transaction.transaction_type
                                                }

                                             </span>

                                          </td>

                                          <td className="py-5">

                                             {
                                                Number(
                                                   transaction.quantity
                                                ).toFixed(2)
                                             }

                                          </td>

                                          <td
                                             className="
                                                py-5
                                                font-semibold
                                             "
                                          >

                                             ₹
                                             {
                                                Number(
                                                   transaction.price
                                                ).toFixed(2)
                                             }

                                          </td>

                                          <td className="py-5">

                                             {
                                                transaction.exchange
                                             }

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