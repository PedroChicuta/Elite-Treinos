import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FormPersonal,
  type PersonalFormData,
} from "../../components/FormPersonal";
import { useGetPersonalById } from "../../hooks/Personais/useGetPersonalById";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { useUpdatePersonal } from "../../hooks/Personais/useUpdatePersonal";
import type { Personal } from "../../types/personal";

export function EditarPersonal() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    personal: personalData,
    personalLoading,
    personalError,
    getPersonal,
  } = useGetPersonalById();
  const { updatePersonal, updatePersonalLoading, personal } =
    useUpdatePersonal();

  const [initialData, setInitialData] = useState<
    PersonalFormData | undefined
  >();

  useEffect(() => {
    if (id) {
      getPersonal(id);
    }
  }, [id]);

  useEffect(() => {
    if (personalData) {
      setInitialData({
        nome: personalData.usuario.nome,
        email: personalData.usuario.email,
        telefone: personalData.telefone,
        cref: personalData.cref ?? "",
        password: "",
      });
    }
  }, [personalData]);

  const handleSubmit = (data: PersonalFormData) => {
    if (id) {
      const personalData: Partial<Omit<Personal, "id_personal">> = {
        telefone: data.telefone,
        cref: data.cref,
        usuario: {
          nome: data.nome,
          email: data.email,
          senha: data.password,
        },
      };

      updatePersonal(id, personalData);
    }
  };

  useEffect(() => {
    if (personal) {
      navigate("/personais");
    }
  }, [personal, navigate]);

  if (personalLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (personalError) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Editar Personal</h1>
          <Link
            to="/personais"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Voltar
          </Link>
        </div>
        <p>{personalError}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Editar Personal</h1>
        <Link
          to="/personais"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Voltar
        </Link>
      </div>

      {initialData && (
        <FormPersonal
          onSubmit={handleSubmit}
          initialData={initialData}
          submitLabel={
            updatePersonalLoading ? "Salvando..." : "Atualizar Personal"
          }
          isLoading={updatePersonalLoading}
        />
      )}
    </div>
  );
}
