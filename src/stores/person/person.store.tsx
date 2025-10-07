import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface PersonActions {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

/* 
Definición del store
Separa la definición del estado y las acciones en una constante 'storeApi'
Esto mejora la legibilidad y el mantenimiento del código 
*/

const storeApi: StateCreator<PersonActions & PersonState> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (value: string) => set((state) => ({ firstName: value })),
  setLastName: (value: string) => set((state) => ({ lastName: value })),
});

/* 
Persistencia con localStorage
Se utiliza el middleware 'persist' de Zustand
La configuración incluye el nombre de la clave en el almacenamiento y es util para
guardar el estado de la persona entre recargas de página
*/

export const usePersonStore = create<PersonState & PersonActions>()(
  persist(storeApi, { name: "personStorage" })
);
