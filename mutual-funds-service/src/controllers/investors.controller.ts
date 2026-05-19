import { Request, Response } from "express";

import * as investorsService from "../services/investors.service";

export const getAllInvestors = async (
  req: Request,
  res: Response
) => {

  try {

    const investors =
      await investorsService.getAllInvestors();

    res.status(200).json({
      success: true,
      data: investors
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch investors"
    });

  }
};

export const getInvestorById = async (
  req: Request,
  res: Response
) => {

  try {

    const { investorId } = req.params as { investorId: string };

    const investor =
      await investorsService.getInvestorById(
        investorId
      );

    res.status(200).json({
      success: true,
      data: investor
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch investor"
    });

  }
};

export const getInvestorHoldings = async (
  req: Request,
  res: Response
) => {

  try {

    const { investorId } = req.params as { investorId: string };

    const holdings =
      await investorsService.getInvestorHoldings(
        investorId
      );

    res.status(200).json({
      success: true,
      data: holdings
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch holdings"
    });

  }
};

export const getInvestorHoldingByFund = async (
  req: Request,
  res: Response
) => {

  try {

    const { investorId, fundId } = req.params;

    const holding =
      await investorsService.getInvestorHoldingByFund(
        investorId as string,
        fundId as string
      );

    res.status(200).json({
      success: true,
      data: holding
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch holding"
    });

  }
};

export const getPortfolioSummary = async (
  req: Request,
  res: Response
) => {

  try {

    const { investorId } = req.params as { investorId: string };

    const summary =
      await investorsService.getPortfolioSummary(
        investorId
      );

    res.status(200).json({
      success: true,
      data: summary
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio summary"
    });

  }
};
export const getInvestorByPAN = async (
  req: Request,
  res: Response
) => {

  const panNumber =
    req.params.panNumber as string;

  const investor =
    await investorsService
      .getInvestorByPAN(panNumber);

  res.json({
    success: true,
    data: investor
  });

};