import { LogOut } from "lucide-react";
import { useLogout } from "../hooks/UseLogout";

export function LogoutButton() {
  const { handleLogout } = useLogout();

  return (
    <button
      onClick={() => handleLogout()}
      className="flex w-full cursor-pointer p-4 hover:bg-gray-200 text-red-500"
    >
      <LogOut />
      <span className="px-3">Sair</span>
    </button>
  );
}