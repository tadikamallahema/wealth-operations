/* import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Layout from "../components/Layout";

export default function InvestorDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading,setLoading] = useState(true);
  const [investor,setInvestor] = useState<any>(null);

  useEffect(() => {
    fetchInvestor();
  }, []);

  const fetchInvestor = async () => {
    try {

      const res = await axios.get(
        `http://localhost:4004/api/portfolio/`
      );

      setInvestor(res.data);

    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if(loading){
    return (
      <Layout>
        <div className="p-8 text-white">
          Loading...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="p-8 text-white">

        <button
          onClick={() => navigate("/investors")}
          className="flex items-center gap-2 mb-8 bg-cyan-500 px-4 py-2 rounded-lg text-black font-semibold"
        >
          <ArrowLeft size={18}/>
          Back
        </button>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

          <h1 className="text-3xl font-bold mb-6">
            Investor Details
          </h1>

          <div className="grid grid-cols-2 gap-6">

            <div>
              <p className="text-slate-400">Investor ID</p>
              <p className="text-xl font-semibold">
                {id}
              </p>
            </div>

            <div>
              <p className="text-slate-400">Total Holdings</p>
              <p className="text-xl font-semibold">
                {investor?.length || 0}
              </p>
            </div>

          </div>

        </div>

        <div className="mt-8 bg-slate-900 rounded-2xl p-6 border border-slate-800">

          <h2 className="text-2xl font-bold mb-5">
            Holdings
          </h2>

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-700 text-left">
                <th className="pb-4">Symbol</th>
                <th className="pb-4">Quantity</th>
                <th className="pb-4">Exchange</th>
              </tr>
            </thead>

            <tbody>

              {investor?.map(
                (holding:any,index:number) => (
                  <tr
                    key={index}
                    className="border-b border-slate-800"
                  >
                    <td className="py-4">
                      {holding.symbol}
                    </td>

                    <td className="py-4">
                      {holding.quantity}
                    </td>

                    <td className="py-4">
                      {holding.exchange}
                    </td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </Layout>
  );
} */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Layout from "../components/Layout";

export default function InvestorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [holdings, setHoldings] = useState<any[]>([]);

  useEffect(() => {
    fetchInvestor();
  }, [id]);

  const fetchInvestor = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4004/api/portfolio"
      );

      const allHoldings =
        res.data?.portfolio?.equity?.holdings || [];

      const investorHoldings = allHoldings.filter(
        (item: any) => item.investor_id === id
      );

      setHoldings(investorHoldings);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const totalQuantity = holdings.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  const totalValue = holdings.reduce(
    (sum, item) =>
      sum +
      Number(item.quantity) *
        Number(item.current_market_price),
    0
  );

  if (loading) {
    return (
      <Layout>
        <div className="p-8 text-white">
          Loading...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 text-white">

        <button
          onClick={() => navigate("/investors")}
          className="flex items-center gap-2 mb-8 bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

          <h1 className="text-3xl font-bold mb-6">
            Investor Details
          </h1>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <p className="text-slate-400">
                Investor ID
              </p>
              <p className="text-xl font-semibold">
                {id}
              </p>
            </div>

            <div>
              <p className="text-slate-400">
                Holdings Count
              </p>
              <p className="text-xl font-semibold">
                {holdings.length}
              </p>
            </div>

            <div>
              <p className="text-slate-400">
                Total Quantity
              </p>
              <p className="text-xl font-semibold">
                {totalQuantity}
              </p>
            </div>

          </div>

        </div>

        <div className="mt-8 bg-slate-900 rounded-2xl p-6 border border-slate-800">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
              Equity Holdings
            </h2>

            <div className="text-cyan-400 font-semibold">
              ₹ {totalValue.toLocaleString()}
            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="pb-4">Stock</th>
                  <th className="pb-4">Quantity</th>
                  <th className="pb-4">Avg Price</th>
                  <th className="pb-4">Current Price</th>
                  <th className="pb-4">Exchange</th>
                </tr>
              </thead>

              <tbody>

                {holdings.map((holding) => (
                  <tr
                    key={holding.id}
                    className="border-b border-slate-800 hover:bg-slate-800/30"
                  >
                    <td className="py-4 font-semibold">
                      {holding.stock_symbol}
                    </td>

                    <td className="py-4">
                      {holding.quantity}
                    </td>

                    <td className="py-4">
                      ₹ {holding.avg_buy_price}
                    </td>

                    <td className="py-4 text-green-400">
                      ₹ {holding.current_market_price}
                    </td>

                    <td className="py-4">
                      {holding.exchange}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

            {holdings.length === 0 && (
              <div className="text-center py-10 text-slate-400">
                No holdings found for this investor
              </div>
            )}

          </div>

        </div>

      </div>
    </Layout>
  );
}