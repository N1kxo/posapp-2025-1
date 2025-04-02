import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function Menu() { // 🔹 Cambié 'menu' a 'Menu' para evitar conflictos con el nombre del archivo
  const router = useRouter();  // 🔹 Se debe llamar la función useRouter correctamente

  return (
    <View>
      <TouchableOpacity onPress={() => router.push('../(menu)')}>
        <Text style={{ fontSize: 20, color: 'blue' }}>Menú</Text>  
      </TouchableOpacity>
    </View>
  );
}
