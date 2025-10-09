import { StateCreator } from "zustand";

/**
 * Slice para manejar la fecha y hora de un evento (ej: boda)
 */
export interface DateSlice {
  // Estado: almacena la fecha completa del evento
  eventDate: Date;

  // Obtiene la fecha en formato YYYY-MM-DD (para inputs type="date")
  eventYYMMDD: () => string;

  // Obtiene la hora en formato HH:MM (para inputs type="time")
  eventHHMM: () => string;

  // Actualiza solo la FECHA (año, mes, día) sin modificar la hora
  setEventDate: (parcialDate: string) => void;

  // Actualiza solo la HORA (horas, minutos) sin modificar la fecha
  setEventTime: (eventTime: string) => void;
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
  // Estado inicial: fecha y hora actual
  eventDate: new Date(),

  /**
   * Retorna la fecha en formato YYYY-MM-DD
   * Ejemplo: "2025-10-08"
   * Útil para el atributo value de <input type="date" />
   */
  eventYYMMDD: () => {
    // toISOString() retorna "2025-10-08T14:30:00.000Z"
    // split("T")[0] obtiene solo "2025-10-08"
    return get().eventDate.toISOString().split("T")[0];
  },

  /**
   * Retorna la hora en formato HH:MM
   * Ejemplo: "14:30"
   * Útil para el atributo value de <input type="time" />
   */
  eventHHMM: () => {
    const hours = get().eventDate.getHours().toString().padStart(2, "0");
    const minutes = get().eventDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  },

  /**
   * Actualiza SOLO la fecha (año, mes, día) manteniendo la hora actual
   * @param parcialDate - Fecha en formato "YYYY-MM-DD" (ej: "2025-12-25")
   *
   * ¿Por qué tan complejo?
   * - No podemos hacer simplemente `new Date(parcialDate)` porque perdería la hora
   * - Extraemos año/mes/día de la nueva fecha
   * - Los aplicamos a la fecha actual sin tocar horas/minutos
   */
  setEventDate: (parcialDate: string) =>
    set((state) => {
      // 1. Parseamos la fecha que viene del input type="date"
      const date = new Date(parcialDate);

      // 2. Extraemos las partes de la fecha
      const year = date.getFullYear(); // Ej: 2025
      const month = date.getMonth(); // Ej: 11 (diciembre, base 0)
      const day = date.getDate(); // Ej: 25

      // 3. Clonamos la fecha actual para no mutarla directamente
      const newDate = new Date(state.eventDate);

      // 4. Actualizamos SOLO año, mes y día (la hora se mantiene igual)
      newDate.setFullYear(year, month, day);

      return {
        eventDate: newDate,
      };
    }),

  /**
   * Actualiza SOLO la hora (horas, minutos) manteniendo la fecha actual
   * @param eventTime - Hora en formato "HH:MM" (ej: "14:30")
   *
   * ¿Por qué separar setEventDate y setEventTime?
   * - Los inputs type="date" y type="time" son independientes en HTML
   * - Necesitamos actualizar cada uno sin afectar al otro
   */
  setEventTime: (eventTime: string) =>
    set((state) => {
      // 1. Parseamos el string "HH:MM" que viene del input type="time"
      const hours = parseInt(eventTime.split(":")[0]); // Ej: "14:30" → 14
      const minutes = parseInt(eventTime.split(":")[1]); // Ej: "14:30" → 30

      // 2. Clonamos la fecha actual para no mutarla
      const newDate = new Date(state.eventDate);

      // 3. Actualizamos SOLO horas y minutos (la fecha se mantiene igual)
      newDate.setHours(hours, minutes);

      return { eventDate: newDate };
    }),
});
