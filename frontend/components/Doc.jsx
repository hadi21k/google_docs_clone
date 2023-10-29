"use client";
import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "./ui/badge";
import Link from "next/link";
import DocumentMenu from "./DocumentMenu";
import { Input } from "./ui/input";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { timeSinceLastUpdate } from "@/lib/time";
import { renameDoc } from "@/services/actions/renameDoc";
import { deleteDoc } from "@/services/actions/deleteDoc";

const Doc = ({ doc, username }) => {
  const [handleEdit, setHandleEdit] = useState(false);
  const [title, setTitle] = useState(doc.title);
  const { toast } = useToast();
  const router = useRouter();

  const renameDocument = async () => {
    try {
      console.log(doc._id)
      const data = await renameDoc(doc._id, title);

      toast({
        description: data,
      });

      router.refresh();
      setHandleEdit(false);
    } catch (error) {
      toast({
        description: error.message,
      });
    }
  };

  const deleteDocument = async () => {
    try {
      const data = await deleteDoc(doc._id);
      toast({
        description: data,
      });

      router.refresh();
    } catch (error) {
      toast({
        description: error.message,
      });
    }
  };

  return (
    <TableRow className="h-16 hover:bg-secondary transition-colors duration-300 max-sm:text-xs">
      <TableCell className="font-medium lg:w-[800px]">
        {handleEdit ? (
          <div className="flex items-center space-x-1">
            <Input
              type="text"
              placeholder="Document Title"
              className="border-0"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <CheckIcon
              onClick={renameDocument}
              className="w-6 h-6 ml-2 cursor-pointer"
            />
            <Cross2Icon
              onClick={() => setHandleEdit(false)}
              className="w-6 h-6 ml-2 cursor-pointer"
            />
          </div>
        ) : (
          <Link href={`/docs/${doc._id}`}>{doc.title}</Link>
        )}
      </TableCell>
      <TableCell suppressHydrationWarning={true} className="text-xs">
        {new Date(doc.timestamp).toLocaleDateString()}
      </TableCell>
      <TableCell suppressHydrationWarning={true} className="text-xs">
        {timeSinceLastUpdate(doc)}
      </TableCell>
      <TableCell>
        <Badge className="text-[#ffce45]">
          {
            doc.collaborators.find((c) => c.user.username === username)
              ?.permission
          }
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <DocumentMenu
          deleteDocument={deleteDocument}
          setHandleEdit={setHandleEdit}
          doc={doc}
        />
      </TableCell>
    </TableRow>
  );
};

export default Doc;
