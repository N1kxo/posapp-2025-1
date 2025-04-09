import { AuthContext } from "../../../context/authContext/AuthContext"; 
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function RoleSelectionForm() {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<'client' | 'chef' | 'cashier'>('client');
    const [loading, setLoading] = useState(false);

    const auth = useContext(AuthContext);
    
    const handleUpdate = async () => {
        if (!email) {
            Alert.alert("Error", "Por favor ingresa un correo electrónico");
            return;
        }

        if (!auth?.user) {
            Alert.alert("Error", "No hay un usuario autenticado.");
            return;
        }

        setLoading(true);

        const success = await auth.updateRole(role, email);
        setLoading(false);

        if (success) {
            Alert.alert("Éxito", `El rol de ${auth.user.email} ha sido actualizado a ${role}`);
        } else {
            Alert.alert("Error", "No se pudo actualizar el rol.");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Registro de Usuario</Text>
            
            <Text>Correo electrónico:</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 }}
                placeholder="Ingrese su correo"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            
            <Text>Selecciona un rol:</Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                {["client", "chef", "cashier"].map((item) => (
                    <Button key={item} title={item} onPress={() => setRole(item as 'client' | 'chef' | 'cashier')} />
                ))}
            </View>
            
            <Button title={loading ? "Actualizando..." : "Registrar"} onPress={handleUpdate} disabled={loading} />
        </View>
    );
}
