export function onConnect(setIsConnected) {
  return () => {
    setIsConnected(true);
  };
}

export function onDisconnect(setIsConnected) {
  return () => {
    setIsConnected(false);
  };
}

export function receiveChanges(setValue) {
  return (content) => {
    setValue(content);
  };
}

export function userConnected(toast) {
  return (username) => {
    console.log(`${username} connected`);
    toast({
      description: `${username} connected`,
    });
  };
}

export function userDisconnected(toast) {
  return (username) => {
    console.log(`${username} disconnected`);
    toast({
      description: `${username} disconnected`,
    });
  };
}

export function joinRoom(socket, doc, user) {
  socket.emit("room:join", doc._id, user.username);
}

export function leaveRoom(socket, doc, user) {
  socket.emit("room:leave", doc._id, user.username);
}
