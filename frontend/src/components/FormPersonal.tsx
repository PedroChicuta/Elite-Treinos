import { useState } from "react";

export type PersonalFormData = {
  nome: string;
  email: string;
  password: string;
  telefone: string;
  cref: string;
};

type FormField = {
  id: keyof PersonalFormData;
  label: string;
  type: "text" | "email" | "password";
  placeholder?: string;
  required?: boolean;
};

const fields: FormField[] = [
  {
    id: "nome",
    label: "Nome",
    type: "text",
    placeholder: "Nome do personal",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Email do personal",
    required: true,
  },
  {
    id: "password",
    label: "Senha",
    type: "password",
    placeholder: "******************",
    required: true,
  },
  {
    id: "telefone",
    label: "Telefone",
    type: "text",
    placeholder: "(00) 00000-0000",
    required: true,
  },
  {
    id: "cref",
    label: "CREF",
    type: "text",
    placeholder: "Ex.: 123456-G/SP",
  },
];

type FormPersonalProps = {
  initialData?: Partial<PersonalFormData>;
  onSubmit: (data: PersonalFormData) => void;
  submitLabel?: string;
  isLoading?: boolean;
};

export function FormPersonal({
  initialData = {},
  onSubmit,
  submitLabel = "Salvar",
  isLoading = false,
}: FormPersonalProps) {
  const [formData, setFormData] = useState<PersonalFormData>({
    nome: initialData.nome ?? "",
    email: initialData.email ?? "",
    password: initialData.password ?? "",
    telefone: initialData.telefone ?? "",
    cref: initialData.cref ?? "",
  });

  const handleChange = (id: keyof PersonalFormData, value: string) => {
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
      <div className="bg-gray-100 px-6 py-3 border-b border-yellow-500">
        <span className="text-yellow-500 uppercase text-xs font-semibold tracking-wider">
          Dados do Personal
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

            <input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id]}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required={field.required}
              className={inputBase}
            />
          </div>
        ))}

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