"use client";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import toolbarOptions from "@/lib/quill_options";
import { socket } from "@/lib/socket";
import { useToast } from "./ui/use-toast";
import {
  onConnect,
  onDisconnect,
  receiveChanges,
  userConnected,
  userDisconnected,
} from "@/lib/socket_helpers";
import Header from "@/components/Header";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const Editor = ({ doc, user }) => {
  const [value, setValue] = useState(doc.content);
  const [_, setIsConnected] = useState(socket.connected);
  const { toast } = useToast();

  useEffect(() => {
    socket.on("connect", onConnect(setIsConnected));
    socket.on("disconnect", onDisconnect(setIsConnected));
    socket.on("changes:receive", receiveChanges(setValue));
    socket.on("user:connected", userConnected(toast));
    socket.on("user:disconnected", userDisconnected(toast));

    socket.emit("room:join", doc._id, user.username);

    return () => {
      socket.off("connect", onConnect(setIsConnected));
      socket.off("disconnect", onDisconnect(setIsConnected));
      socket.off("changes:receive", receiveChanges(setValue));
      socket.off("user:connected", userConnected(toast));
      socket.off("user:disconnected", userDisconnected(toast));

      socket.emit("room:leave", doc._id, user.username);
    };
  }, []);

  const onChange = (content, delta, source, editor) => {
    if (source === "user") {
      setValue(editor.getHTML());
      socket.emit("changes:send", doc._id, editor.getHTML());
    }
  };

  return (
    <>
      {doc.public_access === "Anyone with the link can edit" ||
        doc.collaborators.filter(
          (collaborator) => collaborator.user._id === user._id
        )[0]?.permission === "owner" ? <Header content={value} doc={doc} socket={socket} /> : null}
      <div className="container mx-auto">
        <QuillNoSSRWrapper
          className="ql-editor min-h-[calc(100vh-160px)]"
          modules={{ toolbar: toolbarOptions }}
          theme="snow"
          value={value}
          onChange={onChange}
          readOnly={
            doc.public_access === "View Only" &&
            doc.collaborators.filter(
              (collaborator) => collaborator.user._id === user._id
            )[0]?.permission !== "owner"
          }
        />
      </div>
    </>
  );
};

export default Editor;
