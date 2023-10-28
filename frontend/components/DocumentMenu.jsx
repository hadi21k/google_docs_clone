"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DotsHorizontalIcon,
  Pencil1Icon,
  Share1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Share from "./Share";

const DocumentMenu = ({ setHandleEdit, deleteDocument, doc }) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DotsHorizontalIcon className="w-5 h-5 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-primary p-1 text-white border-0 shadow-xl">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setHandleEdit(true)}
          >
            <Pencil1Icon className="w-4 h-4 mr-2" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={deleteDocument}>
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer">
              <Share1Icon className="w-4 h-4 mr-2" />
              Share
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="text-white">
        <Share doc={doc} setOpenDialog={setOpenDialog} />
      </DialogContent>
    </Dialog>
  );
};

export default DocumentMenu;
