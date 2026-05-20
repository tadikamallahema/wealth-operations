import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

type Fund = {

   id: number;

   scheme_code: string;

   scheme_name: string;

   category: string;

   nav: number;

   amc: string;

   risk_level: string;
};

type Transaction = {

   id: number;

   scheme_code: string;

   transaction_type: string;

   amount: number;

   units: number;

   customer_ref: string;
};

export default function MutualFunds() {

   const [funds, setFunds] =
      useState<Fund[]>([]);

   const [transactions, setTransactions] =
      useState<Transaction[]>([]);

   useEffect(() => {
   fetchMutualFunds();
}, []);

const fetchMutualFunds = async () => {

   try {

      const response = await axios.get(
         'http://localhost:4004/api/portfolio'
      );

      console.log(response.data);

      const portfolio = response.data.portfolio;

      const mutualFunds =
         portfolio?.mutualFunds?.funds || [];

      const mutualFundTransactions =
         portfolio?.mutualFunds?.transactions || [];

      const formattedFunds = mutualFunds.map(
         (fund: any, index: number) => ({
            id: index + 1,
            scheme_code: fund.scheme_code,
            scheme_name: fund.scheme_name,
            category: fund.fund_category,
            nav: Number(fund.nav_value),
            amc: fund.amc_name,
            risk_level: fund.risk_category
         })
      );

      const formattedTransactions =
         mutualFundTransactions.map(
            (tx: any) => ({
               id: tx.id,
               scheme_code: tx.scheme_code,
               transaction_type: tx.transaction_type,
               amount: Number(tx.amount),
               units: Number(tx.units),
               customer_ref: tx.customer_ref
            })
         );

      setFunds(formattedFunds);

      setTransactions(formattedTransactions);

   } catch (error) {

      console.log(error);

   }
};

  return (
   <Layout>

      <div className="min-h-screen bg-[#020617] text-white px-8 py-10">

         {/* ================= HEADER ================= */}

         <div className="flex items-center justify-between mb-10">

            <div>

               <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                  Mutual Fund Dashboard

               </h1>

               <p className="text-slate-400 mt-3 text-lg">

                  Track portfolio performance, NAV analytics & transaction history

               </p>

            </div>

            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-[1px] rounded-2xl">

               <div className="bg-slate-950 rounded-2xl px-6 py-4">

                  <p className="text-slate-400 text-sm">

                     Active Portfolio

                  </p>

                  <h2 className="text-2xl font-bold mt-1">

                     Wealth Operations

                  </h2>

               </div>

            </div>

         </div>

         {/* ================= METRICS ================= */}

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

            {/* Total Funds */}

            <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-7 backdrop-blur-xl hover:scale-[1.02] transition-all duration-300">

               <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>

               <p className="text-slate-400 text-sm uppercase tracking-widest">

                  Total Funds

               </p>

               <h2 className="text-5xl font-black mt-4 text-cyan-400">

                  {funds.length}

               </h2>

               <div className="mt-5 h-1 w-full bg-slate-800 rounded-full overflow-hidden">

                  <div className="w-3/4 h-full bg-cyan-400 rounded-full"></div>

               </div>

            </div>

            {/* Transactions */}

            <div className="relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-7 backdrop-blur-xl hover:scale-[1.02] transition-all duration-300">

               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full"></div>

               <p className="text-slate-400 text-sm uppercase tracking-widest">

                  Transactions

               </p>

               <h2 className="text-5xl font-black mt-4 text-purple-400">

                  {transactions.length}

               </h2>

               <div className="mt-5 h-1 w-full bg-slate-800 rounded-full overflow-hidden">

                  <div className="w-2/3 h-full bg-purple-400 rounded-full"></div>

               </div>

            </div>

            {/* Avg NAV */}

            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-3xl p-7 backdrop-blur-xl hover:scale-[1.02] transition-all duration-300">

               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>

               <p className="text-slate-400 text-sm uppercase tracking-widest">

                  Average NAV

               </p>

               <h2 className="text-5xl font-black mt-4 text-emerald-400">

                  ₹
                  {
                     funds.length > 0
                        ? (
                           funds.reduce(
                              (acc, fund) => acc + Number(fund.nav),
                              0
                           ) / funds.length
                        ).toFixed(2)
                        : "0"
                  }

               </h2>

               <div className="mt-5 h-1 w-full bg-slate-800 rounded-full overflow-hidden">

                  <div className="w-4/5 h-full bg-emerald-400 rounded-full"></div>

               </div>

            </div>

         </div>

         {/* ================= FUND CARDS ================= */}

         <div className="mb-14">

            <div className="flex items-center justify-between mb-8">

               <div>

                  <h2 className="text-3xl font-bold">

                     Portfolio Holdings

                  </h2>

                  <p className="text-slate-400 mt-2">

                     Real-time mutual fund overview

                  </p>

               </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

               {
                  funds.map((fund) => (

                     <div
                        key={fund.id}
                        className="group relative bg-slate-900/70 border border-slate-800 rounded-3xl p-7 hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                     >

                        {/* Glow Effect */}

                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                        <div className="relative z-10">

                           {/* Top */}

                           <div className="flex justify-between items-start">

                              <div>

                                 <h3 className="text-2xl font-bold leading-snug">

                                    {fund.scheme_name}

                                 </h3>

                                 <p className="text-slate-400 mt-2">

                                    {fund.category}

                                 </p>

                              </div>

                              <div className="bg-cyan-500/10 border border-cyan-500/20 px-5 py-3 rounded-2xl">

                                 <p className="text-xs text-slate-400 uppercase">

                                    NAV

                                 </p>

                                 <h2 className="text-2xl font-black text-cyan-400">

                                    ₹{fund.nav}

                                 </h2>

                              </div>

                           </div>

                           {/* Divider */}

                           <div className="my-6 border-t border-slate-800"></div>

                           {/* Details */}

                           <div className="space-y-4">

                              <div className="flex justify-between items-center">

                                 <span className="text-slate-400">

                                    AMC Name

                                 </span>

                                 <span className="font-semibold">

                                    {fund.amc}

                                 </span>

                              </div>

                              <div className="flex justify-between items-center">

                                 <span className="text-slate-400">

                                    Scheme Code

                                 </span>

                                 <span className="font-mono text-cyan-300">

                                    {fund.scheme_code}

                                 </span>

                              </div>

                              <div className="flex justify-between items-center">

                                 <span className="text-slate-400">

                                    Risk Level

                                 </span>

                                 <span
                                    className={`px-4 py-2 rounded-full text-sm font-semibold border

                                    ${
                                       fund.risk_level === "Very High"
                                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                                          : fund.risk_level === "High"
                                          ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                    }
                                    
                                    `}
                                 >

                                    {fund.risk_level}

                                 </span>

                              </div>

                           </div>

                        </div>

                     </div>
                  ))
               }

            </div>

         </div>

         {/* ================= TRANSACTIONS ================= */}

         <div className="bg-slate-900/70 border border-slate-800 rounded-3xl overflow-hidden">

            {/* Header */}

            <div className="px-8 py-6 border-b border-slate-800 flex items-center justify-between">

               <div>

                  <h2 className="text-3xl font-bold">

                     Transaction History

                  </h2>

                  <p className="text-slate-400 mt-2">

                     Monitor all purchase & redemption activity

                  </p>

               </div>

               <div className="bg-cyan-500/10 border border-cyan-500/20 px-5 py-3 rounded-2xl">

                  <span className="text-cyan-400 font-bold">

                     {transactions.length} Records

                  </span>

               </div>

            </div>

            {/* Table */}

            <div className="overflow-x-auto">

               <table className="w-full">

                  <thead className="bg-slate-950/70">

                     <tr className="text-left text-slate-400 uppercase text-sm tracking-wider">

                        <th className="px-8 py-5">

                           Scheme

                        </th>

                        <th className="px-8 py-5">

                           Type

                        </th>

                        <th className="px-8 py-5">

                           Amount

                        </th>

                        <th className="px-8 py-5">

                           Units

                        </th>

                        <th className="px-8 py-5">

                           Customer

                        </th>

                     </tr>

                  </thead>

                  <tbody>

                     {
                        transactions.map((tx) => (

                           <tr
                              key={tx.id}
                              className="border-t border-slate-800 hover:bg-slate-800/40 transition-all duration-200"
                           >

                              <td className="px-8 py-6 font-medium">

                                 {tx.scheme_code}

                              </td>

                              <td className="px-8 py-6">

                                 <span
                                    className={`px-4 py-2 rounded-full text-sm font-semibold border

                                    ${
                                       tx.transaction_type === "PURCHASE"
                                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                          : "bg-red-500/10 text-red-400 border-red-500/20"
                                    }

                                    `}
                                 >

                                    {tx.transaction_type}

                                 </span>

                              </td>

                              <td className="px-8 py-6 font-semibold text-cyan-300">

                                 ₹{Number(tx.amount).toFixed(2)}

                              </td>

                              <td className="px-8 py-6">

                                 {Number(tx.units).toFixed(4)}

                              </td>

                              <td className="px-8 py-6 text-slate-300">

                                 {tx.customer_ref}

                              </td>

                           </tr>
                        ))
                     }

                  </tbody>

               </table>

            </div>

         </div>

      </div>

   </Layout>
);
}