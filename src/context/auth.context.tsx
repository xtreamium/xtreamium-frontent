import { User } from "@/models";
import React from "react";
import { TOKEN_KEY } from "@/constants/storage";
import apiService from "@/services/api.service";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";

type AuthContextProps = {
  user?: User;
  token: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getUser: () => Promise<User | undefined>;
};

const AuthContext = React.createContext<AuthContextProps>({
  token: "",
  login: async () => {},
  logout: () => {},
  getUser: async () => undefined,
});

type AuthProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [token, setToken] = React.useState(localStorage.getItem(TOKEN_KEY) || "");
  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login(email, password);
      if (response.status === StatusCodes.OK) {
        setUser(response.data.user);
        setToken(response.data.access_token);
        localStorage.setItem(TOKEN_KEY, response.data.access_token);
        navigate("/dashboard");
        return;
      }
      throw new Error(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const logout = () => {
    setUser(undefined);
    setToken("");
    localStorage.removeItem(TOKEN_KEY);
    navigate("/");
  };
  const getUser = async (): Promise<User | undefined> => {
    try {
      if (token) {
        const user = await apiService.getUser(token);
        setUser(user);
        return user;
      }
    } catch (error) {
      console.error("auth.context", "login", error);
    }
    return undefined;
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return React.useContext(AuthContext);
};
