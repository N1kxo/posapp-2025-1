import React, { useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground } from "react-native";
import { MenuContext } from "../../context/menuContext/MenuContext";
import { useImage } from '@/context/imageContext/imageContext';
import { MenuItem } from "../../interfaces/common";
import { styles } from "@/assets/styles/styles";
import { router } from "expo-router";

export default function MenuScreen() {
  const menuContext = useContext(MenuContext);

  if (!menuContext) {
    return <Text>Error: MenuContext no está disponible</Text>;
  }

  const { menu, deleteMenuItem } = menuContext;

  const { getImageUrl} = useImage();

  const renderItem = ({ item }: { item: MenuItem }) => {
    const imageUrl = item.imageUrl ? getImageUrl(item.imageUrl) : null;

    return (
      <View style={styles.item}>
        {imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.photo2}
            resizeMode="cover"
          />
        )}

        <Text>{item.title} - ${item.price.toFixed(2)}</Text>
        <Text>{item.description}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(menu)/menuscreen",
                params: {
                  mode: "edit",
                  id: item.id,
                  title: item.title,
                  price: item.price.toString(),
                  description: item.description,
                  imageUrl: item.imageUrl || '',
                },
              })
            }
            style={styles.editButton}
          >
            <Text style={{ color: "white" }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteMenuItem(item.id);
            }}
            style={styles.deleteButton}
          >
            <Text style={{ color: "white" }}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú del Restaurante</Text>

      <TouchableOpacity onPress={() => router.push("/(menu)/menuscreen")} style={styles.addButton}>
        <Text style={{ color: "white" }}>Agregar</Text>
      </TouchableOpacity>

      <FlatList data={menu} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
}
