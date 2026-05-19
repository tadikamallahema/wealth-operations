import { Request, Response } from "express";

import * as fundsService from "../services/funds.service";

export const getAllFunds = async (
  req: Request,
  res: Response
) => {
  try {

    const funds = await fundsService.getAllFunds();

    res.status(200).json({
      success: true,
      data: funds
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch funds"
    });

  }
};

export const getFundById = async (
  req: Request,
  res: Response
) => {
  try {

    const { fundId } = req.params as { fundId: string };

    const fund = await fundsService.getFundById(fundId);

    res.status(200).json({
      success: true,
      data: fund
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch fund"
    });

  }
};

export const getFundNAV = async (
  req: Request,
  res: Response
) => {

  try {

    const { fundId } = req.params as { fundId: string };

    const nav = await fundsService.getFundNAV(fundId);

    res.status(200).json({
      success: true,
      data: nav
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch NAV"
    });

  }
};

export const getFundNAVHistory = async (
  req: Request,
  res: Response
) => {

  try {

    const { fundId } = req.params as { fundId: string };

    const history =
      await fundsService.getFundNAVHistory(fundId);

    res.status(200).json({
      success: true,
      data: history
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch NAV history"
    });

  }
};