const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const db = require("./configs/db.config.js");
const SocketServer = require("./socket.js");
require("dotenv").config();

// DATABASE
db.connect();

// MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

// SOCKET
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  SocketServer(socket);
});

// ROUTES
// app.use("/api", require("./routes/"));

const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
