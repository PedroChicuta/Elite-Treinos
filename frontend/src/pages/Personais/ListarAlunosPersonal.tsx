import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataTable } from "../../components/DataTable";
import Loader from "../../components/Loader";
import { useListarAlunosPersonal } from "../../hooks/Personais/useListarAlunosPersonal";

export function ListarAlunosPersonal() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const {
    getAlunosPersonal,
    alunosPersonal,
    alunosPersonalLoading,
    alunosPersonalError,
  } = useListarAlunosPersonal();

  const formatarDataNascimento = (data: string | null) => {
    if (!data) return "-";

    const dataSemHora = data.substring(0, 10);
    const [ano, mes, dia] = dataSemHora.split("-");

    if (!ano || !mes || !dia) return "-";

    return `${dia}/${mes}/${ano}`;
  };

  useEffect(() => {
    if (!id) {
      setError("Personal nao informado.");
      return;
    }

    setError(null);
    getAlunosPersonal(id);
  }, [id]);

  if (alunosPersonalLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error || alunosPersonalError) {
    return <p>{error ?? alunosPersonalError}</p>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Alunos do personal</h1>
        <Link
          to="/personais"
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
        >
          Voltar para personais
        </Link>
      </div>

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
            header: "Observacao",
            accessor: "observacao",
          },
        ]}
        data={alunosPersonal}
      />
    </div>
  );
}
