import jwt from "jsonwebtoken";
import cookie from "cookie";

export const socketAuth = (
    socket: any,
    next: any
) => {
    try {

        console.log("=== SOCKET AUTH START ===");

        const rawCookie =
            socket.handshake.headers.cookie;

        console.log("Raw Cookie:", rawCookie);

        if (!rawCookie) {
            return next(
                new Error("No cookies")
            );
        }

        const parsedCookies =
            cookie.parse(rawCookie);

        console.log(
            "Parsed Cookies:",
            parsedCookies
        );

        // Use accessToken instead of token
        const token =
            parsedCookies.accessToken;

        if (!token) {
            return next(
                new Error(
                    "No access token"
                )
            );
        }

        const decoded: any =
            jwt.verify(
                token,
                process.env.JWT_SECRET!
            );

        console.log(
            "Decoded User:",
            decoded
        );

        if (
            decoded.role !== "Admin"
        ) {
            return next(
                new Error(
                    "Unauthorized"
                )
            );
        }

        socket.user = decoded;

        console.log(
            "Socket Auth Success"
        );

        next();

    } catch (err) {

        console.log(
            "Socket Auth Error:",
            err
        );

        next(
            new Error(
                "Invalid token"
            )
        );
    }
};