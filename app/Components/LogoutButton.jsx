import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: "/" });
    router.push("/");
  };

  return (
    <button onClick={handleLogout} className="w-full text-left p-3 hover:bg-blue-300 transition rounded-lg">
      Logout
    </button>
  );
}
