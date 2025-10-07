import { createJSONStorage, StateStorage } from "zustand/middleware";

  const base = import.meta.env.VITE_FIREBASE_RTDB_URL;

const firebaseApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${base}/${name}.json`).then((res) =>
        res.json()
      );

      console.log("Data fetched from Firebase:", data);

      return JSON.stringify(data);
    } catch (error) {
      console.log("Error fetching data from Firebase", error);
      throw error;
    }
  },

  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${base}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());

    console.log("Data saved to Firebase:", data);
    return;
  },

  removeItem: function (name: string): Promise<void> | void {
    console.log("removeItem", name);
  },
};

export const firebaseStorage = createJSONStorage(() => firebaseApi);
