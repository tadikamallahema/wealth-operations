import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

type Transaction = {
   id: number;
   stock_symbol?: string;
   scheme_code?: string;
   transaction_type: string;
   amount?: number;
   price?: number;
   quantity?: number;
   units?: number;
   exchange?: string;
   customer_ref?: string;
   redemption_status?: string;
};

export default function Transactions() {

   const [transactions, setTransactions] =
      useState<Transaction[]>([]);

   useEffect(() => {
      fetchTransactions();
   }, []);

   const fetchTransactions = async () => {

      try {

         const response = await axios.get(
            "http://localhost:4004/api/portfolio"
         );

         const portfolio =
            response.data.portfolio;

         const equityTransactions =
            portfolio?.equity?.transactions || [];

         const mfTransactions =
            portfolio?.mutualFunds?.transactions || [];

         const normalizedEquity =
            equityTransactions.map((tx: any) => ({
               id: tx.id,
               stock_symbol: tx.stock_symbol,
               transaction_type: tx.transaction_type,
               amount: Number(tx.price),
               quantity: Number(tx.quantity),
               exchange: tx.exchange,
               redemption_status: "COMPLETED"
            }));

         const normalizedMF =
            mfTransactions.map((tx: any) => ({
               id: tx.id,
               scheme_code: tx.scheme_code,
               transaction_type: tx.transaction_type,
               amount: Number(tx.amount),
               units: Number(tx.units),
               customer_ref: tx.customer_ref,
               redemption_status:
                  tx.redemption_status || "COMPLETED"
            }));

         setTransactions([
            ...normalizedEquity,
            ...normalizedMF
         ]);

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

                           Transactions

                        </h1>

                        <p className="text-slate-400 mt-2">

                           Combined equity and mutual fund activities

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

                        Live Activity

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

                           Total Transactions

                        </p>

                        <h2 className="text-5xl font-bold mt-3">

                           {transactions.length}

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

                           Active Assets

                        </p>

                        <h2 className="text-5xl font-bold mt-3">

                           {
                              new Set(
                                 transactions.map(
                                    (tx) =>
                                       tx.stock_symbol ||
                                       tx.scheme_code
                                 )
                              ).size
                           }

                        </h2>

                     </div>

                  </div>

                  {/* ================================= */}
                  {/* TABLE */}
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

                           Transaction History

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
                                    Asset
                                 </th>

                                 <th className="pb-4">
                                    Type
                                 </th>

                                 <th className="pb-4">
                                    Amount
                                 </th>

                                 <th className="pb-4">
                                    Units / Qty
                                 </th>

                                 <th className="pb-4">
                                    Status
                                 </th>

                              </tr>

                           </thead>

                           <tbody>

                              {
                                 transactions.map(
                                    (
                                       transaction,
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

                                          {/* ASSET */}
                                          <td className="py-5">

                                             <div
                                                className="
                                                   flex
                                                   flex-col
                                                   gap-1
                                                "
                                             >

                                                <span
                                                   className="
                                                      font-bold
                                                      text-lg
                                                   "
                                                >

                                                   {
                                                      transaction.stock_symbol ||
                                                      transaction.scheme_code
                                                   }

                                                </span>

                                                <span
                                                   className="
                                                      text-slate-400
                                                      text-sm
                                                   "
                                                >

                                                   {
                                                      transaction.exchange ||
                                                      transaction.customer_ref ||
                                                      "Mutual Fund"
                                                   }

                                                </span>

                                             </div>

                                          </td>

                                          {/* TYPE */}
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
                                                         "BUY" ||

                                                      transaction.transaction_type ===
                                                         "PURCHASE"

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

                                          {/* AMOUNT */}
                                          <td className="py-5 font-semibold">

                                             ₹
                                             {
                                                Number(
                                                   transaction.amount
                                                ).toFixed(2)
                                             }

                                          </td>

                                          {/* UNITS */}
                                          <td className="py-5">

                                             {
                                                Number(
                                                   transaction.units ||
                                                   transaction.quantity ||
                                                   0
                                                ).toFixed(2)
                                             }

                                          </td>

                                          {/* STATUS */}
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

                                                {
                                                   transaction.redemption_status
                                                }

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