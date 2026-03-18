import { Link, useNavigate } from "react-router-dom";
import {
  FormPersonal,
  type PersonalFormData,
} from "../../components/FormPersonal";
import { useCreatePersonal } from "../../hooks/Personais/useCreatePersonal";
import { useEffect } from "react";
import type { Personal } from "../../types/personal";

export function CriarPersonal() {
  const navigate = useNavigate();
  const { createPersonal, createPersonalLoading, personal } =
    useCreatePersonal();

  const handleSubmit = (data: PersonalFormData) => {
    const personalData: Omit<Personal, "id_personal"> = {
      telefone: data.telefone,
      cref: data.cref,
      usuario: {
        nome: data.nome,
        email: data.email,
        senha: data.password,
      },
    };

    createPersonal(personalData);
  };

  useEffect(() => {
    if (personal) {
      navigate("/personais");
    }
  }, [personal, navigate]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Criar Novo Personal
        </h1>
        <Link
          to="/personais"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Voltar
        </Link>
      </div>

      <FormPersonal
        onSubmit={handleSubmit}
        submitLabel={createPersonalLoading ? "Salvando..." : "Criar Personal"}
        isLoading={createPersonalLoading}
      />
    </div>
  );
}
