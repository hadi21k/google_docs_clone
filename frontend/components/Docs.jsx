import Doc from "./Doc";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
} from "@/components/ui/table";

const info = ["Name", "Created", "Edited", "Permission", ""];

const Docs = ({ user, docs }) => {
  return (
          <Table>
            <TableHeader>
              <TableRow>
                {info.map((i) => (
                  <TableHead key={i} className="text-sm">
                    {i}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {docs.map((doc) => (
                <Doc doc={doc} username={user?.username} key={doc._id} />
              ))}
            </TableBody>
          </Table>
  );
};

export default Docs;
