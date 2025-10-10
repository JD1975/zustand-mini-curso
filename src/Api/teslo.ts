import axios from "axios";
import { useAuthStore } from "../stores";

const tesloApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

// TODO: Interceptors

// * Interceptor para agregar el token a cada request
// El interceptor se ejecuta antes de cada petición
// Obtenemos el token del store (sin usar hook, usamos getState)
// Si hay token, lo agregamos a los headers de la petición
// Retornamos la configuración actualizada

tesloApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export { tesloApi };
