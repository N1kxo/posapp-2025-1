import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { router } from 'expo-router';
import { styles } from '@/assets/styles/styles';
import { AuthContext } from '@/context/authContext/AuthContext';


export default function cashierMainScreen() {

    const auth = useContext(AuthContext);
  
    const handleLogout = async () => {
      await auth?.logout();
      router.push('../'); // Redirige al login u otra pantalla de inicio
    };

    
  return (
    <View style = {styles.container}>
      <Text>Welcome 👋</Text>

      <TouchableOpacity  style = {styles.button} onPress={() => router.push('../cashier') }>
        <Text style={styles.buttonText} >Go Active Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity  style = {styles.button} onPress={() => router.push('../history')}>
        <Text style={styles.buttonText} >Go History</Text>
      </TouchableOpacity>
      
            <TouchableOpacity style={[styles.button, { backgroundColor: '#FF5C5C' }]} onPress={handleLogout}>
              <Text style={{ color: 'white' }}>Cerrar sesión</Text>
            </TouchableOpacity>
    </View>
  );
}