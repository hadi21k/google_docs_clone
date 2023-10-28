import { cookies } from "next/headers";

const getDocs = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/documents`,
      {
        method: "GET",
        headers: { Cookie: cookies().toString() },
        cache: "no-cache",
      }
    );
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getDocs;
