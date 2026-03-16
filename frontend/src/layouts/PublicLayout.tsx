import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";

export function PublicLayout() {
  const { usuario, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (usuario) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
