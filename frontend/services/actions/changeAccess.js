"use server";
import { cookies } from "next/headers";

export const changeAccess = async (id, access) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/documents/${id}/access`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().getAll()[0].value}`,
      },
      body: JSON.stringify({
        access_type: access,
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error.message);
  }

  return data;
};
