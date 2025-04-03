import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useContext } from "react";
import { MenuContext } from "../../context/menuContext/MenuContext";
import { MenuItem } from "../../interfaces/common"; // Asegúrate de importar la interfaz correcta
import { styles } from "@/assets/styles/styles";

export default function MenuScreen() {
  const menuContext = useContext(MenuContext);

  if (!menuContext) {
    return <Text>Error: MenuContext no está disponible</Text>;
  }

  const { menu, addMenuItem, updateMenuItem, deleteMenuItem } = menuContext;

  const [newItem, setNewItem] = useState<{ title: string; price: string; description: string }>({
    title: "",
    price: "",
    description: "",
  });

  const [editItem, setEditItem] = useState<{ id: string | null; title: string; price: number; description: string }>({
    id: null,
    title: "",
    price: 0, // Se cambió a 0 en lugar de "" para mantener el tipo correcto
    description: "",
  });

  // ✅ Agregar producto
  const handleAdd = async () => {
    if (newItem.title && newItem.price) {
      await addMenuItem({
        title: newItem.title,
        price: parseFloat(newItem.price),
        description: newItem.description,
      });
      setNewItem({ title: "", price: "", description: "" });
    }
  };

  // ✅ Editar producto
  const handleEdit = async () => {
    if (editItem.id && editItem.title && editItem.price) {
      await updateMenuItem(editItem.id, {
        title: editItem.title,
        price: editItem.price,
        description: editItem.description,
      });
      setEditItem({ id: null, title: "", price: 0, description: "" });
    }
  };

  // ✅ Renderizar cada producto
  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.item}>
      <Text>{item.title} - ${item.price.toFixed(2)}</Text>
      <Text>{item.description}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() =>
            setEditItem({ id: item.id, title: item.title, price: item.price, description: item.description })
          }
          style={styles.editButton}
        >
          <Text style={{ color: "white" }}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteMenuItem(item.id)} style={styles.deleteButton}>
          <Text style={{ color: "white" }}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú del Restaurante</Text>

      {/* Inputs para agregar producto */}
      <TextInput
        placeholder="Nombre del producto"
        value={newItem.title}
        onChangeText={(text) => setNewItem((prev) => ({ ...prev, title: text }))}
        style={styles.input}
      />
      <TextInput
        placeholder="Precio"
        value={newItem.price}
        onChangeText={(text) => setNewItem((prev) => ({ ...prev, price: text }))}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        value={newItem.description}
        onChangeText={(text) => setNewItem((prev) => ({ ...prev, description: text }))}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
        <Text style={{ color: "white" }}>Agregar</Text>
      </TouchableOpacity>

      {/* Inputs para editar producto */}
      {editItem.id && (
        <>
          <TextInput
            placeholder="Nuevo nombre"
            value={editItem.title}
            onChangeText={(text) => setEditItem((prev) => ({ ...prev, title: text }))}
            style={styles.input}
          />
          <TextInput
            placeholder="Nuevo precio"
            value={editItem.price.toString()} // Convertir a string para evitar errores en el input
            onChangeText={(text) => setEditItem((prev) => ({ ...prev, price: parseFloat(text) || 0 }))}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Nueva descripción"
            value={editItem.description}
            onChangeText={(text) => setEditItem((prev) => ({ ...prev, description: text }))}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleEdit} style={styles.updateButton}>
            <Text style={{ color: "white" }}>Actualizar</Text>
          </TouchableOpacity>
        </>
      )}

      <FlatList data={menu} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
}
