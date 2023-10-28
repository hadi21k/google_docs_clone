import React from "react";
import Doc from "./Doc";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import CreateDocument from "./CreateDocument";

// const docs = [
//   {
//     id: 1,
//     title: "My First Doc",
//     createdAt: 1630540800000,
//     updatedAt: 1630540800000,
//     content: "This is my first doc",
//     collaborators: [
//       {
//         id: 10,
//         username: "hadi21k",
//         email: "ugoke@fojbetbis.ir",
//         permission: "owner",
//       },
//       {
//         id: 11,
//         username: "angel",
//         email: "sonni@laribte.mw",
//         permission: "editor",
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "Meeting Minutes",
//     createdAt: 1630640800000,
//     updatedAt: 1630640800000,
//     content: "Minutes of the team meeting held on October 18, 2023.",
//     collaborators: [
//       {
//         id: 12,
//         username: "hadi21k",
//         email: "johndoe@example.com",
//         permission: "owner",
//       },
//       {
//         id: 13,
//         username: "susan_smith",
//         email: "susan@example.com",
//         permission: "editor",
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "Project Proposal",
//     createdAt: 1630740800000,
//     updatedAt: 1630740800000,
//     content: "A proposal for our upcoming project.",
//     collaborators: [
//       {
//         id: 14,
//         username: "hadi21k",
//         email: "peter@example.com",
//         permission: "editor",
//       },
//       {
//         id: 15,
//         username: "mary_jane",
//         email: "mary@example.com",
//         permission: "owner",
//       },
//     ],
//   },
// ];

const info = ["Name", "Created", "Edited", "Permission", ""];

const Docs = ({ user, docs }) => {
  return (
    <div>
      <div className="container mx-auto">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="md:text-xl font-semibold text-lg text-[#ffce45]">
            Your Documents
          </h1>
          <CreateDocument />
        </div>
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
      </div>
    </div>
  );
};

export default Docs;
