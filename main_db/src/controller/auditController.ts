import { Request, Response } from "express";
import * as auditService from "../services/auditService.js";

export const createAudit = async (req: Request, res: Response) => {
  try {
    const {
      pan_number,
      service_name,
      user_id,
      role_id,
      action_type,
      entity_type,
      entity_id,
      action_status,
      description,
      endpoint,
      request_method,
      ip_address,
      old_data,
      new_data,
      metadata,
    } = req.body;

    const row = await auditService.record({
      pan_number,
      service_name,
      user_id: user_id !== undefined ? Number(user_id) : undefined,
      role_id: role_id !== undefined ? Number(role_id) : undefined,
      action_type,
      entity_type,
      entity_id,
      action_status,
      description,
      endpoint,
      request_method,
      ip_address,
      old_data,
      new_data,
      metadata,
    });
    return res.status(201).json({ success: true, data: row });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const listAudits = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit ?? 50);
    const offset = Number(req.query.offset ?? 0);
    const pan_number = req.query.pan_number as string | undefined;
    const action_type = req.query.action_type as string | undefined;
    const entity_type = req.query.entity_type as string | undefined;
    const user_id = req.query.user_id ? Number(req.query.user_id) : undefined;
    const role_id = req.query.role_id ? Number(req.query.role_id) : undefined;
    const action_status = req.query.action_status as string | undefined;
    const rows = await auditService.list({
      limit,
      offset,
      pan_number,
      action_type,
      entity_type,
      user_id,
      role_id,
      action_status,
    });
    return res.status(200).json({ success: true, data: rows });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
