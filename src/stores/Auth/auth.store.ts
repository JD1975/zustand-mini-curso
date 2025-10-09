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

const storeApi: StateCreator<AuthState> = (set, get) => ({
  status: "Pending", // 'Pending', 'Authorized', 'UnAuthorized'
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: "Authorized", token, user });
      console.log({ token, ...user });
    } catch (error) {
      set({ status: "UnAuthorized", token: undefined, user: undefined });
      throw "UnAthorized";
    }
  },

  checkAuthStatus: async () => {
    try {
      const token = get().token;
      if (!token) {
        // No hay token en el store: no es posible validar
        set({ status: "UnAuthorized", token: undefined, user: undefined });
        return;
      }

      const { token: newToken, ...user } = await AuthService.checkStatus(token);
      set({ status: "Authorized", token: newToken, user });
    } catch (error) {
      set({ status: "UnAuthorized", token: undefined, user: undefined });
    }
  },

  logoutUser: () => {
    set({ status: "UnAuthorized", token: undefined, user: undefined });
  },
  
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: "auth-storage" }))
);
