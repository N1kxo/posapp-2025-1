import { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TouchableOpacity } from "react-native";
import { getFirestore, collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { Pedido } from "../../interfaces/common";
import { styles } from "@/assets/styles/styles";
import { usePedidos } from '../../context/orderContext/orderContext';
import { useContext } from 'react';
import { AuthContext } from '@/context/authContext/AuthContext';
import { router } from "expo-router";

export default function KitchenScreen() {
  const pedidos = usePedidos(false, [
    "Ordenado",
    "En preparación",
    "Listo para recoger",
    "Entregado",
    "Listo para pago",
  ]);

  const auth = useContext(AuthContext);
const { logout } = auth ?? {};

const handleLogout = async () => {
  await logout?.();
  router.push('../');
};

  const [tiempos, setTiempos] = useState<Record<string, { min: number; seg: number }>>({});
  
  useEffect(() => {
    const interval = setInterval(() => {
      const nuevosTiempos: Record<string, { min: number; seg: number }> = {};
      const now = new Date();

      pedidos.forEach((p) => {
        if (p.createdAt && p.createdAt.toDate) { // Verificación adicional
          const createdAt = p.createdAt.toDate();
          const diff = now.getTime() - createdAt.getTime();
          const min = Math.floor(diff / 60000);
          const seg = Math.floor((diff % 60000) / 1000);
          nuevosTiempos[p.id] = { min, seg };
        }
      });

      setTiempos(nuevosTiempos);
    }, 1000);

    return () => clearInterval(interval);
  }, [pedidos]);

  const avanzarEstado = async (id: string) => {
    const estados = [
      "Ordenado",
      "En preparación",
      "Listo para recoger",
      "Entregado",
      "Listo para pago",
    ];

    const pedido = pedidos.find((p) => p.id === id);
    if (!pedido) return;

    const idx = estados.indexOf(pedido.estado);
    
    if (idx < estados.length - 1) {
      const nuevoEstado = estados[idx + 1];
      const db = getFirestore();
      const pedidoDoc = doc(db, "pedidos", id);

      if (nuevoEstado === "Listo para pago") {
        await updateDoc(pedidoDoc, { estado: nuevoEstado, readyForPayment: true });
      } else {
        await updateDoc(pedidoDoc, { estado: nuevoEstado });
      }
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Ordenado":
        return "#FFF9C4";
      case "En preparación":
        return "#BBDEFB";
      case "Listo para recoger":
        return "#C8E6C9";
      case "Entregado":
        return "#E0E0E0";
      case "Listo para pago":
        return "#F8BBD0";
      default:
        return "#FFFFFF";
    }
  };

  const renderPedido = ({ item }: { item: Pedido }) => {
    const isOrdenado = item.estado === "Ordenado";
    const tiempo = tiempos[item.id] || { min: 0, seg: 0 };
    const productos = item.items || []; // Maneja ambos casos

    return (
      <View
        style={[
          styles.pedidoCard,
          { backgroundColor: getEstadoColor(item.estado) },
          isOrdenado && styles.pedidoCardResaltado,
        ]}
      >
        <Text style={styles.title}>🍽 Pedido - Estado: {item.estado}</Text>
        <Text style={styles.input}>
          ⏱ Hace {tiempo.min} min {tiempo.seg < 10 ? `0${tiempo.seg}` : tiempo.seg} seg
        </Text>
        {item.createdAt && item.createdAt.toDate && (
          <Text style={styles.input}>
            Fecha: {item.createdAt.toDate().toLocaleString()}
          </Text>
        )}
        <Text style={styles.input}>Mesa: {item.mesa}</Text>

        {productos.map((producto, idx) => (
          <Text key={`${item.id}-${idx}`} style={styles.input}>
            {producto.quantity}x {producto.itemId}
          </Text>
        ))}

        <Button title="Avanzar estado ➡️" onPress={() => avanzarEstado(item.id)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Pedidos en cocina</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={renderPedido}
        ListEmptyComponent={<Text>No hay pedidos pendientes</Text>}
      />
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleLogout}
      
                >
                  <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
    </View>
  );
}