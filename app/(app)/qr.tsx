import { styles } from '@/assets/styles/styles';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useState, useRef, useContext } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '@/context/authContext/AuthContext'; // Asegúrate de que la ruta sea correcta

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [qr, setQr] = useState("");
  const [scanned, setScanned] = useState(false);

  const auth = useContext(AuthContext);
  const { logout } = auth ?? {};

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

    const handleLogout = async () => {
      await auth?.logout();
      router.push('../'); // Redirige al login u otra pantalla de inicio
    };

  return (
    <View style={styles.containerAddMenu}>
      <View style={styles.cameraContainer}>
      <CameraView
        style={styles.imageContainer}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={handleQrScanned}
      />
        </View>

      {qr ? (
            <View style={styles.qrContainer}>
        <Text style={styles.qrText}>Your sitting in table: {qr}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setQr('');
              setScanned(false);
            }}
          >
            <Text style={styles.buttonText}>Scan Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push({
                pathname: '/menu',
                params: { qr },
              });
            }}
          >
            <Text style={styles.buttonText}>Go to Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogout}

          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
