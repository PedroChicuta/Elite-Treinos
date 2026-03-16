import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { Home } from "../pages/Home";
import { Login } from "../pages/Auth/Login";
import { PrivateLayout } from "../layouts/PrivateLayout";
import { PublicLayout } from "../layouts/PublicLayout";
import { ListarAlunos } from "../pages/Alunos/ListarAlunos";

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
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
