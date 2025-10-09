import { StateCreator } from "zustand";
import type { AuthStatus, User } from "../../interfaces/index";

export interface AuthState {
  status: AuthStatus; /// 'Pending', 'Authorized', 'UnAuthorized'
  token: undefined;
  user?: User;
}

export const storeApi: StateCreator<AuthState> = (set) => ({
  status: "UnAuthorized", // 'Pending', 'Authorized', 'UnAuthorized'
  token: undefined,
  user: undefined,
});
