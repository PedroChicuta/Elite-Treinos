import { useAuth } from "../contexts/AuthContext";

export function Home() {
  const { usuario } = useAuth();

  return (
    <div>
      <h2>Bem-vindo ao Elite Treinos, {usuario?.nome}!</h2>
      <p>Seu aplicativo de gerenciamento de treinos e exercícios.</p>
    </div>
  );
}
