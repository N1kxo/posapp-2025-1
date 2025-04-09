import { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { getFirestore, collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { Pedido } from "../../interfaces/common";
import { styles } from "@/assets/styles/styles";

export default function KitchenScreen() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const db = getFirestore();
    const pedidosRef = collection(db, "pedidos");
    const q = query(
      pedidosRef,
      where("estado", "in", ["Ordenado", "En preparación", "Listo para recoger", "Entregado", "Listo para pago"])
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Aseguramos que 'pedido' sea siempre un array
          pedido: Array.isArray(data.pedido)
            ? data.pedido
            : Object.values(data.pedido ?? {}),
        };
      }) as Pedido[];

      // Ordenar localmente por fecha (ascendente)
      const ordenados = fetched.sort((a, b) => a.date.toDate() - b.date.toDate());

      setPedidos(ordenados);
    });

    return () => unsubscribe();
  }, []);

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
      await updateDoc(pedidoDoc, { estado: nuevoEstado });
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Ordenado":
        return "#FFF9C4"; // Amarillo claro
      case "En preparación":
        return "#BBDEFB"; // Azul claro
      case "Listo para recoger":
        return "#C8E6C9"; // Verde claro
      case "Entregado":
        return "#E0E0E0"; // Gris claro
      case "Listo para pago":
        return "#F8BBD0"; // Rosa claro
      default:
        return "#FFFFFF"; // Blanco por defecto
    }
  };

  const renderPedido = ({ item }: { item: Pedido }) => {
    const isOrdenado = item.estado === "Ordenado";

    return (
      <View
        style={[
          styles.pedidoCard,
          { backgroundColor: getEstadoColor(item.estado) },
          isOrdenado && styles.pedidoCardResaltado,
        ]}
      >
        <Text style={styles.title}>🍽 Pedido - Estado: {item.estado}</Text>
        <Text style={styles.input}>Fecha: {item.date.toDate().toLocaleString()}</Text>
        <Text style={styles.input}>Cliente: {item.userID}</Text>

        {item.pedido.map((producto, idx) => (
          <Text key={idx} style={styles.input}>
            {producto.cantidad}x {producto.nombre}
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
      />
    </View>
  );
}
