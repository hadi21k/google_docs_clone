import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Share from "./Share";
import { Share1Icon } from "@radix-ui/react-icons";

const DropdownShareMenu = ({ doc }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share1Icon className="h-5 w-5 mr-1.5" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Share doc={doc} />
      </DialogContent>
    </Dialog>
  );
};

export default DropdownShareMenu;
