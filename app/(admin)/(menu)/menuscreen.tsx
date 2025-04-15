  import 'react-native-url-polyfill/auto' // ✅ First!
  import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
  import React, { useContext, useState } from 'react'
  import { TextInput } from 'react-native'
  import Entypo from '@expo/vector-icons/Entypo'
  import CameraModal from '@/components/CameraModal'
  import { styles } from '@/assets/styles/styles'
  import { MenuContext } from "../../../context/menuContext/MenuContext"
  import { useImage } from '@/context/imageContext/imageContext';
  import { MenuItem } from "../../../interfaces/common"
  import { router, useLocalSearchParams } from 'expo-router'
  import { supabase } from "../../../utils/SupabaseConfig"
  import * as FileSystem from 'expo-file-system'
  import { Buffer } from 'buffer';
  global.Buffer = Buffer;

  // ✅ Función para manejar strings de forma segura
  const getStringParam = (param: string | string[] | undefined): string => {
    if (!param) return '';
    return Array.isArray(param) ? param[0] : param;
  };

  export default function Index() {
    const params = useLocalSearchParams();

    const id = getStringParam(params.id);
    const isEditMode = getStringParam(params.mode) === "edit";

    const [title, setTitle] = useState(getStringParam(params.title));
    const [price, setPrice] = useState(getStringParam(params.price));
    const [description, setDescription] = useState(getStringParam(params.description));
    const [image, setImage] = useState(getStringParam(params.imageUrl));
    console.log("🖼️ Imagen inicial:", image);

    const [isVisible, setIsVisible] = useState(false);

    const menuContext = useContext(MenuContext);
    const { uploadImage, getImageUrl } = useImage();

    if (!menuContext) {
      return <Text>Error: MenuContext no está disponible</Text>;
    }

    const { addMenuItem, updateMenuItem } = menuContext;

    const handleSubmit = async () => {
      try {
        let imagePath: string | null = null;



        if (image) {
          imagePath = await uploadImage(image);
        }

        const imageUrl = imagePath ? getImageUrl(imagePath) : '';

        if (title && price) {
          const menuItem = {
            title,
            price: parseFloat(price),
            description,
            imageUrl: imageUrl || '', // 👈 esto es lo que la interfaz espera
          };

          if (isEditMode && id) {
            await updateMenuItem(id, menuItem);
          } else {
            await addMenuItem(menuItem);
          }

          // Limpiar campos
          setTitle('');
          setPrice('');
          setDescription('');
          setImage("");

          router.push("/(menu)");
        }
      } catch (error) {
        console.error("🚨 Error:", error);
      }
    };

    return (
      <View style={styles.containerAddMenu2}>
        {image ? (
          <View style={styles.imageContainer2}>
            <ImageBackground
              source={{ uri: image }}
              style={styles.photo}
              resizeMode="cover"
            >
              <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.cameraButton}>
                <Entypo name="camera" size={30} color="black" />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        ) : (
          <View>
            <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.imageContainer2}>
              <Entypo name="camera" size={30} color="black" />
            </TouchableOpacity>
          </View>
        )}

        {/* Title */}
        <TextInput
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
        />

        {/* Price */}
        <TextInput
          placeholder="Enter price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.priceInput}
        />

        {/* Description */}
        <TextInput
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          style={styles.descriptionInput}
        />

        <CameraModal
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          onCapture={(uri) => {
            setImage(uri);
            setIsVisible(false);
          }}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.button}
        >
          <Text style={styles.controlsText}>
            {isEditMode ? "Actualizar" : "Crear"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
