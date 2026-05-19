import * as fundsRepository
from "../repositories/funds.repository";

import { redisClient }
from "../config/redis";



export const getAllFunds = async () => {

  const cacheKey = "mf:funds";

  // CHECK CACHE
  const cachedFunds =
    await redisClient.get(cacheKey);

  if (cachedFunds) {

    console.log("Fetching Funds from Redis 🚀");

    return JSON.parse(cachedFunds);

  }

  console.log("Fetching Funds from PostgreSQL 🔥");

  // FETCH FROM DB
  const funds =
    await fundsRepository.getAllFunds();

  // STORE CACHE
  await redisClient.set(
    cacheKey,
    JSON.stringify(funds),
    {
      EX: 60
    }
  );

  return funds;

};



export const getFundById = async (
  fundId: string
) => {

  const cacheKey =
    `mf:fund:${fundId}`;

  const cachedFund =
    await redisClient.get(cacheKey);

  if (cachedFund) {

    console.log("Fund from Redis 🚀");

    return JSON.parse(cachedFund);

  }

  console.log("Fund from PostgreSQL 🔥");

  const fund =
    await fundsRepository.getFundById(
      fundId
    );

  await redisClient.set(
    cacheKey,
    JSON.stringify(fund),
    {
      EX: 60
    }
  );

  return fund;

};



export const getFundNAV = async (
  fundId: string
) => {

  const cacheKey =
    `mf:nav:${fundId}`;

  // CHECK CACHE
  const cachedNAV =
    await redisClient.get(cacheKey);

  if (cachedNAV) {

    console.log("NAV from Redis 🚀");

    return JSON.parse(cachedNAV);

  }

  console.log("NAV from PostgreSQL 🔥");

  // FETCH FROM DB
  const nav =
    await fundsRepository.getFundNAV(
      fundId
    );

  // STORE CACHE
  await redisClient.set(
    cacheKey,
    JSON.stringify(nav),
    {
      EX: 30
    }
  );

  return nav;

};



export const getFundNAVHistory = async (
  fundId: string
) => {

  const cacheKey =
    `mf:nav-history:${fundId}`;

  const cachedHistory =
    await redisClient.get(cacheKey);

  if (cachedHistory) {

    console.log("NAV History from Redis 🚀");

    return JSON.parse(cachedHistory);

  }

  console.log("NAV History from PostgreSQL 🔥");

  const history =
    await fundsRepository
      .getFundNAVHistory(fundId);

  await redisClient.set(
    cacheKey,
    JSON.stringify(history),
    {
      EX: 120
    }
  );

  return history;

};