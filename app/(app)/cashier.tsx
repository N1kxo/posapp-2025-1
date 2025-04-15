import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Modal, Switch, TextInput, Pressable } from 'react-native';
import { usePedidos } from '../../context/orderContext/orderContext';
import { styles } from '@/assets/styles/styles';
import { Pedido } from '../../interfaces/common';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { RadioButton } from 'react-native-paper'; // Import RadioButton from react-native-paper
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Cashier() {
  const pedidos = usePedidos(false, [
    'Ordenado',
    'En preparación',
    'Listo para recoger',
    'Entregado',
    'Listo para pago',
  ]);

  const [tiempos, setTiempos] = useState<Record<string, { min: number; seg: number }>>({});
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [filtroMesa, setFiltroMesa] = useState<string>(''); // Filtro por mesa
  const [filtroPago, setFiltroPago] = useState<boolean>(false); // Filtro por estado "Listo para pago"
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null); // Order ID for payment
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(''); // Payment method (Efectivo, Tarjeta, Transferencia)

  // ⏱ useEffect que actualiza los tiempos cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      const nuevosTiempos: Record<string, { min: number; seg: number }> = {};
      const now = new Date();

      pedidos.forEach((p) => {
        const createdAt = p.createdAt.toDate();
        const diff = now.getTime() - createdAt.getTime();
        const min = Math.floor(diff / 60000);
        const seg = Math.floor((diff % 60000) / 1000);
        nuevosTiempos[p.id] = { min, seg };
      });

      setTiempos(nuevosTiempos);
    }, 1000);

    return () => clearInterval(interval);
  }, [pedidos]);

  const pagar = async (id: string) => {
    const db = getFirestore();
    const pedidoDoc = doc(db, 'pedidos', id);
    await updateDoc(pedidoDoc, { estado: 'pagado', paymentMethod: selectedPaymentMethod });
    setConfirmPayment(false); // Close the modal after payment
  };

  // Función de filtrado de pedidos
  const filterPedidos = (pedidos: Pedido[]) => {
    return pedidos.filter((pedido) => {
      let isValid = true;

      // Filtro por mesa
      if (filtroMesa && pedido.mesa !== filtroMesa) {
        isValid = false;
      }

      // Filtro por estado "Listo para pago"
      if (filtroPago && pedido.estado !== 'Listo para pago') {
        isValid = false;
      }

      return isValid;
    });
  };

  // Filtrar los pedidos antes de pasarlos al FlatList
  const filteredPedidos = filterPedidos(pedidos);

  const renderPedido = ({ item }: { item: Pedido }) => {
    const isOrdenado = item.estado === 'Ordenado';
    const tiempo = tiempos[item.id] || { min: 0, seg: 0 };

    return (
      <View
        style={[
          styles.pedidoCard,
          isOrdenado && styles.pedidoCardResaltado,
        ]}
      >
        <Text style={styles.title}>🍽 Pedido - Estado: {item.estado}</Text>
        <Text style={styles.input}>
          ⏱ Hace {tiempo.min} min {tiempo.seg < 10 ? `0${tiempo.seg}` : tiempo.seg} seg
        </Text>
        <Text style={styles.input}>
          Fecha: {item.createdAt.toDate().toLocaleString()}
        </Text>
        <Text style={styles.input}>Mesa: {item.mesa}</Text>

        {item.items.map((producto: { quantity: number; itemId: string }, idx: React.Key | null | undefined) => (
          <Text key={idx} style={styles.input}>
            {producto.quantity}x {producto.itemId}
          </Text>
        ))}

        <Text style={styles.input}>
          💰 Total: ${item.total.toFixed(2)}
        </Text>

        {item.estado === 'Listo para pago' && (
          <Button
            title="✅ Marcar como pagado"
            onPress={() => {
              setSelectedOrderId(item.id);  // Set the order ID when the button is pressed
              setConfirmPayment(true);      // Show the modal
            }}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Pedidos</Text>

      {/* Filtro por mesa */}
      <TextInput
        style={styles.input}
        placeholder="Filtrar por mesa"
        value={filtroMesa}
        onChangeText={setFiltroMesa}
      />

      {/* Filtro por estado "Listo para pago" */}
      <View style={styles.filterBox}>
        <Text style={{ color: 'white' }}>Filtrar solo pedidos listos para pago</Text>
        <Switch
          value={filtroPago}
          onValueChange={setFiltroPago}
          trackColor={{ false: "#767577", true: "#81b0ff" }}  // Track color for both Android & iOS
          thumbColor={filtroPago ? "#e84ae3" : "#f4f3f4"}
        />
      </View>

      {/* Lista filtrada de pedidos */}
      <FlatList
        data={filteredPedidos}  // Usar los pedidos filtrados
        keyExtractor={(item) => item.id}
        renderItem={renderPedido}
      />

      <Modal
        visible={confirmPayment}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setConfirmPayment(false)}
      >
        <View style={styles.container}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>Seleccionar metodo de pago.</Text>

            {/* Radio Buttons for payment method */}
            <View style={styles.item}>
            <View style={styles.checkboxContainer}>
    <RadioButton
      value="efectivo"
      status={selectedPaymentMethod === 'efectivo' ? 'checked' : 'unchecked'}
      onPress={() => setSelectedPaymentMethod('efectivo')}
    />
    <FontAwesome6 name="money-bill" size={24} color="#000000" style={styles.icon} />
    <Text style={styles.paymentText}>Efectivo</Text>
  </View>

  <View style={styles.checkboxContainer}>
    <RadioButton
      value="tarjeta"
      status={selectedPaymentMethod === 'tarjeta' ? 'checked' : 'unchecked'}
      onPress={() => setSelectedPaymentMethod('tarjeta')}
    />
    <FontAwesome6 name="credit-card" size={24} color="#000000" style={styles.icon} />
    <Text style={styles.paymentText}>Tarjeta</Text>
  </View>

  <View style={styles.checkboxContainer}>
    <RadioButton
      value="transferencia"
      status={selectedPaymentMethod === 'transferencia' ? 'checked' : 'unchecked'}
      onPress={() => setSelectedPaymentMethod('transferencia')}
    />
    <Ionicons name="phone-portrait-outline" size={24} color="#000000" style={styles.icon} />
    <Text style={styles.paymentText}>Transferencia</Text>
  </View>
</View>



            {/* Confirm Payment Button */}
            <Pressable
              onPress={() => {
                if (selectedOrderId) {
                  pagar(selectedOrderId);  // Call the pagar method with the selected order ID
                }
              }}

              style={styles.button}
            >
              <Text style={{ color: "white" }}>Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
