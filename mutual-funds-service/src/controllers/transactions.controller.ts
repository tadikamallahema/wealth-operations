import { Request, Response } from "express";

import * as transactionsService from "../services/transactions.service";

export const getAllTransactions = async (
  req: Request,
  res: Response
) => {

  try {

    const transactions =
      await transactionsService.getAllTransactions();

    res.status(200).json({
      success: true,
      data: transactions
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch transactions"
    });

  }

};

export const getTransactionById = async (
  req: Request,
  res: Response
) => {

  try {

    const transactionId =
      req.params.transactionId as string;

    const transaction =
      await transactionsService.getTransactionById(
        transactionId
      );

    res.status(200).json({
      success: true,
      data: transaction
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch transaction"
    });

  }

};

export const getInvestorTransactions = async (
  req: Request,
  res: Response
) => {

  try {

    const investorId =
      req.params.investorId as string;

    const transactions =
      await transactionsService
        .getInvestorTransactions(investorId);

    res.status(200).json({
      success: true,
      data: transactions
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch investor transactions"
    });

  }

};

export const purchaseFund = async (
  req: Request,
  res: Response
) => {

  try {

    const transaction =
      await transactionsService.purchaseFund(
        req.body
      );

    res.status(201).json({
      success: true,
      data: transaction
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Purchase failed"
    });

  }

};

export const redeemFund = async (
  req: Request,
  res: Response
) => {

  try {

    const transaction =
      await transactionsService.redeemFund(
        req.body
      );

    res.status(201).json({
      success: true,
      data: transaction
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Redemption failed"
    });

  }

};