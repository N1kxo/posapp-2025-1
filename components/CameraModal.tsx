import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { styles } from "../assets/styles/styles";

interface CameraModalProps {
    isVisible: boolean;
    image?: (uri: string) => void;
    onClose: () => void;
}

export default function CameraModal(props: CameraModalProps) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    useEffect(() => {
        requestPermission();
    }, []);

    const flip = async () => {
        setFacing(facing === 'back' ? 'front' : 'back');
    };

    const take = async () => {
        let result = await cameraRef.current?.takePictureAsync({
            quality: 1,
            base64: true,
        });

        if (result) {
            setCapturedImage(result.uri);
            props.image?.(result.uri);
        }
    };

    const open = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setCapturedImage(result.assets[0].uri);
            props.image?.(result.assets[0].uri);
        }
    };

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View>
                <Text>We need your permission to show the camera</Text>
            </View>
        );
    }

    return (
        <Modal visible={props.isVisible} animationType="slide">
            <View style={styles.container}>
                {capturedImage ? (
                    <Image source={{ uri: capturedImage }} style={styles.previewImage} />
                ) : (
                    <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                        {/* Controles en la parte superior */}
                        <View style={styles.controls}>
                            <TouchableOpacity onPress={take} style={styles.buttonMenu}>
                                <Text style={styles.controlsText}>📷 Tomar Foto</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={open} style={styles.buttonMenu}>
                                <Text style={styles.controlsText}>📂 Galería</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={flip} style={styles.buttonMenu}>
                                <Text style={styles.controlsText}>🔄 Voltear</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={props.onClose} style={styles.buttonMenu}>
                                <Text style={styles.controlsText}>❌ Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </CameraView>
                )}
            </View>
        </Modal>
    );
}
