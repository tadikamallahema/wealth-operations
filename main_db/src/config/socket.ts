import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any) => {

    io = new Server(server, {

        cors: {

            origin: "http://localhost:5173",

            credentials: true
        }
    });

    console.log("Socket Initialized");

    return io;
};

export const getIO = () => {

    if (!io) {

        throw new Error(
            "Socket.IO not initialized"
        );
    }

    return io;
};