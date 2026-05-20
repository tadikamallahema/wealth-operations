import jwt from "jsonwebtoken";

import cookie from "cookie";

export const socketAuth =(socket: any, next: any) => {
    try {
       /*  console.log(
   socket.handshake.headers.cookie
); */
        const rawCookie =socket.handshake.headers.cookie;
        if (!rawCookie) {
            return next(
                new Error("No cookies")
            );
        }
        const parsedCookies =cookie.parse(rawCookie);
        const token =parsedCookies.token;
        if (!token) {
            return next(
                new Error("No token")
            );
        }
        const decoded: any =
            jwt.verify(token,process.env.JWT_SECRET!);

        if (decoded.role !== "Admin") {
            return next(new Error("Unauthorized"));
        }
        socket.user = decoded;
        next();
    } catch (err) {
        next(
            new Error("Invalid token")
        );
    }
};