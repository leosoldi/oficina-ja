import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const BACKEND_URL = "http://localhost:3334";

export const SocialLoginButton = ({ userType }: { userType: "motorista" | "oficina" }) => {
  const handleGoogleLogin = () => {
    // Redireciona para o backend, passando o tipo como query param
    window.location.href = `https://oficinaja.com.br/api/session/auth/google?type=${userType}`;
    //window.location.href = `http://localhost:3336/api/session/auth/google?type=${userType}`;
  };

  return (
    <Button
      variant="outline"
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2"
    >
      <FcGoogle size={20} />
      Entrar com Google
    </Button>
  );
};
