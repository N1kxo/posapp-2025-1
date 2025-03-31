    import { User } from "firebase/auth";
    import { createContext, useState, useEffect } from 'react';
    import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
    import { auth, db } from "@/utils/FirebaseConfig";
    import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
    import { router } from "expo-router";

    type Role = "client" | "chef" | "cashier" | "admin";

    interface AuthContextProps {
        user: User | null;
        login: (email: string, password: string) =>  Promise<boolean>;
        register: (email: string, password: string, role?: Role) => Promise<User | null>;

        updateUser: (user: User) => void;
        updateRole: (role: "client" | "chef" | "cashier" |"admin", email: string) => Promise<boolean>;
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
                    } else if (role === "admin"){
                        router.push("/(app)/admin");

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

        const register = async (email: string, password: string, role: Role = "client") => { 
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
                router.push("/(app)/menu");
        
                return firebaseUser;
            } catch (error) {
                console.error("🔥 Error al registrar usuario:", error);
                return null;
            }
        };


        const updateUser = (user: User) => {






        }

        const getUserIdByEmail = async (email: string): Promise<string | null> => {
            try {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("email", "==", email));
                const querySnapshot = await getDocs(q);
        
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0]; // Tomar el primer resultado
                    return userDoc.id; // ID del documento (que debería ser el UID del usuario)
                } else {
                    console.warn("❌ No user found with email:", email);
                    return null;
                }
            } catch (error) {
                console.error("🔥 Error fetching user ID:", error);
                return null;
            }
        };

        const updateRole = async (role: Role, email: string): Promise<boolean> => { 

            try {
                const userUID = await getUserIdByEmail(email); // 🔹 Usa await aquí
        
                if (!userUID) {
                    console.error(" No user found, cannot update role.");
                    return false;
                }
        
                const userRef = doc(db, "users", userUID);
                await updateDoc(userRef, { role });
        
                console.log(`✅ Role updated to ${role} for user ${userUID}`);
                return true;
            } catch (error) {
                console.error("🔥 Error updating user role:", error);
                return false;
            }
        };

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
