"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const [info, setInfo] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [pending, setPending] = useState(false);

  function handleInput(e) {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!info.email || !info.password) {
      setErr("Must provide all the credentials.");
      return;
    }

    try {
      setPending(true);
      const res = await signIn("credentials", {
        email: info.email,
        password: info.password,
        redirect: false,
      });

      setPending(false);
      if (res.error) {
        setErr("Invalid credentials: " + res.error);
        return;
      }
      router.replace("/");
    } catch (error) {
      setPending(false);
      setErr("Something went wrong");
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className="p-8 rounded flex-1 mx-auto flex-grow ">
        <h2 className="text-blue-600 text-4xl font-bold mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 w-full flex justify-center">
            <div className="relative flex rounded-xl">
              <input
                required
                className="peer bg-transparent outline-none p-2 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
                id="email"
                type="email"
                value={info.email}
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
                className="peer bg-transparent outline-none p-2 text-base rounded-xl bg-white border border-[#4070f4]  focus:shadow-md"
                id="password"
                type="password"
                value={info.password}
                onChange={handleInput}
              />
              <label
                className="absolute top-1/2 -translate-y-1/2 bg-white rounded-full left-4 px-2 peer-focus:top-0  peer-focus:border-[#4070f4] peer-focus:border peer-focus:-translate-y-1/2 peer-focus:left-2 peer-focus:px-2 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:top-0 peer-valid:-translate-y-1/2 peer-valid:left-2 peer-valid:px-1 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                htmlFor="password"
              >
                Password
              </label>
            </div>
          </div>
          {err && <p className="text-red-600 text-sm mb-4">{err}</p>}
          <div className="w-full flex justify-center ">
            <button
              type="submit"
              className=" p-2 bg-blue-600 font-bold text-white rounded hover:bg-blue-700"
              disabled={pending}
            >
              {pending ? "Logging in..." : "Login"}
            </button>
            <Link href="/signup">
              <div className="inline-block align-baseline font-bold text-blue-500 hover:text-blue-700 border rounded py-2 px-4">
                Sign Up
              </div>
            </Link>
          </div>
        </form>
      </div>
      <div className="flex-1 animate-bounce-slow">
        <img
          width={400}
          src="https://utfs.io/f/f276c244-dd6a-4383-a2c9-253121f5a56c-ywrvpa.png"
          alt="Login Illustration"
        />
      </div>
    </div>
  );
};

export default Login;
