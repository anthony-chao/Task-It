import io from "socket.io-client";

export const socket = io(process.env.PORT || "http://localhost:3000");
