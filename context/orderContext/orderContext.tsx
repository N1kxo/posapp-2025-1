import React, { createContext, useContext, useState, useEffect, useCallback, } from 'react';
import { getFirestore, collection, addDoc, query, where, onSnapshot, } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Pedido } from "../../interfaces/common";

const db = getFirestore();
const auth = getAuth();



type PedidoInput = Omit<Pedido, 'id'>;

// ✅ Tipo del contexto
type OrderContextType = {
  createOrder: (pedido: PedidoInput) => Promise<string | null>;
};

// ✅ Crear contexto
export const OrderContext = createContext<OrderContextType | undefined>(undefined);

// ✅ Provider del contexto
export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const createOrder = async (pedidoInput: PedidoInput): Promise<string | null> => {
    const user = auth.currentUser;

    if (!user) {
      console.error('No user logged in');
      return null;
    }

    try {
      const docRef = await addDoc(collection(db, 'pedidos'), {
        ...pedidoInput,

        readyForPayment: false,
        paymentMethod: "",
        userId: user.uid,
        createdAt: new Date(), // si no usás Timestamp de Firebase
      });
      console.log('Pedido guardado en Firestore con ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error al crear la orden:', error);
      return null;
    }
  };

  return (
    <OrderContext.Provider value={{ createOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// ✅ Hook para usar el contexto
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used inside OrderProvider');
  return context;
};

// ✅ Hook para leer pedidos desde Firestore
export const usePedidos = (
  filtroUsuario: boolean = true,
  estados?: string[]
): Pedido[] => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (filtroUsuario && !userId) return;

    const pedidosRef = collection(db, 'pedidos');
    let q;

    if (filtroUsuario) {
      q = query(pedidosRef, where('userId', '==', userId)); // Nota: el campo es 'user' no 'userId'
    } else if (estados && estados.length > 0) {
      q = query(pedidosRef, where('estado', 'in', estados));
    } else {
      q = query(pedidosRef);
    }

    const unsub = onSnapshot(q, (snapshot) => {
      const fetched: Pedido[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          estado: data.estado,
          createdAt: data.createdAt,
          mesa: data.mesa,
          userId: data.user, // Aquí es 'user' según tu estructura
          total: data.total ?? 0,
          paymentMethod: data.paymentMethod ?? 'efectivo',
          readyForPayment: data.readyForPayment ?? false, // Nuevo campo
          items: Array.isArray(data.items) // Cambiado de 'pedido' a 'items'
            ? data.items.map((item: any) => ({
              itemId: item.itemId,
              quantity: item.quantity,
            }))
            : [],
        };
      });

      const ordenados = fetched
        .filter((p) => p.createdAt)
        .sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());

      setPedidos(ordenados);
    });

    return () => unsub();
  }, [filtroUsuario, estados?.join(',')]);

  return pedidos;
};