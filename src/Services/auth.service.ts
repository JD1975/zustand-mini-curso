import { AxiosError } from "axios";
import { tesloApi } from "../Api/teslo";

export interface LoginResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

export class AuthService {

  // * Metodo para hacer login
  // Ahora retorna toda la información del usuario junto con el token
  // Esto permite actualizar el estado de AuthState en el store
  // con toda la información necesaria tras el login
  
  static login = async (email: string, password: string):Promise<LoginResponse> => {
    try {
      const {data} = await tesloApi.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }
      throw new Error("Error al iniciar sesión");
    }
  };

  // * Metodo para validar token/Status
  static checkAuthStatus = async (): Promise<LoginResponse> => {
      try {
          const {data} = await tesloApi.get<LoginResponse>("auth/check-status");
  
          return data;
      } catch (error) {
          throw new Error('Unauthorized');
      }
    }
  


  }
