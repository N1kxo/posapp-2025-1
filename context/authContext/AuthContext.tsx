import { User } from "@firebase/auth";
import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/utils/FirebaseConfig";

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => void;
    register: (email: string, password: string) => Promise<User | null>;
    updateUser: (user: User) => void;
    updateRole: (role: "client" | "chef" | "cashier") => void;
    logout: () => void;
}

export const AuthContext  = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    // Verificar si el usuario está autenticado en el inicio de la aplicación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Limpiar el efecto al desmontar
    }, []);


    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("✅ Usuario autenticado:", userCredential.user);
            setUser(userCredential.user);
            return userCredential.user;
        } catch (error) {
            console.error("🔥 Error al autenticar usuario:", error);
            return null;
        }
    }

    const register = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("✅ Usuario registrado:", userCredential.user);
            setUser(userCredential.user);
            return userCredential.user;
        } catch (error) {
            console.error("🔥 Error al registrar usuario:", error);
            return null;
        }

    }

    const updateUser = (user: User) => {
        
    }

    const updateRole = (role: "client" | "chef" | "cashier") => {
    }

    const logout = async () => {
        try {
            await signOut(auth);
            console.log("✅ Usuario desconectado");
            setUser(null);
        } catch (error) {
            console.error("🔥 Error al cerrar sesión:", error);
        }
    }


    return (
        <AuthContext.Provider 
        value={{
            user,
            login,
            register,
            updateUser,
            updateRole,
            logout

        }}>
        {children}
        </AuthContext.Provider>
    );
    }
