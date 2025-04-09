import { styles } from '@/assets/styles/styles';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useState, useRef } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';


export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [qr, setQr] = useState("");
  const [scanned, setScanned] = useState(false);

  const handleQrScanned = ({ data }: { data: string }) => {
    if (!scanned) {
      setQr(data);
      setScanned(true); 
      console.log("QR Scanned:", data);

    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.containerAddMenu}>
      <CameraView
        style={styles.imageContainer}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={handleQrScanned}
      />

      {qr ? (
        <View style={{ position: 'absolute', bottom: 100 }}>
          <Text style={{ fontSize: 18, color: 'white' }}>Your sitting in table : {qr}</Text>
          <Button title="Scan Again" onPress={() => {
            setQr('');
            setScanned(false);
          }} />
          <Button
            title="Go to Menu"
            onPress={() => {
              router.push({
                pathname: '/menu',
                params: { qr },
              });
            }}
          />
        </View>
      ) : null}


    </View>
  );
}
