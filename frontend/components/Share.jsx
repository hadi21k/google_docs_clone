"use client";
import { useState } from "react";
import { DialogHeader } from "./ui/dialog";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Link2Icon } from "@radix-ui/react-icons";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { changeAccess } from "@/services/actions/changeAccess";

const Share = ({ doc }) => {
  const { toast } = useToast();
  const [access_type, setAccessType] = useState(doc.public_access);
  const router = useRouter();
  const [linkCopied, setLinkCopied] = useState(false);

  const changeAccessType = async (e) => {
    try {
      const data = await changeAccess(doc._id, e);

      if (data.error) {
        throw new Error(data.error.message);
      }

      toast({
        description: data,
      });
      router.refresh();
    } catch (error) {
      toast({
        description: error.message,
      });
    }
    setAccessType(e);
  };

  const copyLink = () => {
    window.navigator.clipboard.writeText(
      `${window.location.origin}/docs/${doc._id}`
    );
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 1500);
  };

  return (
    <>
      <DialogHeader className="mt-5 text-white">
        <div className="flex justify-between items-center">
          <h1>Share File</h1>
          <Button className="border-white border" onClick={copyLink}>
            {linkCopied ? (
              <>Link Copied</>
            ) : (
              <>
                <Link2Icon className="h-4 w-4 mr-1.5" />
                Copy Link
              </>
            )}
          </Button>
        </div>
      </DialogHeader>
      <Separator />
      <Select onValueChange={changeAccessType} value={access_type}>
        <SelectTrigger className="w-full text-white">
          <SelectValue placeholder="Private" />
        </SelectTrigger>
        <SelectContent className="bg-secondary border-0 text-white">
          <SelectItem value="Private">Private</SelectItem>
          <SelectItem value="View Only">View Only</SelectItem>
          <SelectItem value="Anyone with the link can edit">
            Anyone with the link can edit
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default Share;
