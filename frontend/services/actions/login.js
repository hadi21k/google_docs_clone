"use server";
import { cookies } from "next/headers";

export const loginAction = async (username, password) => {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/api/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
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
