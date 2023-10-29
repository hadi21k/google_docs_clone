"use client";
import React from "react";
import DropdownShareMenu from "./DropdownShareMenu";
import { Button } from "./ui/button";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { useToast } from "./ui/use-toast";
import { saveDoc } from "@/services/actions/saveDoc";

const Header = ({ content, doc, socket }) => {
  const { toast } = useToast();
  const save = async () => {
    try {
      const data = await saveDoc(doc._id, content);
      toast({
        description: data,
      });
      socket.emit("changes:send", doc._id, content);
    } catch (error) {
      toast({
        description: error.message,
      });
    }
  };
  return (
    <div className="h-20 flex">
      <div className="container mx-auto flex items-center justify-end space-x-2">
        <DropdownShareMenu doc={doc} />
        <Button variant="outline" className="mr-2" onClick={save}>
          <BookmarkIcon className="w-5 h-5 mr-1.5" />
          Save
        </Button>
      </div>
    </div>
  );
};

export default Header;
