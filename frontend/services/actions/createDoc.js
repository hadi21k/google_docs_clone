"use server";

import { cookies } from "next/headers";

export const createDoc = async (title) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/documents`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().getAll()[0].value}`,
      },
      body: JSON.stringify({
        title,
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error.message);
  }

  return data;
};
