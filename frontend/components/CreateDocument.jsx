"use client";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { createDoc } from "@/services/actions/createDoc";

const CreateDocument = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await createDoc(title);

      if (data.error) {
        throw new Error(data.error.message);
      }

      toast({
        description: data,
      });

      router.refresh();
      setOpen(false);
    } catch (error) {
      toast({
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-md bg-secondary">Create Document</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-white">Create Document</DialogTitle>
          <form onSubmit={submit} className="space-y-3 flex flex-col">
            <Input
              type="text"
              placeholder="Document Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button className="bg-primary">Create</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDocument;
