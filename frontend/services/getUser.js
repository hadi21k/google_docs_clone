import { cookies } from "next/headers";

const getUser = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookies().getAll()[0]?.value}`,
        },
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

export default getUser;
