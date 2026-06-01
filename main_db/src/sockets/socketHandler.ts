/* export const socketHandler =
(io: any) => {
   io.on("connection", (socket: any) => {
      /* console.log( "SOCKET CONNECTED"); 
      //console.log(socket.id);
      socket.emit(
         "test_alert",
         {message:  "Realtime socket working" }
      );
   });
}; */
export const socketHandler = (io: any) => {

    io.on("connection", (socket: any) => {

        console.log(
            "Socket Connected:",
            socket.id
        );

        if (socket.user?.role === "Admin") {

            socket.join("admins");

            console.log(
                `Admin joined room: ${socket.id}`
            );
        }

        socket.emit(
            "test_alert",
            {
                message:
                    "Realtime socket working"
            }
        );

        socket.on(
            "disconnect",
            () => {
                console.log(
                    "Socket disconnected:",
                    socket.id
                );
            }
        );
    });
};