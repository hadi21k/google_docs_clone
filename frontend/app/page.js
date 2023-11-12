import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import getDocs from "@/services/getDocs";
import getUser from "@/services/getUser";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import CreateDocument from "@/components/CreateDocument";
import LoadingSkeleton from "@/components/Loading";

const Docs = dynamic(() => import("@/components/Docs"), {
  loading: () => <LoadingSkeleton />,
  ssr: false,
});

export default async function Home() {
  const userData = getUser();
  const docsData = getDocs();

  const user = await userData;

  const docs = await docsData;
  if (!user) redirect("/login");
  return (
    <div className="bg-primary min-h-screen text-white">
      <Navbar user={user} />
      <div className="container mx-auto">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="md:text-xl font-semibold text-lg text-[#ffce45]">
            Your Documents
          </h1>
          <CreateDocument />
        </div>
        <Suspense fallback={<LoadingSkeleton />}>
          <Docs user={user} docs={docs} />
        </Suspense>
      </div>
    </div>
  );
}
