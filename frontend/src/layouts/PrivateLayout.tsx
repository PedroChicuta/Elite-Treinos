import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import { AppNavBar } from "../components/AppNavBar";
import { Logo } from "../components/Logo";
import { LogoutButton } from "../components/LogoutButton";

export function PrivateLayout() {
  const { usuario, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex">
      {usuario && (
        <>
          <nav className="min-w-64 flex flex-col justify-between h-screen shadow-[6px_0_10px_-6px_rgba(0,0,0,0.2)]">
            <div>
              <Logo />
              <AppNavBar />
            </div>
            <LogoutButton />
          </nav>
        </>
      )}
      <div className="p-10 w-full">
        <Outlet />
      </div>
    </div>
  );
}
