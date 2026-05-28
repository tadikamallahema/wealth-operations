import * as auditService from "../services/auditService.js";

export const recordAudit = async (opts: {
  pan_number?: string;
  service_name?: string;
  user_id?: string;
  role_id?: number;
  action_type: string;
  entity_type?: string;
  entity_id?: string;
  action_status: string;
  description?: string;
  endpoint?: string;
  request_method?: string;
  ip_address?: string;
  old_data?: any;
  new_data?: any;
  metadata?: any;
}) => {
  try {
    await auditService.record({
      pan_number: opts.pan_number,
      service_name: opts.service_name,
      user_id: opts.user_id,
      role_id: opts.role_id,
      action_type: opts.action_type,
      entity_type: opts.entity_type,
      entity_id: opts.entity_id,
      action_status: opts.action_status,
      description: opts.description,
      endpoint: opts.endpoint,
      request_method: opts.request_method,
      ip_address: opts.ip_address,
      old_data: opts.old_data,
      new_data: opts.new_data,
      metadata: opts.metadata,
    });
  } catch (err) {
    console.error("Failed to record audit:", err);
  }
};

// Convenience Express middleware factory to log after handler
export const auditMiddleware = (actionType: string, entityType?: string, actionStatus = "SUCCESS") => {
  return async (req: any, res: any, next: any) => {
    const user = req.user;
    const origSend = res.send;
    res.send = function (body: any) {
      try {
        recordAudit({
          user_id: user?.id,
          role_id: typeof user?.role === "number" ? user.role : undefined,
          action_type: actionType,
          entity_type: entityType,
          entity_id: req.params?.id || req.body?.id || undefined,
          action_status: actionStatus,
          description: `Request to ${req.path}`,
          endpoint: req.path,
          request_method: req.method,
          ip_address: req.ip,
          old_data: req.body?.old_data ?? null,
          new_data: req.body?.new_data ?? body,
          metadata: { status: res.statusCode },
        });
      } catch (e) {
        console.error(e);
      }
      return origSend.apply(this, arguments as any);
    };
    next();
  };
};
