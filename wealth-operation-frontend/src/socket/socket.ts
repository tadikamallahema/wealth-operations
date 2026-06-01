import { io } from "socket.io-client";

const socket = io(
   "http://localhost:4004",{
        withCredentials: true
    }
);

socket.on("connect", () => {

   console.log(
      "CONNECTED",
      socket.id
   );
});

socket.on("connect_error", (err) => {

   console.log(err);
});

export default socket;