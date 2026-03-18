import { Link } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";

type ActionsMenuProps = {
  id: number;
  type: "aluno" | "personal";
  onDelete: (id: number) => void;
  isOpen: boolean;
  onToggle: () => void;
};

export function ActionsMenu({
  id,
  type,
  onDelete,
  isOpen,
  onToggle,
}: ActionsMenuProps) {
  const editLink =
    type === "aluno" ? `/alunos/editar/${id}` : `/personais/editar/${id}`;
  const personalStudentsLink = `/personais/${id}/alunos`;
  const alunoTreinosLink = `/alunos/${id}/treinos`;

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-white cursor-pointer focus:ring-4 focus:outline-none focus:ring-gray-50"
      >
        <EllipsisVertical />
      </button>
      {isOpen && (
        <div className="absolute z-10 bg-white divide-y divide-white rounded-lg shadow w-44">
          <ul className="py-2 text-sm text-gray-700">
            {type === "personal" && (
              <li>
                <Link
                  to={personalStudentsLink}
                  onClick={onToggle}
                  className="block px-4 py-2 hover:bg-white"
                >
                  Listar alunos
                </Link>
              </li>
            )}
            {type === "aluno" && (
              <li>
                <Link
                  to={alunoTreinosLink}
                  onClick={onToggle}
                  className="block px-4 py-2 hover:bg-white"
                >
                  Vincular exercicios
                </Link>
              </li>
            )}
            <li>
              <Link
                to={editLink}
                onClick={onToggle}
                className="block px-4 py-2 hover:bg-white"
              >
                Editar
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  onDelete(id);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-white"
              >
                Excluir
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
