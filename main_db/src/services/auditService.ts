import * as auditModel from "../models/auditModel.js";

export const record = async (data: Partial<auditModel.AuditRow>) => {
  const row = await auditModel.insertAudit(data as any);
  return row;
};

export const list = async (opts: {
  limit?: number;
  offset?: number;
  pan_number?: string;
  service_name?: string;
  user_id?: string;
  role_id?: number;
  action_type?: string;
  entity_type?: string;
  entity_id?: string;
  action_status?: string;
  endpoint?: string;
  request_method?: string;
  ip_address?: string;
}) => {
  return auditModel.queryAudits(opts);
};
