import { useState } from "react";
import { logout } from "../services/authenticationService";
import { useAuth } from "../contexts/AuthContext";

export function useLogout() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setUsuario } = useAuth();
    const handleLogout = async () => {
        try {
            setLoading(true);
            await logout();
            setUsuario(null);

        } catch (err) {
            setError("Erro ao fazer logout. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return { 
        handleLogout,
        loading,
        error
    };
};