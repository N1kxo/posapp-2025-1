// context/OrderContext.tsx
import React, { createContext, useContext } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

// ✅ Tipos necesarios
export type OrderItem = {
  itemId: string;
  quantity: number;
};

export type Order = {
  items: OrderItem[];
  estado: string; // ejemplo: "ordenado"
  readyForPayment: boolean;
  mesa: string;
  createdAt: Date;
  user: string;
};

// ✅ Tipo del contexto
type OrderContextType = {
  createOrder: (items: OrderItem[]) => Promise<string | null>;
};

// ✅ Crear contexto
export const OrderContext = createContext<OrderContextType | undefined>(undefined);

// ✅ Provider del contexto
export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const createOrder = async (items: OrderItem[]): Promise<string | null> => {
    const user = auth.currentUser;

    if (!user) {
      console.error('No user logged in');
      return null;
    }

    const order: Order = {
      items,
      estado: 'Ordenado',
      readyForPayment: false,
      mesa: "mesa X",
      createdAt: new Date(),
      user: auth.currentUser?.uid,

    };

    try {
      const docRef = await addDoc(collection(db, 'pedidos'), order);
      console.log('Pedido guardado en Firestore con ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error al crear la orden:", error);
      return null;
    }
  };

  return (
    <OrderContext.Provider value={{ createOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// ✅ Hook para usarlo fácilmente
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used inside OrderProvider');
  return context;
};
