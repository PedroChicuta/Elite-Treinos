import { useState } from "react";

export type AlunoFormData = {
  nome: string;
  email: string;
  password: string;
  dataNascimento: string;
  observacao: string;
};

type FormField = {
  id: keyof AlunoFormData;
  label: string;
  type: "text" | "email" | "password" | "date" | "textarea";
  placeholder?: string;
  required?: boolean;
};

const fields: FormField[] = [
  {
    id: "nome",
    label: "Nome",
    type: "text",
    placeholder: "Nome do aluno",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Email do aluno",
    required: true,
  },
  {
    id: "password",
    label: "Senha",
    type: "password",
    placeholder: "******************",
    required: true,
  },
  { id: "dataNascimento", label: "Data de Nascimento", type: "date" },
  {
    id: "observacao",
    label: "Observação",
    type: "textarea",
    placeholder: "Observações sobre o aluno",
  },
];

type FormAlunoProps = {
  initialData?: Partial<AlunoFormData>;
  onSubmit: (data: AlunoFormData) => void;
  submitLabel?: string;
  isLoading?: boolean;
};

export function FormAluno({
  initialData = {},
  onSubmit,
  submitLabel = "Salvar",
  isLoading = false,
}: FormAlunoProps) {
  const [formData, setFormData] = useState<AlunoFormData>({
    nome: initialData.nome ?? "",
    email: initialData.email ?? "",
    password: initialData.password ?? "",
    dataNascimento: initialData.dataNascimento ?? "",
    observacao: initialData.observacao ?? "",
  });

  const handleChange = (id: keyof AlunoFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputBase =
    "w-full py-2 px-3 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg " +
    "focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 " +
    "placeholder:text-gray-400 transition";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl shadow-md border border-yellow-500 bg-white overflow-hidden"
    >
      {/* Form header stripe — mirrors DataTable's thead */}
      <div className="bg-gray-100 px-6 py-3 border-b border-yellow-500">
        <span className="text-yellow-500 uppercase text-xs font-semibold tracking-wider">
          Dados do Aluno
        </span>
      </div>

      <div className="px-8 py-6 space-y-5">
        {fields.map((field) => (
          <div key={field.id} className="flex flex-col gap-1">
            <label
              htmlFor={field.id}
              className="text-xs font-semibold uppercase tracking-wide text-yellow-500"
            >
              {field.label}
              {field.required && <span className="ml-1 text-red-400">*</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                rows={3}
                placeholder={field.placeholder}
                value={formData[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className={`${inputBase} resize-none`}
              />
            ) : (
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                required={field.required}
                className={inputBase}
              />
            )}
          </div>
        ))}

        {/* Divider */}
        <div className="border-t border-gray-200 pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={
              "bg-yellow-500 hover:bg-yellow-600 active:scale-95 text-white text-sm font-bold " +
              "py-2 px-6 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 " +
              (isLoading ? "opacity-60 cursor-not-allowed" : "")
            }
          >
            {isLoading ? "Salvando..." : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
