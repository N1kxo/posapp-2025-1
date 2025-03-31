import { User } from "firebase/auth";
import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "@/utils/FirebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { router } from "expo-router";

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) =>  Promise<boolean>;
    register: (email: string, password: string,  role?: "client" | "chef" | "cashier") => Promise<User | null>;
    updateUser: (user: User) => void;
    updateRole: (role: "client" | "chef" | "cashier", user: User) => Promise<boolean>;
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


    const login = async (email: string, password: string): Promise<boolean> => { 
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("✅ Usuario autenticado:", userCredential.user);
            setUser(userCredential.user);

            const userRef = doc(db, "users", userCredential.user.uid);
            const userSnapshot = await getDoc(userRef);

            
            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                const role = userData.role; // Get the role from Firestore
    
                if (role === "client") {
                    router.push("/(app)/menu");
                } else if (role === "cashier") {
                    router.push("/(app)/cashier");
                } else if (role === "chef") {
                    router.push("/(app)/kitchen"); // Example route for a chef
                }
            } else {
                console.warn("⚠️ User document not found in Firestore.");
            }
    

            return true; 
        } catch (error) {
            console.error("🔥 Error al autenticar usuario:", error);
            return false;
        }
    };

    const register = async (
        email: string,
        password: string,
        role: "client" | "chef" | "cashier" = "client"
    ) => { 
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;
            console.log("✅ Usuario registrado:", firebaseUser);
            
            setUser(firebaseUser);
    
            // Ensure Firestore document has the correct structure
            await setDoc(doc(db, "users", firebaseUser.uid), {
                id: firebaseUser.uid,          
                email,
                role,
                createdAt: new Date()
            });
    
            return firebaseUser;
        } catch (error) {
            console.error("🔥 Error al registrar usuario:", error);
            return null;
        }
    };


    const updateUser = (user: User) => {






    }

    const updateRole = async (role: "client" | "chef" | "cashier", user: User): Promise<boolean> => {

        if (!user) {
            console.error(" No user found, cannot update role.");
            return false;
        }

        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { role });
    
            console.log(` Role updated to ${role} for user ${user.uid}`);
            return true;
        } catch (error) {
            console.error(" Error updating user role:", error);
            return false;
        }
            
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
        <AuthContext.Provider value={{ user, login, register, updateUser, updateRole, logout }}>
            {children}
        </AuthContext.Provider>
    );
    }   
