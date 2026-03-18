import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { Home } from "../pages/Home";
import { Login } from "../pages/Auth/Login";
import { PrivateLayout } from "../layouts/PrivateLayout";
import { PublicLayout } from "../layouts/PublicLayout";
import { ListarAlunos } from "../pages/Alunos/ListarAlunos";
import { CriarAluno } from "../pages/Alunos/CriarAluno";
import { EditarAluno } from "../pages/Alunos/EditarAluno";
import { ListarPersonais } from "../pages/Personais/ListarPersonais";
import { CriarPersonal } from "../pages/Personais/CriarPersonal";
import { EditarPersonal } from "../pages/Personais/EditarPersonal";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<PublicLayout />}>
          <Route path="login" element={<Login />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route index element={<Home />} />

          <Route path="alunos" element={<ListarAlunos />} />
          <Route path="alunos/criar" element={<CriarAluno />} />
          <Route path="alunos/editar/:id" element={<EditarAluno />} />

          <Route path="personais" element={<ListarPersonais />} />
          <Route path="personais/criar" element={<CriarPersonal />} />
          <Route path="personais/editar/:id" element={<EditarPersonal />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
