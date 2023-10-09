const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const PORT = 4000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

server.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static("public"));

// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     io.emit("chat massage", msg);
//   });

//   socket.on("disconnect", () => {
//     io.emit("chat message", "User Dissconnected");
//     console.log("User Disconnected");
//   });
// });

io.on("connection", (socket) => {
  console.log("User connected");
  io.emit("User Connected");

  socket.on("disconnect", () => {
    io.emit("chat message", "User Dissconnected");
    console.log("User Disconnected");
  });
});
