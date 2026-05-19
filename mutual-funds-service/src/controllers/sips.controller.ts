import { Request, Response } from "express";

import * as sipsService from "../services/sips.service";

export const getAllSips = async (
  req: Request,
  res: Response
) => {

  try {

    const sips =
      await sipsService.getAllSips();

    res.status(200).json({
      success: true,
      data: sips
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch SIPs"
    });

  }

};

export const getSipById = async (
  req: Request,
  res: Response
) => {

  try {

    const sipId = req.params.sipId as string;

    const sip =
      await sipsService.getSipById(sipId);

    res.status(200).json({
      success: true,
      data: sip
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch SIP"
    });

  }

};

export const getInvestorSips = async (
  req: Request,
  res: Response
) => {

  try {

    const investorId =
      req.params.investorId as string;

    const sips =
      await sipsService.getInvestorSips(
        investorId
      );

    res.status(200).json({
      success: true,
      data: sips
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch investor SIPs"
    });

  }

};

export const createSip = async (
  req: Request,
  res: Response
) => {

  try {

    const sip =
      await sipsService.createSip(req.body);

    res.status(201).json({
      success: true,
      data: sip
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to create SIP"
    });

  }

};

export const pauseSip = async (
  req: Request,
  res: Response
) => {

  try {

    const sipId = req.params.sipId as string;

    const sip =
      await sipsService.pauseSip(sipId);

    res.status(200).json({
      success: true,
      data: sip
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to pause SIP"
    });

  }

};

export const resumeSip = async (
  req: Request,
  res: Response
) => {

  try {

    const sipId = req.params.sipId as string;

    const sip =
      await sipsService.resumeSip(sipId);

    res.status(200).json({
      success: true,
      data: sip
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to resume SIP"
    });

  }

};

export const cancelSip = async (
  req: Request,
  res: Response
) => {

  try {

    const sipId = req.params.sipId as string;

    const sip =
      await sipsService.cancelSip(sipId);

    res.status(200).json({
      success: true,
      data: sip
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to cancel SIP"
    });

  }

};