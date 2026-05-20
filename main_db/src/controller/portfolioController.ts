import { Request, Response } from "express";
import { equityService, mfService } from "../config/serviceClients.js";
import { redisClient } from "../config/redis.js";

const unwrap = (response: any) => response?.data?.data ?? response?.data ?? response;
const CACHE_TTL_SECONDS = 30;

export const getPortfolio = async (req: Request, res: Response) => {
  const pan_no = String(req.query.pan_no ?? "");
  const investorId = String(req.query.investorId ?? "");
  const fundId = String(req.query.fundId ?? "");
  const cacheKey = `portfolio:${pan_no}:${investorId}:${fundId}`;

  try {
    const cachedValue = await redisClient.get(cacheKey);
    if (cachedValue) {
      const cachedPortfolio = JSON.parse(cachedValue);
      return res.status(200).json({ success: true, portfolio: cachedPortfolio, cached: true });
    }

    const equityHoldingsRequest = pan_no
      ? equityService.get(`/api/equity/holdings/${pan_no}`)
      : equityService.get("/api/equity/holdings");

    const equityTransactionsRequest = pan_no
      ? equityService.get(`/api/equity/transactions/${pan_no}`)
      : equityService.get("/api/equity/transactions");

    const mfFundRequest = mfService.get("/funds");
    const mfTransactionsRequest = investorId
      ? mfService.get(`/transactions/${investorId}`)
      : mfService.get("/transactions");

    const requests = [
      equityHoldingsRequest,
      equityTransactionsRequest,
      mfFundRequest,
      mfTransactionsRequest,
    ];

    if (fundId) {
      requests.push(mfService.get(`/funds/${fundId}`));
    }

    const [
      holdingsRes,
      equityTransactionsRes,
      fundsRes,
      mfTransactionsRes,
      fundDetailRes,
    ] = await Promise.all(requests);

    const equityHoldings = unwrap(holdingsRes);
    const equityTransactions = unwrap(equityTransactionsRes);
    const funds = unwrap(fundsRes);
    const mfTransactions = unwrap(mfTransactionsRes);
    const fundDetail = fundId ? unwrap(fundDetailRes) : undefined;

    const portfolio = {
      pan_no: pan_no || null,
      investorId: investorId || null,
      equity: {
        holdings: equityHoldings,
        transactions: equityTransactions,
      },
      mutualFunds: {
        funds,
        transactions: mfTransactions,
        fundDetail,
      },
      summary: {
        equityHoldingsCount: Array.isArray(equityHoldings) ? equityHoldings.length : 0,
        equityTransactionsCount: Array.isArray(equityTransactions) ? equityTransactions.length : 0,
        mutualFundCount: Array.isArray(funds) ? funds.length : 0,
        mutualFundTransactionsCount: Array.isArray(mfTransactions) ? mfTransactions.length : 0,
      },
    };

    await redisClient.set(cacheKey, JSON.stringify(portfolio), {
      EX: CACHE_TTL_SECONDS,
    });

    return res.status(200).json({ success: true, portfolio, cached: false });
  } catch (error: any) {
    console.error("Portfolio aggregation failed:", error?.message ?? error);
    return res.status(502).json({
      success: false,
      message: "Unable to retrieve portfolio from external services",
      error: error?.message ?? error,
    });
  }
};
