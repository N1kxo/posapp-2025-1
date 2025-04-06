import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import CameraModal from '@/components/CameraModal';
import { styles } from '@/assets/styles/styles';

export default function Index() {
    const [image, setImage] = useState(undefined as string | undefined);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [isVisible, setIsVisible] = useState(false);

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
                    <TouchableOpacity onPress={() => setIsVisible(true)} style = {styles.imageContainer}>
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
                                            onPress={void}
                                            style={styles.button}
                                        >
                                            <Text style={styles.controlsText}>Submit</Text>
                                        </TouchableOpacity> 


        </View>
    );
}