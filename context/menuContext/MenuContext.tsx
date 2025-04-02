import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../../utils/FirebaseConfig";
import { MenuItem } from "../../interfaces/common"; // 🔹 Importar la interfaz

interface MenuContextType {
  menu: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, "id">) => Promise<void>;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const querySnapshot = await getDocs(collection(db, "menu"));
      const menuData = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id, // 🔹 Aseguramos que Firestore asigne el id al objeto
        ...docSnap.data(),
      })) as MenuItem[];

      setMenu(menuData);
    };

    fetchMenu();
  }, []);

  const addMenuItem = async (item: Omit<MenuItem, "id">) => {
    const docRef = await addDoc(collection(db, "menu"), item);
    setMenu((prev) => [...prev, { id: docRef.id, ...item }]);
  };

  const updateMenuItem = async (id: string, item: Partial<MenuItem>) => {
    const itemRef = doc(db, "menu", id);
    await updateDoc(itemRef, item);
    setMenu((prev) => prev.map((m) => (m.id === id ? { ...m, ...item } : m)));
  };

  const deleteMenuItem = async (id: string) => {
    await deleteDoc(doc(db, "menu", id));
    setMenu((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menu, addMenuItem, updateMenuItem, deleteMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu debe estar dentro de un MenuProvider");
  }
  return context;
};
