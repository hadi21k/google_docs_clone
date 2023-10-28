"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-primary">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`}
            method="POST"
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
              >
                username
              </label>
              <div className="mt-2">
                <Input
                  id="username"
                  name="username"
                  type="username"
                  required
                  className="bg-white text-secondary"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <Input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="bg-white text-secondary"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                Sign in
              </button>
            </div>
            <div className="text-white text-sm">
              <span>Don't have an account?</span>
              <Link
                href="/register"
                className="text-white ml-0.5 text-sm underline"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
