import * as investorsRepository
from "../repositories/investors.repository";

import { redisClient }
from "../config/redis";



export const getAllInvestors = async () => {

  return await investorsRepository
    .getAllInvestors();

};



export const getInvestorById = async (
  investorId: string
) => {

  const cacheKey =
    `mf:investor:${investorId}`;

  const cachedInvestor =
    await redisClient.get(cacheKey);

  if (cachedInvestor) {

    console.log("Investor from Redis ");

    return JSON.parse(cachedInvestor);

  }

  console.log("Investor from PostgreSQL ");

  const investor =
    await investorsRepository
      .getInvestorById(investorId);

  await redisClient.set(
    cacheKey,
    JSON.stringify(investor),
    {
      EX: 120
    }
  );

  return investor;

};



export const getInvestorHoldings = async (
  investorId: string
) => {

  const cacheKey =
    `mf:holdings:${investorId}`;

  const cachedHoldings =
    await redisClient.get(cacheKey);

  if (cachedHoldings) {

    console.log("Holdings from Redis ");

    return JSON.parse(cachedHoldings);

  }

  console.log("Holdings from PostgreSQL ");

  const holdings =
    await investorsRepository
      .getInvestorHoldings(investorId);

  await redisClient.set(
    cacheKey,
    JSON.stringify(holdings),
    {
      EX: 60
    }
  );

  return holdings;

};



export const getInvestorHoldingByFund = async (
  investorId: string,
  fundId: string
) => {

  return await investorsRepository
    .getInvestorHoldingByFund(
      investorId,
      fundId
    );

};



export const getPortfolioSummary = async (
  investorId: string
) => {

  const cacheKey =
    `mf:portfolio:${investorId}`;

  const cachedSummary =
    await redisClient.get(cacheKey);

  if (cachedSummary) {

    console.log("Portfolio from Redis ");

    return JSON.parse(cachedSummary);

  }

  console.log("Portfolio from PostgreSQL ");

  const summary =
    await investorsRepository
      .getPortfolioSummary(investorId);

  await redisClient.set(
    cacheKey,
    JSON.stringify(summary),
    {
      EX: 60
    }
  );

  return summary;

};



export const getInvestorByPAN = async (
  panNumber: string
) => {

  const cacheKey =
    `mf:pan:${panNumber}`;

  const cachedInvestor =
    await redisClient.get(cacheKey);

  if (cachedInvestor) {

    console.log("PAN lookup from Redis ");

    return JSON.parse(cachedInvestor);

  }

  console.log("PAN lookup from PostgreSQL ");

  const investor =
    await investorsRepository
      .getInvestorByPAN(panNumber);

  await redisClient.set(
    cacheKey,
    JSON.stringify(investor),
    {
      EX: 120
    }
  );

  return investor;

};