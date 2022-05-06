const SocketServer = (socket) => {
  // Send and receive message
  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data);
  });
};

module.exports = SocketServer;
