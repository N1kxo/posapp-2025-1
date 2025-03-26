import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "../../context/authContext/AuthContext"; // Ajusta la ruta según tu estructura de carpetas
import { useRouter } from "expo-router";

export default function RegisterScreen() {
    const router = useRouter();
    const auth = useContext(AuthContext);

    if (!auth) {
        return <Text>Error: AuthContext no está disponible</Text>;
    }

    const { register } = auth;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Por favor completa todos los campos.");
            return;
        }

        setLoading(true);
        const user = await register(email, password);
        setLoading(false);

        if (user) {
            Alert.alert("Éxito", "Usuario registrado con éxito");
        } else {
            Alert.alert("Error", "No se pudo registrar el usuario");
        }
    };

    return (
        <View style={{flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#343541"}}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "white" }}>Registro</Text>

            <TextInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                style={{ borderBottomWidth: 1, marginBottom: 20, padding: 10, color: "white" }}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                style={{ borderBottomWidth: 1, marginBottom: 20, padding: 10, color: "white" }}
                secureTextEntry
            />

            <TouchableOpacity
                onPress={handleRegister}
                style={{
                    backgroundColor: "#10A37F",
                    padding: 15,
                    borderRadius: 5,
                    alignItems: "center"
                }}
                disabled={loading}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                    {loading ? "Registrando..." : "Registrarse"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
