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
    image?: string
}