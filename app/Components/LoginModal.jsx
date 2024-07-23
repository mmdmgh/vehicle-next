import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginModal({ onClose }) {
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
        setErr("Invalid credentials" + res.error);
        return;
      }
      router.replace("/");
    } catch (error) {
      setpending(false);
      setErr("something went wrong");
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className=" bg-white p-8 rounded shadow-md md:w-1/4">
        <h2 className="text-2xl text-center p-5 font-semibold mb-2">Login</h2>
        {err && <p className="text-red-500 mb-4">{err}</p>}
        <form onSubmit={handleSubmit} class="items-center justify-center">
          <div class="relative">
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => handleInput(e)}
              class="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-600 transition-colors focus:outline-none peer bg-inherit mb-8"
              required
            />
            <label
              for="email"
              class="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-valid:text-xs peer-valid:-top-4 transition-all peer-focus:text-blue-600"
            >
              Email
            </label>
          </div>

          <div class="relative">
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => handleInput(e)}
              class="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-600 transition-colors focus:outline-none peer bg-inherit mb-8"
              required
            />
            <label
              for="password"
              class="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-valid:text-xs peer-valid:-top-4 transition-all peer-focus:text-blue-600"
            >
              Password
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={pending ? true : false}
            >
              {pending ? "Logging in..." : "Log in"}
            </button>
            <Link href="/signup">
              <div className="inline-block align-baseline font-bold text-blue-500 hover:text-blue-700 border rounded py-2 px-4">
                Sign Up
              </div>
            </Link>
            <button className="ml-auto font-semibold border text-blue-500 py-2 px-4 align-baseline rounded" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
