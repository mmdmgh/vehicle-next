import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import LoginModal from './LoginModal';

export default function ProtectedRoute() {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status !== 'loading' && !session) {
      setShowModal(true);
    }
  }, [status, session]);

  const handleCloseModal = () => {
    setShowModal(false);
    
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return showModal && <LoginModal onClose={handleCloseModal} />;
  }

  return;
}
