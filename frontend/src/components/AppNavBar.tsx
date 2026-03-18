import { useNavigate } from "react-router-dom";
import type { navItemType } from "../types/navItemType";
import { House, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function AppNavBar() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const navItems: navItemType[] = [
    {
      name: "Home",
      page: "/home",
      icon: <House />,
      showCondition: true,
    },
    {
      name: "Alunos",
      page: "/alunos",
      icon: <User />,
      showCondition: usuario?.is_personal,
    },
    {
      name: "Personais",
      page: "/personais",
      icon: <User />,
      showCondition: usuario?.is_super_admin,
    },
  ];

  return (
    <ul className="flex flex-col text-black">
      {navItems.map(
        (item, index) =>
          item.showCondition && (
            <li
              key={index}
              className="flex w-full cursor-pointer p-4 hover:bg-gray-200"
              onClick={() => navigate(item.page)}
            >
              {item.icon}
              <span className="px-3">{item.name}</span>
            </li>
          ),
      )}
      ;
    </ul>
  );
}
