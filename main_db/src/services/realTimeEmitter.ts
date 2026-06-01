import { getIO }
from "../config/socket.js";

import { SOCKET_EVENTS }
from "../sockets/socketEvents.js";

export const emitSuspiciousActivity =
(data: any) => {

    const io = getIO();

    console.log(
        "Emitting suspicious activity"
    );

    io.to("admins").emit(
        SOCKET_EVENTS.SUSPICIOUS_ACTIVITY,
        data
    );
};

export const emitSipFailure =
(data: any) => {

    const io = getIO();

    console.log(
        "Emitting SIP failure"
    );

    io.to("admins").emit(
        SOCKET_EVENTS.SIP_FAILURE,
        data
    );
};

export const emitServiceDown =
(data: any) => {

    const io = getIO();

    console.log(
        "Emitting service down"
    );

    io.to("admins").emit(
        SOCKET_EVENTS.SERVICE_DOWN,
        data
    );
};