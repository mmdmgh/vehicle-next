"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../Components/ProtectedRoute";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/sell");
    } 
  
  }, [session]);

  return (
    <ProtectedRoute/>

  );
}
