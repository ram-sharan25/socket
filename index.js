const express = require("express");
const socket = require("socket.io");

const PORT = 4000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT} `);
  console.log(`http://localhost:${PORT}`);
});

app.use(express.static("public"));

const io = socket(server);

const activeUsers = new Set();

io.on("connection", function (socket) {
  console.log("Made socket conneciton");

  socket.on("new user", function (data) {
    socket.userId = data;
    activeUsers.add(data);
    io.emit("new user", [...activeUsers]);
  });

  socket.on("disconnect", () => {
    activeUsers.delete(socket.userId);
    io.emit("user disconnected", socket.userId);
  });
});
