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
  
  export interface Pedido {
    createdAt: any;
    id: string;
    estado: string;
    pedido: Producto[];
    mesa: string;
    userId: string;
    total: number;
  }
  