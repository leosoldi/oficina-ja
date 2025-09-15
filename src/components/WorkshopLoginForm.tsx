import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SocialLoginButton } from "@/components/GoogleButton";
import { authService } from "@/services/authService";

interface WorkshopLoginFormData {
  email: string;
  password: string;
}

const WorkshopLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WorkshopLoginFormData>();
  const navigate = useNavigate();
  const { login } = useAuth();

  // ✅ Função de envio do formulário
const onSubmit = async (data: WorkshopLoginFormData) => {
  try {
    const response = await authService.login(data.email, data.password, "oficina");
    login(response.token);
    toast.success("Login realizado com sucesso!");
    navigate("/dashboard-oficina");
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Erro ao fazer login");
  }
};

  return (
    <Card className="border-0 bg-gradient-to-br from-blue-50/50 to-white shadow-lg backdrop-blur-sm">
      <div className="mb-6">
        <p className="text-center text-sm text-gray-500 mb-2">Entrar com</p>
        <SocialLoginButton userType="oficina" />
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">
            ou entre com seus dados
          </span>
        </div>
      </div>

      <CardContent className="pt-6 px-6 pb-6">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email da Oficina
            </Label>
            <div className="relative group">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="contato@oficina.com"
                  className={`pl-10 h-10 text-sm ${errors.email ? "border-red-500" : ""}`}
                  {...register("email", {
                    required: "Email é obrigatório",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email inválido",
                    },
                  })}
                />
              </div>
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Senha
            </Label>
            <div className="relative group">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  className={`pl-10 h-10 text-sm ${errors.password ? "border-red-500" : ""}`}
                  {...register("password", {
                    required: "Senha é obrigatória",
                    minLength: {
                      value: 6,
                      message: "Mínimo de 6 caracteres",
                    },
                  })}
                />
              </div>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-4 pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm"
            >
              {isSubmitting ? "Entrando..." : "Entrar como Oficina"}
            </Button>

            <div className="text-center border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">
                Não tem conta?{" "}
                <a
                  href="/cadastro"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Cadastre-se aqui
                </a>
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkshopLoginForm;
