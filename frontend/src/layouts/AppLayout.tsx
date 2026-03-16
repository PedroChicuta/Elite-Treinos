import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";

export function AppLayout() {

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col font-sans text-gray-800">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
