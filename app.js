const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const db = require("./configs/db.config.js");
const SocketServer = require("./socket.js");
require("dotenv").config();
const auth = require("./src/middlewares/auth.middleware");

// DATABASE
db.connect();

// MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use(cors());
app.use(cookieParser());

// SOCKET
const http = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(http, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
  SocketServer(socket);

  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
  });
});

// ROUTES
app.use("/api/auth", require("./src/routes/auth.route"));
app.use("/api/user", auth, require("./src/routes/user.route"));
app.use("/api/upload", auth, require("./src/routes/upload.route"));
app.use("/api/message", auth, require("./src/routes/message.route"));
app.use("/api/conversation", auth, require("./src/routes/conversation.route"));

const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
