import { cookies } from "next/headers";

const getDocs = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/documents`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookies().getAll()[0].value}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getDocs;
