"use server";
import { cookies } from "next/headers";

export const deleteDoc = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/documents/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookies().getAll()[0].value}`,
      },
    }
  );
  const data = await res.json();

  return data;
};
