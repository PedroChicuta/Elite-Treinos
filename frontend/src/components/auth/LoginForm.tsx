import { useState } from "react";
import { useLogin } from "../../hooks/UseLogin";
import type { LoginRequest } from "../../types/loginRequest";
import Loader from "../Loader";

export function LoginForm() {
  const { submitLogin, loginError, loginLoading } = useLogin();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form: LoginRequest = {
      email: email,
      senha: senha,
    };

    submitLogin(form);
  }

  if (loginLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <div>
        <h1 className="text-2xl">Bem-vindo!</h1>
        <p>Utilize suas credenciais para acessar sua conta!</p>
      </div>
      <label htmlFor="login-email" className="text-base font-medium">
        Email
      </label>

      <input
        id="login-email"
        type="text"
        placeholder="Email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        className="border border-gray-300 rounded px-4 py-2"
      />

      <label htmlFor="login-password" className="text-base font-medium">
        Senha
      </label>

      <input
        id="login-password"
        type="password"
        placeholder="Senha"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSenha(e.target.value)
        }
        className="border border-gray-300 rounded px-4 py-2"
      />

      {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

      <button
        type="submit"
        className="bg-yellow-400 text-white rounded px-4 py-2 cursor-pointer hover:bg-yellow-500 transition"
      >
        Login
      </button>
    </form>
  );
}
