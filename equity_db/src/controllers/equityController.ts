import {
  getHoldingsbyINV,
  getTransactionsbyINV,
  getEquityMarketPrices,
  getAllHoldings,
  getAllTransactions,
} from "../models/equityModel.js";
import { Request, Response } from "express";

export const fetchAllHoldings = async (
  request: Request,
  response: Response,
) => {
  try {
    
    const data = await getAllHoldings();
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json({
      message: "Error fetching holdings",
      error: err,
    });
  }
};

export const fetchAllTransactions = async (
  request: Request,
  response: Response,
) => {
  try {
    
    const data = await getAllTransactions();
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json({
      message: "Error fetching holdings",
      error: err,
    });
  }
};

export const getHoldings = async (request: Request, response: Response) => {
  try {
    const pan_no = Array.isArray(request.params.pan_no)
      ? request.params.pan_no[0]
      : request.params.pan_no;
    const data = await getHoldingsbyINV(pan_no);
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json({
      message: "Error fetching holdings",
      error: err,
    });
  }
};

export const getTransactions = async (request: Request, response: Response) => {
  try {
    const pan_no = Array.isArray(request.params.pan_no)
      ? request.params.pan_no[0]
      : request.params.pan_no;
    const data = await getTransactionsbyINV(pan_no);
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json({
      message: "Error fetching holdings",
      error: err,
    });
  }
};

export const getMarket = async (request: Request, response: Response) => {
  try {
    const data = await getEquityMarketPrices();
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json({
      message: "Error fetching holdings",
      error: err,
    });
  }
};
