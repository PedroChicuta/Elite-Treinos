import { useNavigate } from "react-router-dom";
import type { navItemType } from "../types/navItemType";
import { House, User } from "lucide-react";

export function AppNavBar() {
  const navigate = useNavigate();

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
      showCondition: true,
    },
    {
      name: "Personais",
      page: "/personais",
      icon: <User />,
      showCondition: true,
    },
  ];

  return (
    <ul className="flex flex-col text-black">
      {navItems.map((item, index) => (
        <li
          key={index}
          className="flex w-full cursor-pointer p-4 hover:bg-gray-200"
          onClick={() => navigate(item.page)}
        >
          {item.icon}
          <span className="px-3">{item.name}</span>
        </li>
      ))}
    </ul>
  );
}
