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
    setinfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className="p-8 rounded flex-1 mx-auto flex-grow">
        <h2 className="text-blue-600 text-4xl font-bold mb-6 text-center">
          Signup
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 w-full flex justify-center">
            <div className="relative flex rounded-xl">
              <input
                required
                className="peer bg-transparent outline-none p-2 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
                id="username"
                type="username"
                onChange={handleInput}
              />
              <label
                className="absolute top-1/2 -translate-y-1/2 bg-white left-4 px-2 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-2 peer-focus:border-[#4070f4] peer-focus:border rounded-full peer-focus:px-1 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:top-0 peer-valid:-translate-y-1/2 peer-valid:left-2 peer-valid:px-1 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                htmlFor="username"
              >
                Username
              </label>
            </div>
          </div>
          <div className="mb-6 w-full flex justify-center">
            <div className="relative flex rounded-xl">
              <input
                required
                className="peer bg-transparent outline-none p-2 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
                id="email"
                type="email"
                onChange={handleInput}
              />
              <label
                className="absolute top-1/2 -translate-y-1/2 bg-white left-4 px-2 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:left-2 peer-focus:border-[#4070f4] peer-focus:border rounded-full peer-focus:px-1 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:top-0 peer-valid:-translate-y-1/2 peer-valid:left-2 peer-valid:px-1 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                htmlFor="email"
              >
                Email Address
              </label>
            </div>
          </div>
          <div className="mb-6 w-full flex justify-center">
            <div className="relative flex rounded-xl">
              <input
                required
                className="peer bg-transparent outline-none p-2 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
                id="password"
                type="password"
                onChange={handleInput}
              />
              <label
                className="absolute top-1/2 -translate-y-1/2 bg-white rounded-full left-4 px-2 peer-focus:top-0 peer-focus:border-[#4070f4] peer-focus:border peer-focus:-translate-y-1/2 peer-focus:left-2 peer-focus:px-2 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:top-0 peer-valid:-translate-y-1/2 peer-valid:left-2 peer-valid:px-1 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                htmlFor="password"
              >
                Password
              </label>
            </div>
          </div>
          {err && <p className="text-red-600 text-sm mb-4">{err}</p>}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="p-2 bg-blue-600 font-bold text-white rounded hover:bg-blue-700"
              disabled={pending}
            >
              {pending ? "Signing up..." : "Sign Up"}
            </button>
            <Link href="/login">
              <div className="ml-4 inline-block align-baseline font-bold text-blue-500 hover:text-blue-700 border rounded py-2 px-4">
                Login
              </div>
            </Link>
          </div>
        </form>
      </div>
      <div className="flex-1 animate-bounce-slow">
        <img
          width={400}
          src="https://utfs.io/f/f276c244-dd6a-4383-a2c9-253121f5a56c-ywrvpa.png"
          alt="Signup Illustration"
        />
      </div>
    </div>
  );
};

export default Signup;
