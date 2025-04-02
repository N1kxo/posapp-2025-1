import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function MenuDetails() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Detalles del Producto</Text>
      <TextInput 
        placeholder="Nombre del producto" 
        value={title} 
        onChangeText={setTitle} 
      />

      {/* Botón para guardar */}
      <TouchableOpacity onPress={() => alert("Guardado")}>
        <Text style={{ color: "green", marginTop: 10 }}>Guardar</Text>
      </TouchableOpacity>

      {/* Botón para volver */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: "red", marginTop: 10 }}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
