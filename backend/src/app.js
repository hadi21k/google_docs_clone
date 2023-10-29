require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const logger = require("./config/logger");
const connectDB = require("./config/connectMongo");
const cookieParser = require("cookie-parser");
const { authenticated } = require("./middlewares/auth.middlware");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

const { joinRoom, leaveRoom, sendChanges } =
  require("./subscriptions/document.listener")(io);

app.use("/v2/api/auth", require("./routes/v2/auth.route"));
app.use("/api/users", require("./routes/user.route"));
app.use("/api/documents", authenticated, require("./routes/document.route"));

app.use(require("./middlewares/error.middleware"));

io.on("connection", (socket) => {
  logger.info("a user connected");

  socket.on("room:join", joinRoom);

  socket.on("room:leave", leaveRoom);

  socket.on("changes:send", sendChanges);

  socket.on("disconnect", () => {
    logger.info("user disconnected");
  });
});

server.listen(PORT, async () => {
  await connectDB();
  logger.info(`Server is running on port ${PORT}`);
});
