import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/FirebaseConfig";
import { MenuItem } from "../../interfaces/common";

interface MenuContextType {
  menu: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, "id">) => Promise<void>;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => { 
    const unsubscribe = onSnapshot(collection(db, "menu"), (snapshot) => {
      const menuData = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as MenuItem[];

      setMenu(menuData);
    });

    return () => unsubscribe();
  }, []);

  const addMenuItem = async (item: Omit<MenuItem, "id">) => {
    try {
      const docRef = await addDoc(collection(db, "menu"), item);
      setMenu((prev) => [...prev, { id: docRef.id, ...item }]);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  const updateMenuItem = async (id: string, item: Partial<MenuItem>) => {
    try {
      const itemRef = doc(db, "menu", id);
      await updateDoc(itemRef, item);
      setMenu((prev) => prev.map((m) => (m.id === id ? { ...m, ...item } : m)));
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, "menu", id));
      setMenu((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
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
