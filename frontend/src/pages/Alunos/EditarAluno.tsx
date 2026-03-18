import { Link, useNavigate, useParams } from "react-router-dom";
import { FormAluno, type AlunoFormData } from "../../components/FormAluno";
import { useGetAlunoById } from "../../hooks/Alunos/useGetAlunoById";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { useUpdateAluno } from "../../hooks/Alunos/useUpdateAluno";
import type { Aluno } from "../../types/aluno";

export function EditarAluno() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    aluno: alunoData,
    alunoLoading,
    alunoError,
    getAluno,
  } = useGetAlunoById();
  const { updateAluno, updateAlunoLoading, aluno } = useUpdateAluno();

  const [initialData, setInitialData] = useState<AlunoFormData | undefined>();

  useEffect(() => {
    if (id) {
      getAluno(id);
    }
  }, [id]);

  useEffect(() => {
    if (alunoData) {
      setInitialData({
        nome: alunoData.usuario.nome,
        email: alunoData.usuario.email,
        dataNascimento: alunoData.data_nascimento
          ? alunoData.data_nascimento.substring(0, 10)
          : "",
        observacao: alunoData.observacao ?? "",
        password: "",
      });
    }
  }, [alunoData]);

  const handleSubmit = (data: AlunoFormData) => {
    if (id) {
      const aluno: Partial<Omit<Aluno, "id_aluno">> = {
        data_nascimento: data.dataNascimento,
        observacao: data.observacao,
        usuario: {
          nome: data.nome,
          email: data.email,
          senha: data.password,
        },
      };

      updateAluno(id, aluno);
    }
  };

  useEffect(() => {
    if (aluno) {
      navigate("/alunos");
    }
  }, [aluno, navigate]);

  if (alunoLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (alunoError) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Editar Aluno</h1>
          <Link
            to="/alunos"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Voltar
          </Link>
        </div>
        <p>{alunoError}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Editar Aluno</h1>
        <Link
          to="/alunos"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Voltar
        </Link>
      </div>

      {initialData && (
        <FormAluno
          onSubmit={handleSubmit}
          initialData={initialData}
          submitLabel={updateAlunoLoading ? "Salvando..." : "Atualizar Aluno"}
        />
      )}
    </div>
  );
}
