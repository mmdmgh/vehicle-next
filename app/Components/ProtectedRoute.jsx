import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import { useRouter } from "next/navigation";

export default function ProtectedRoute() {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && !session) {
      setShowModal(true);
    }
  }, [status, session]);

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/");
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return showModal && <LoginModal onClose={handleCloseModal} />;
  }

  return;
}
