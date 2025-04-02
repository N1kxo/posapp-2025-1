import { View, Text, Image, Button } from "react-native";
import { useMenu } from "../context/menuContext/MenuContext";
import React from "react";
import { MenuItem } from "../interfaces/common";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../utils/FirebaseConfig"; // 🔹 Asegúrate de importar Firestore

interface MenuItemProps {
  item: MenuItem;
}

export default function MenuItem({ item }: MenuItemProps) {
  const { deleteMenuItem } = useMenu();

  const handleDelete = async () => {
    if (!item.id) {
      alert("Error: No se encontró el ID del documento");
      return;
    }

    try {
      const docRef = doc(db, "menu", item.id);
      await deleteDoc(docRef); // 🔹 Eliminamos en Firestore
      deleteMenuItem(item.id); // 🔹 Eliminamos del estado global
      alert("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error eliminando producto: ", error);
      alert("Error al eliminar el producto");
    }
  };

  return (
    <View>
      {item.image && <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />}
      <Text>{item.title}</Text>
      <Text>{item.price} $</Text>
      <Text>{item.description}</Text>
      <Button title="Eliminar" onPress={handleDelete} />
    </View>
  );
}
