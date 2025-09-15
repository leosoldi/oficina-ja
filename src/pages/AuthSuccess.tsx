import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const AuthSuccess = () => {
  const { login } = useAuth(); // <-- fora de qualquer função ou useEffect
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");
    const type = params.get("type");

    console.log("Recebido do Google:", { token, type });

    if (token && type) {
      login(token);

      setTimeout(() => {
        navigate(type === "motorista" ? "/dashboard-motorista" : "/dashboard-oficina");
      }, 500);
    }
  }, [search]);

  return (
    <div className="min-h-screen flex items-center justify-center text-center text-gray-700">
      Redirecionando...
    </div>
  );
};

export default AuthSuccess;
