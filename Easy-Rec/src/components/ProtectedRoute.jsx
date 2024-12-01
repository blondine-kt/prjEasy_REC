import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/userAuth';

const ProtectedRoute = ({ children, userType }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={`/${userType}/login`} />;
  }

  if (user.type !== userType) {
    return <Navigate to={`/${user.type}/dashboard`} />;
  }

  return children;
};
export default ProtectedRoute