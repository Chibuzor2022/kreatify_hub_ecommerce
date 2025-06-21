import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedAdminRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" />;
  if (!user.isAdmin) return <Navigate to="/" />; // redirect if not admin

  return children;
}
