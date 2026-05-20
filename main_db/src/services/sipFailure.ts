/* /* import {
    emitSipFailure
}
from "./realtimeEmitter.js";
 
export const createSipFailure =
async (failureData: any) => {

    // save failure to DB

    emitSipFailure({

        customerRef:
            failureData.customer_ref,

        schemeCode:
            failureData.scheme_code,

        reason:
            failureData.failure_reason,

        severity: "HIGH"
    });
}; */