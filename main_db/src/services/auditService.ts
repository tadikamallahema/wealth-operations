import * as auditModel from "../models/auditModel.js";

export const record = async (data: Partial<auditModel.AuditRow>) => {
  const row = await auditModel.insertAudit(data as any);
  return row;
};

export const list = async (opts: {
  limit?: number;
  offset?: number;
  pan_number?: string;
  action_type?: string;
  entity_type?: string;
  user_id?: number;
  role_id?: number;
  action_status?: string;
}) => {
  return auditModel.queryAudits(opts);
};
