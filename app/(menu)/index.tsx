import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import CameraModal from '@/components/CameraModal';

export default function index() {

    const [image, setImage] = useState(undefined as any);
    const [isVisible, setIsVisible] = useState(false);

    return (

        <View
            style={{flex: 1, padding: 20,justifyContent: "center", alignContent: "center", alignItems: "center"}}
        >
            {/* Select Image */}
            {
                image ? <View>
                    {/* Pintar la imagen */}
                </View>
                    :
                    <TouchableOpacity 
                        onPress={() => setIsVisible(true)}
                    >
                        <Entypo name="camera" size={32} color="black" />
                    </TouchableOpacity>
            }

            <View>

            </View>

            {/* Title */}
            <TextInput />
            {/* Price */}
            <TextInput />
            {/* description */}
            <TextInput />

            {/* Edit */}
            {/* Delete */}
            {/* Guardar */}
            <CameraModal
                isVisible={isVisible}
                image={image} 
                onClose={() => setIsVisible(false)}            />
        </View>
    )
}