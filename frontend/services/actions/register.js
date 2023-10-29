"use server";
import { cookies } from "next/headers";

export const registerAction = async (email, username, password) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error.message);
  }

  cookies().set("token", data.token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
  });
};
