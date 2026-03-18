import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "../../components/DataTable";
import { useListarPersonals } from "../../hooks/Personais/useListarPersonals";
import { ActionsMenu } from "../../components/ActionsMenu";
import { useDeletePersonal } from "../../hooks/Personais/useDeletePersonal";
import Loader from "../../components/Loader";

export function ListarPersonais() {
  const { personals, getPersonals, personalsLoading, personalsError } =
    useListarPersonals();
  const { deletePersonalById, error, loading } = useDeletePersonal();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  useEffect(() => {
    getPersonals();
  }, []);

  if (personalsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (personalsError) {
    return <p>{personalsError}</p>;
  }

  const handleDelete = async (id_personal: number) => {
    await deletePersonalById(id_personal.toString());
    getPersonals();
  };

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Personais</h1>
        <Link
          to="/personais/criar"
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
        >
          Adicionar Personal
        </Link>
      </div>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      )}
      {error && <p>{error}</p>}
      <DataTable
        columns={[
          {
            header: "Nome",
            render: (personal) => personal.usuario.nome,
          },
          {
            header: "Email",
            render: (personal) => personal.usuario.email,
          },
          {
            header: "Telefone",
            accessor: "telefone",
          },
          {
            header: "CREF",
            render: (personal) => personal.cref ?? "-",
          },
          {
            header: "Ações",
            render: (personal) => (
              <ActionsMenu
                id={personal.id_personal}
                type="personal"
                onDelete={() => handleDelete(personal.id_personal)}
                isOpen={openMenuId === personal.id_personal}
                onToggle={() => toggleMenu(personal.id_personal)}
              />
            ),
          },
        ]}
        data={personals}
      />
    </div>
  );
}
