import { Link, useNavigate } from "react-router-dom";
import { FormAluno, type AlunoFormData } from "../../components/FormAluno";
import { useCreateAluno } from "../../hooks/Alunos/useCreateAluno";
import { useEffect } from "react";
import type { Aluno } from "../../types/aluno";

export function CriarAluno() {
  const navigate = useNavigate();
  const { createAluno, createAlunoLoading, aluno } = useCreateAluno();
  const handleSubmit = (data: AlunoFormData) => {
    const aluno: Omit<Aluno, "id_aluno"> = {
      data_nascimento: data.dataNascimento,
      observacao: data.observacao,
      usuario: {
        nome: data.nome,
        email: data.email,
        senha: data.password,
      },
    };

    createAluno(aluno);
  };

  useEffect(() => {
    if (aluno) {
      navigate("/alunos");
    }
  }, [aluno, navigate]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Criar Novo Aluno</h1>
        <Link
          to="/alunos"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Voltar
        </Link>
      </div>

      <FormAluno
        onSubmit={handleSubmit}
        submitLabel={createAlunoLoading ? "Salvando..." : "Criar Aluno"}
      />
    </div>
  );
}
