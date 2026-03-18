import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "../../components/DataTable";
import { useListarAlunos } from "../../hooks/Alunos/useListarAlunos";
import { ActionsMenu } from "../../components/ActionsMenu";
import { useDeleteAluno } from "../../hooks/Alunos/useDeleteAluno";
import Loader from "../../components/Loader";

export function ListarAlunos() {
  const { alunos, getAlunos, alunosLoading, alunosError } = useListarAlunos();
  const { deleteAlunoById, error, loading } = useDeleteAluno();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const formatarDataNascimento = (data: string | null) => {
    if (!data) return "-";

    const dataSemHora = data.substring(0, 10);
    const [ano, mes, dia] = dataSemHora.split("-");

    if (!ano || !mes || !dia) return "-";

    return `${dia}/${mes}/${ano}`;
  };

  useEffect(() => {
    getAlunos();
  }, []);

  if (alunosLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  if (alunosError) {
    return <p>{alunosError}</p>;
  }

  const handleDelete = async (id_aluno: number) => {
    await deleteAlunoById(id_aluno.toString());
    getAlunos();
  };

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Alunos</h1>
        <Link
          to="/alunos/criar"
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
        >
          Adicionar Aluno
        </Link>
      </div>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      <DataTable
        columns={[
          {
            header: "Nome",
            render: (aluno) => aluno.usuario.nome,
          },
          {
            header: "Email",
            render: (aluno) => aluno.usuario.email,
          },
          {
            header: "Data de Nascimento",
            render: (aluno) => formatarDataNascimento(aluno.data_nascimento),
          },
          {
            header: "Observação",
            accessor: "observacao",
          },
          {
            header: "Ações",
            render: (aluno) => (
              <ActionsMenu
                id={aluno.id_aluno}
                type="aluno"
                onDelete={handleDelete}
                isOpen={openMenuId === aluno.id_aluno}
                onToggle={() => toggleMenu(aluno.id_aluno)}
              />
            ),
          },
        ]}
        data={alunos}
      />
    </div>
  );
}
