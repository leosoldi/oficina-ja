import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  type: "motorista" | "oficina";
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      console.log(decoded)
      const user: User = {
        id: decoded.id,
        name: decoded.name || decoded.nome || "",
        email: decoded.email || "",
        type: decoded.type,
      };
      setUser(user);
    } catch (e) {
      console.error("Erro ao decodificar token:", e);
      logout();
    }
  }
}, []);


const login = (token: string) => {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
   const user = {
      id: decoded.id,
      name: decoded.nome || decoded.name || "",
      email: decoded.email || "",
      type: decoded.type,
    };


    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  } catch (err) {
    console.error("Erro ao decodificar token:", err);
  }
};



  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("🧩 useAuth context", context);   
  return context;
};
