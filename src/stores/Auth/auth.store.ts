import { create, StateCreator } from "zustand";
import type { AuthStatus, User } from "../../interfaces/index";
import { AuthService } from "../../Services/auth.service";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
  status: AuthStatus; /// 'Pending', 'Authorized', 'UnAuthorized'
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;

  checkAuthStatus: () => Promise<void>;

  logoutUser: () => void;
}

// Helper type: persist puede guardar el user con anidamiento incorrecto
type PersistedUser = User | { user: User };

// Helper para obtener el fullName manejando ambas estructuras (correcta e incorrecta)
export const getUserFullName = (user: User | undefined): string => {
  if (!user) return "Invitado";

  // Estructura correcta: { fullName: "..." }
  if ("fullName" in user && user.fullName) {
    return user.fullName;
  }

  // Estructura incorrecta (de persist corrupto): { user: { fullName: "..." } }
  const persistedUser = user as unknown as PersistedUser;
  if (
    typeof persistedUser === "object" &&
    "user" in persistedUser &&
    persistedUser.user?.fullName
  ) {
    return persistedUser.user.fullName;
  }

  return "Invitado";
};

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "Pending", // 'Pending', 'Authorized', 'UnAuthorized'
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password);
      const { token, ...user } = response;

      set({ status: "Authorized", token, user: user as User });
    } catch (error) {
      set({ status: "UnAuthorized", token: undefined, user: undefined });
      throw "UnAthorized";
    }
  },

  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkAuthStatus();
      set({ status: "Authorized", token, user: user as User });
    } catch (error) {
      set({ status: "UnAuthorized", token: undefined, user: undefined });
      throw "UnAthorized";
    }
  },

  logoutUser: () => {
    set({ status: "UnAuthorized", token: undefined, user: undefined });
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: "auth-storage" }))
);

// Helper para limpiar localStorage corrupto (ejecutar una vez si tienes problemas)
export const resetAuthStorage = () => {
  localStorage.removeItem("auth-storage");
  console.log("🧹 Auth storage cleared. Please login again.");
};
