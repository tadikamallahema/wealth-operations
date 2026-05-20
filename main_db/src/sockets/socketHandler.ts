/* import { Server } from "socket.io";

export const socketHandler =(io: Server) => {
    console.log(
   "Socket connected:"
);
    io.on("connection", (socket) => {
        console.log(
            `Admin Connected: ${socket.id}`
        );
        socket.join("admins");
        socket.on("disconnect", () => {
            console.log(
                `Disconnected: ${socket.id}`
            );
        });
    });
}; */
export const socketHandler =
(io: any) => {

   io.on("connection", (socket: any) => {

      console.log(
         "SOCKET CONNECTED"
      );

      console.log(socket.id);

      socket.emit(
         "test_alert",
         {
            message:
              "Realtime socket working"
         }
      );
   });
};