import client from "../config/pgManager.js";

export interface AuditRow {
  id?: number;
  pan_number?: string | null;
  service_name?: string | null;
  user_id?: number | null;
  role_id?: number | null;
  action_type: string;
  entity_type?: string | null;
  entity_id?: string | null;
  action_status: string;
  description?: string | null;
  endpoint?: string | null;
  request_method?: string | null;
  ip_address?: string | null;
  old_data?: any;
  new_data?: any;
  metadata?: any;
  created_at?: string;
}

const parseNumber = (value: any): number | null => {
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
};

export const insertAudit = async (audit: AuditRow) => {
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
  } = audit;

  const res = await client.query(
    `INSERT INTO audit_logs (
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
       metadata
     ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
     RETURNING *`,
    [
      pan_number || null,
      service_name || null,
      parseNumber(user_id),
      parseNumber(role_id),
      action_type,
      entity_type || null,
      entity_id || null,
      action_status,
      description || null,
      endpoint || null,
      request_method || null,
      ip_address || null,
      old_data ? JSON.stringify(old_data) : null,
      new_data ? JSON.stringify(new_data) : null,
      metadata ? JSON.stringify(metadata) : null,
    ]
  );
  return res.rows[0];
};

export const queryAudits = async (opts: {
  limit?: number;
  offset?: number;
  pan_number?: string;
  action_type?: string;
  entity_type?: string;
  user_id?: number;
  role_id?: number;
  action_status?: string;
}) => {
  const {
    limit = 50,
    offset = 0,
    pan_number,
    action_type,
    entity_type,
    user_id,
    role_id,
    action_status,
  } = opts;
  const filters: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (pan_number) {
    filters.push(`pan_number = $${idx++}`);
    values.push(pan_number);
  }
  if (action_type) {
    filters.push(`action_type = $${idx++}`);
    values.push(action_type);
  }
  if (entity_type) {
    filters.push(`entity_type = $${idx++}`);
    values.push(entity_type);
  }
  if (user_id !== undefined) {
    filters.push(`user_id = $${idx++}`);
    values.push(user_id);
  }
  if (role_id !== undefined) {
    filters.push(`role_id = $${idx++}`);
    values.push(role_id);
  }
  if (action_status) {
    filters.push(`action_status = $${idx++}`);
    values.push(action_status);
  }

  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  const q = `SELECT * FROM audit_logs ${where} ORDER BY created_at DESC LIMIT $${idx++} OFFSET $${idx++}`;
  values.push(limit, offset);
  const res = await client.query(q, values);
  return res.rows;
};
