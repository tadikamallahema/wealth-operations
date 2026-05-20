import * as transactionsRepository
from "../repositories/transactions.repository";

import { redisClient }
from "../config/redis";



export const getAllTransactions = async () => {

  return await transactionsRepository
    .getAllTransactions();

};



export const getTransactionById = async (
  transactionId: string
) => {

  return await transactionsRepository
    .getTransactionById(transactionId);

};



export const getInvestorTransactions = async (
  investorId: string
) => {

  const cacheKey =
    `mf:transactions:${investorId}`;

  const cachedTransactions =
    await redisClient.get(cacheKey);

  if (cachedTransactions) {

    console.log("Transactions from Redis 🚀");

    return JSON.parse(cachedTransactions);

  }

  console.log("Transactions from PostgreSQL 🔥");

  const transactions =
    await transactionsRepository
      .getInvestorTransactions(investorId);

  await redisClient.set(
    cacheKey,
    JSON.stringify(transactions),
    {
      EX: 60
    }
  );

  return transactions;

};



export const purchaseFund = async (
  data: any
) => {

  const transaction =
    await transactionsRepository
      .purchaseFund(data);

  // CLEAR CACHE
  await redisClient.del(
    `mf:portfolio:${data.customer_ref}`
  );

  await redisClient.del(
    `mf:holdings:${data.customer_ref}`
  );

  await redisClient.del(
    `mf:transactions:${data.customer_ref}`
  );

  await redisClient.del(
    `mf:investor:${data.customer_ref}`
  );

  return transaction;

};



export const redeemFund = async (
  data: any
) => {

  const transaction =
    await transactionsRepository
      .redeemFund(data);

  // CLEAR CACHE
  await redisClient.del(
    `mf:portfolio:${data.customer_ref}`
  );

  await redisClient.del(
    `mf:holdings:${data.customer_ref}`
  );

  await redisClient.del(
    `mf:transactions:${data.customer_ref}`
  );

  await redisClient.del(
    `mf:investor:${data.customer_ref}`
  );

  return transaction;

};