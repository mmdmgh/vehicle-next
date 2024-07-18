"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const [info, setinfo] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [pending, setpending] = useState(false);

  function handleInput(e) {
    setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!info.email || !info.password) {
      setErr("Must provide all the credentials.");
    }

    try {
      
      setpending(true);
      const res = await signIn("credentials", {
        email: info.email,
        password: info.password,
        redirect: false,
      });
   
      setpending(false);
      if (res.error) {
        setErr("Invalid credentials"+ res.error);
        return;
      }
      router.replace("/");
    } catch (error) {
      setpending(false);
      setErr("something went wrong");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => handleInput(e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => handleInput(e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            {err && <span>{err}</span>}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={pending ? true : false}
            >
              {pending ? "Logging in..." : "Log in"}
            </button>
            <Link href="/signup">
              <div className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Don't have an account? Sign Up
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
