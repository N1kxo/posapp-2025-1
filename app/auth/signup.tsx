import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { AuthContext } from "../../context/authContext/AuthContext"; 
import { useRouter } from "expo-router";
import { styles } from "../../assets/styles/styles";

export default function RegisterScreen() {
    const router = useRouter();
    const auth = useContext(AuthContext);

    if (!auth) {
        return <Text style={styles.errorText}>Error: AuthContext no está disponible</Text>;
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
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>

            <TextInput
                placeholder="Correo electrónico"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Contraseña"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />

            <TouchableOpacity 
                onPress={handleRegister} 
                style={styles.button} 
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Registrando..." : "Registrarse"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

