import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: "/" }); // Redirect to homepage after logout
    router.push("/"); // Optionally, manually redirect
  };

  return (
    <button onClick={handleLogout} className="p-3">
      Logout
    </button>
  );
}
