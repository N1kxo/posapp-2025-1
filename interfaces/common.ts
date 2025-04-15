export interface User{
    name: string, 
    email: string, 
    password: string,
    role: "client" | "chef" | "cashier" | "admin",
}

export interface MenuItem{
    id: string,
    title: string,
    price: number,
    description: string,
    imageUrl?: string;
}

export interface Producto {
    cantidad: number;
    nombre: string;
  }
  
// En tu archivo de interfaces (common.ts)
export interface Pedido {
  id: string;
  estado: string;
  createdAt: any;
  mesa: string;
  userId: string;  // O 'user' si prefieres mantenerlo como en Firebase
  total: number;
  paymentMethod: string;
  readyForPayment?: boolean;
  items: Array<{  // Cambiar de 'pedido' a 'items'
    itemId: string;
    quantity: number;
  }>;
}
  