import * as sipsRepository
from "../repositories/sips.repository";

import { redisClient }
from "../config/redis";



export const getAllSips = async () => {

  return await sipsRepository
    .getAllSips();

};



export const getSipById = async (
  sipId: string
) => {

  return await sipsRepository
    .getSipById(sipId);

};



export const getInvestorSips = async (
  investorId: string
) => {

  const cacheKey =
    `mf:sips:${investorId}`;

  const cachedSips =
    await redisClient.get(cacheKey);

  if (cachedSips) {

    console.log("SIPs from Redis ");

    return JSON.parse(cachedSips);

  }

  console.log("SIPs from PostgreSQL ");

  const sips =
    await sipsRepository
      .getInvestorSips(investorId);

  await redisClient.set(
    cacheKey,
    JSON.stringify(sips),
    {
      EX: 60
    }
  );

  return sips;

};



export const createSip = async (
  data: any
) => {

  const sip =
    await sipsRepository
      .createSip(data);

  // CLEAR CACHE
  await redisClient.del(
    `mf:sips:${data.customer_ref}`
  );

  return sip;

};



export const pauseSip = async (
  sipId: string
) => {

  const sip =
    await sipsRepository
      .pauseSip(sipId);

  // CLEAR CACHE
  await redisClient.del(
    `mf:sips:${sip.customer_ref}`
  );

  return sip;

};



export const resumeSip = async (
  sipId: string
) => {

  const sip =
    await sipsRepository
      .resumeSip(sipId);

  // CLEAR CACHE
  await redisClient.del(
    `mf:sips:${sip.customer_ref}`
  );

  return sip;

};



export const cancelSip = async (
  sipId: string
) => {

  const sip =
    await sipsRepository
      .cancelSip(sipId);

  // CLEAR CACHE
  await redisClient.del(
    `mf:sips:${sip.customer_ref}`
  );

  return sip;

};
export const getFailedSips = async () => {

  return await sipsRepository
    .getFailedSips();

};



export const getSipFailures = async (
  sipId: string
) => {

  return await sipsRepository
    .getSipFailures(sipId);

};



export const retryFailedSip = async (
  sipId: string
) => {

  const retry =
    await sipsRepository
      .retryFailedSip(sipId);

  return retry;

};