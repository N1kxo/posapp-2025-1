// context/OrderContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFirestore, collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

// ✅ Tipos necesarios
export type OrderItem = {
  itemId: string;
  quantity: number;
};

export type MenuItem = {
  title: string;
  price: number;
};

export type Pedido = {
  id: string;
  estado: string;
  createdAt: any;
  mesa: string;
  userId: string;
  total: number;
  pedido: {
    nombre: string;
    cantidad: number;
  }[];
};

export type Order = {
  items: OrderItem[];
  estado: string;
  readyForPayment: boolean;
  mesa: string;
  createdAt: Date;
  user: string;
  total: number;
};

// ✅ Tipo del contexto
type OrderContextType = {
  createOrder: (items: OrderItem[], total: number) => Promise<string | null>;
  quantities: { [key: string]: number };
  setQuantities: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  menu: MenuItem[];
  setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  total: number;
  pedidos: Pedido[];
};

// ✅ Crear contexto
export const OrderContext = createContext<OrderContextType | undefined>(undefined);

// ✅ Provider del contexto
export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [total, setTotal] = useState(0);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  // 🔢 Calcular total cada vez que cambien quantities o menu
  useEffect(() => {
    const newTotal = Object.entries(quantities).reduce((acc, [itemTitle, qty]) => {
      const item = menu.find((m) => m.title === itemTitle);
      return item ? acc + item.price * qty : acc;
    }, 0);
    setTotal(newTotal);
  }, [quantities, menu]);

  // 🔄 Escuchar pedidos en tiempo real
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const q = query(collection(db, "pedidos"), where("user", "==", uid));

    const unsub = onSnapshot(q, (snapshot) => {
      const fetched: Pedido[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          estado: data.estado,
          createdAt: data.createdAt,
          mesa: data.mesa,
          userId: data.user,
          total: data.total,
          pedido: Array.isArray(data.items)
            ? data.items.map((item: any) => ({
                nombre: item.itemId,
                cantidad: item.quantity,
              }))
            : [],
        };
      });

      const ordenados = fetched.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
      setPedidos(ordenados);
    });

    return () => unsub();
  }, []);

  // 🛒 Crear pedido
  const createOrder = async (items: OrderItem[], total: number): Promise<string | null> => {
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
      user: user.uid,
      total,
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
    <OrderContext.Provider value={{
      createOrder,
      quantities,
      setQuantities,
      menu,
      setMenu,
      total,
      pedidos
    }}>
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
