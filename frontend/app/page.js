import Docs from "@/components/Docs";
import Navbar from "@/components/Navbar";
import getDocs from "@/services/getDocs";
import getUser from "@/services/getUser";
import { redirect } from "next/navigation";

export default async function Home() {
  const userData = getUser();
  const docsData = getDocs();

  const user = await userData;
  const docs = await docsData;
  if (!user) redirect("/login");
  console.log(user, JSON.stringify(docs, null, 2));
  return (
    <div className="bg-primary min-h-screen text-white">
      <Navbar user={user} />
      <Docs user={user} docs={docs} />
    </div>
  );
}
