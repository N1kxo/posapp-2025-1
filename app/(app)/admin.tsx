import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { router } from 'expo-router';
import { styles } from '@/assets/styles/styles';
import { AuthContext } from '@/context/authContext/AuthContext'; // Ajusta el path si es necesario

export default function HomeScreen() {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth?.logout();
    router.push('../'); // Redirige al login u otra pantalla de inicio
  };

  return (
    <View style={styles.container}>
      <Text>Welcome 👋</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('../(admin)/(menu)')}>
        <Text style={styles.buttonText}>Go to Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('../(admin)/(roles)')}>
        <Text style={styles.buttonText}>Go to Roles</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#FF5C5C' }]} onPress={handleLogout}>
        <Text style={{ color: 'Redc' }}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
