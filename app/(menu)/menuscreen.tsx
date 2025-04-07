import 'react-native-url-polyfill/auto' // ✅ First!
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useContext, useState } from 'react'
import { TextInput } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import CameraModal from '@/components/CameraModal'
import { styles } from '@/assets/styles/styles'
import { MenuContext } from "../../context/menuContext/MenuContext"
import { useImage } from '@/context/imageContext/imageContext';
import { MenuItem } from "../../interfaces/common"
import { router } from 'expo-router'
import { supabase } from "../../utils/SupabaseConfig"
import * as FileSystem from 'expo-file-system'
import { Buffer } from 'buffer';
global.Buffer = Buffer;

export default function Index() {
  const [image, setImage] = useState(undefined as string | undefined);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const menuContext = useContext(MenuContext);
  const { uploadImage, getImageUrl } = useImage();


  if (!menuContext) {
    return <Text>Error: MenuContext no está disponible</Text>;
  }

  const { menu, addMenuItem } = menuContext;
  console.log('🔍 Supabase instance:', supabase);



  const handleAdd = async () => {
    console.log("✅ handleAdd llamado");
  
    try {
      let imagePath: string | null = null;
  
      // Upload image if selected
      if (image) {
        imagePath = await uploadImage(image);
      }
  
      const imageUrl = imagePath ? getImageUrl(imagePath) : '';
  
      if (title && price) {
        await addMenuItem({
          title,
          price: parseFloat(price),
          description,
          imageUrl,
        });
  
        // Reset form
        setTitle('');
        setPrice('');
        setDescription('');
        setImage(undefined);
  
        router.push("/(menu)");
      }
    } catch (error) {
      console.error("🚨 Error uploading or saving:", error);
    }

    router.push("./(menu)")
  };
  




  return (

    <View style={styles.containerAddMenu}>
      {image ? (
        <View style={styles.imageContainer}>
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
          <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.imageContainer}>
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

      {/* Only one CameraModal here */}
      <CameraModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onCapture={(uri) => {
          setImage(uri); // <- Aquí guardas la imagen
          setIsVisible(false);
        }}
      />

      <TouchableOpacity
        onPress={handleAdd}
        style={styles.button}
      >
        <Text style={styles.controlsText}>Submit</Text>
      </TouchableOpacity>


    </View>
  );
}