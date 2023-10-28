const logger = require("../config/logger");

module.exports = (io) => {
  const joinRoom = function (docId, username, payload) {
    const socket = this;
    socket.join(docId);
    logger.info(`user ${username} joined room ${docId}`);
    socket.to(docId).emit("user:connected", username);
  };

  const leaveRoom = function (docId, username, payload) {
    const socket = this;
    socket.leave(docId);
    logger.info(`user ${username} left room ${docId}`);
    socket.to(docId).emit("user:disconnected", username);
  };

  const sendChanges = function (docId, content, payload) {
    const socket = this;
    socket.to(docId).emit("changes:receive", content);
  };

  return {
    joinRoom,
    leaveRoom,
    sendChanges,
  };
};
