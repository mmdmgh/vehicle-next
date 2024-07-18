"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [info, setinfo] = useState({ username: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [pending, setpending] = useState(false);

  function handleInput(e) {
    setinfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!info.username || !info.email || !info.password) {
      setErr("Must provide all the credentials.");
    }
    try {
      setpending(true);
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      if (res.ok) {
        setpending(false);
        const form = e.target;
        form.reset();
        router.push("/login");
      } else {
        const data = await res.json();
        setErr(data.message);

        setpending(false);
      }
    } catch (error) {
      setpending(false);
      setErr("something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="username"
              name="username"
              onChange={(e) => handleInput(e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
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
              name="password"
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
              {pending ? "Signing up..." : "Sign up"}
            </button>
            <Link href="/login">
              <div className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Already have an account? Log In
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
