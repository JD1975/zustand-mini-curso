import { create, type StateCreator } from "zustand";
// import { customSessionStorage } from "./Storages/storage.person";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "./Firebase/firebase.person";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface PersonActions {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;

  getFullName: () => string;
}

/* 
Definición del store
Separa la definición del estado y las acciones en una constante 'storeApi'
Esto mejora la legibilidad y el mantenimiento del código 
*/

const storeApi: StateCreator<
  PersonActions & PersonState,
  [["zustand/devtools", never]]
> = (set, get) => ({
  firstName: "",
  lastName: "",

  setFirstName: (value: string) =>
    set({ firstName: value }, false, "setFirstName"),
  setLastName: (value: string) =>
    set({ lastName: value }, false, "setLastName"),

  getFullName: () => {
    return `${get().firstName} ${get().lastName}`;
  }
});

/* 
Persistencia con localStorage
Se utiliza el middleware 'persist' de Zustand
La configuración incluye el nombre de la clave en el almacenamiento y es util para
guardar el estado de la persona entre recargas de página
*/

export const usePersonStore = create<PersonState & PersonActions>()(
  persist(devtools(storeApi), {
    name: "personStorage",
    storage: firebaseStorage,
  })
);
