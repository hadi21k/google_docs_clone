import Editor from "@/components/Editor";
import Navbar from "@/components/Navbar";
import getDoc from "@/services/getDoc";
import getUser from "@/services/getUser";
import { redirect } from "next/navigation";

const page = async ({ params }) => {
  const userData = getUser();
  const docData = getDoc(params.docId);

  const user = await userData;
  const doc = await docData;

  if (!user) redirect("/login");
  if (!doc) redirect("/");

  if (
    doc.public_access === "Private" &&
    doc.collaborators.filter(
      (collaborator) => collaborator.user._id === user._id
    )[0]?.permission !== "owner"
  )
    redirect("/");

  return (
    <main className="bg-primary min-h-screen text-white">
      <Navbar user={user} />
      <Editor doc={doc} user={user} />
    </main>
  );
};

export default page;
