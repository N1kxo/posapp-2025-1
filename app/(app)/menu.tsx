import React, { useState, useContext, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Button, Modal, Pressable, ScrollView } from "react-native";
import { MenuContext } from "../../context/menuContext/MenuContext";
import { useImage } from '@/context/imageContext/imageContext';
import { OrderContext, useOrder } from "@/context/orderContext/orderContext";
import { MenuItem, Pedido } from "../../interfaces/common";
import { styles } from "@/assets/styles/styles";
import { router } from "expo-router";
import { collection, query, where, onSnapshot, doc, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useLocalSearchParams } from 'expo-router';
import { usePedidos } from '../../context/orderContext/orderContext';




const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser;



export type PedidoInput = Omit<Pedido, "id">;

export default function MenuScreen() {
  const menuContext = useContext(MenuContext);
  const [quantities, setQuantities] = useState<{ [item: string]: number }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderState, setOrderState] = useState<string | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [total, setTotal] = useState(0);

  const  {qr}  = useLocalSearchParams();
  const qrString = Array.isArray(qr) ? qr[0] : qr;




  const { createOrder } = useOrder();
  const { getImageUrl } = useImage();

  if (!menuContext) {
    return <Text>Error: MenuContext no está disponible</Text>;
  }

  const { menu } = menuContext;

  useEffect(() => {
    const newTotal = Object.entries(quantities).reduce((acc, [itemTitle, qty]) => {
      const item = menu.find((m) => m.title === itemTitle);
      return item ? acc + item.price * qty : acc;
    }, 0);
    setTotal(newTotal);
  }, [quantities, menu]);

  const userPedidos = usePedidos(true);

  useEffect(() => {
    setPedidos(userPedidos);
  }, [userPedidos]);




  const changeQuantity = (item: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[item] || 0;
      const updated = Math.max(0, current + delta); // Evita valores negativos
      return { ...prev, [item]: updated };
    });
  };

  const renderItem = ({ item }: { item: MenuItem }) => {
    const imageUrl = item.imageUrl ? getImageUrl(item.imageUrl) : null;
  
    return (
      <View style={styles.item}>
        {imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.photo2} resizeMode="cover" />}
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
  
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => changeQuantity(item.title, -1)}>
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantities[item.title] || 0}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => changeQuantity(item.title, 1)}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  const addItem = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.log("Usuario no autenticado");
      return;
    }

    // Crear array de items asegurando que quantity > 0
    const itemsArray = Object.entries(quantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([title, quantity]) => ({
        itemId: title, // Usamos title como itemId para consistencia
        quantity,
      }));

    if (itemsArray.length === 0) {
      console.log("No hay items para ordenar");
      return;
    }

    const pedidoInput = {
      userId: user.uid,
      paymentMethod: "",
      estado: "Ordenado",
      total: total,
      createdAt: new Date(),
      mesa: qrString || "Sin mesa",
      items: itemsArray, // Usamos el mismo nombre en toda la app
    };

    const id = await createOrder(pedidoInput);
    if (id) {
      setOrderId(id);
      setQuantities({});
    }
  };



  // 🔁 Escuchar el estado de la orden si hay un orderId
  useEffect(() => {
    if (!orderId) return;

    const unsub = onSnapshot(doc(db, "pedidos", orderId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setOrderState(data.estado);
      }
    });

    return () => unsub();
  }, [orderId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú del Restaurante</Text>



      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Ver pedido</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '90%', maxHeight: '80%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Resumen del Pedido</Text>

            <ScrollView style={{ maxHeight: 300 }}>
              {/* Pedido actual que aún no ha sido enviado */}
              {Object.entries(quantities).some(([_, qty]) => qty > 0) && (
                <>

                  <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>📝 Orden actual (no enviada) -- Total a pagar: ${total.toFixed(2)}:</Text>
                  {Object.entries(quantities).map(([itemId, qty]) => {
                    if (qty > 0) {
                      const item = menu.find((m) => m.id === itemId);
                      return (
                        <Text key={itemId}>
                          {item?.title || itemId}: {qty}
                        </Text>
                      );
                    }
                    return null;
                  })}
                  <View style={{ marginVertical: 10, borderBottomWidth: 1, borderColor: '#ccc' }} />

                  
                  <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
                    
                  </Text>

                </>
              )}

              {/* Órdenes anteriores del usuario */}
              {pedidos.length > 0 ? (
                pedidos.map((pedido, index) => (
                  <View key={pedido.id} style={{ marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>🧾 Pedido #{index + 1} Total a pagar: ${pedido.total?.toFixed(2) ?? '0.00'} </Text>
                    <Text>Mesa: {pedido.mesa}</Text>
                    <Text>Estado: {pedido.estado}</Text>
                    {pedido.items.map((p, i) => (
                      <Text key={i}>
                        {p.itemId}: {p.quantity}
                      </Text>
                    ))}

                  </View>
                ))
              ) : (
                <Text style={{ fontStyle: 'italic' }}>No hay pedidos previos.</Text>
              )}
            </ScrollView>

            {/* Botones */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={{ backgroundColor: '#aaa', padding: 10, borderRadius: 5, flex: 1, marginRight: 10 }}
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>Salir</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  addItem();
                  setModalVisible(false);
                }}
                style={{ backgroundColor: '#861388', padding: 10, borderRadius: 5, flex: 1 }}
              >
                <Text style={{ color: 'white', textAlign: 'center'}}>Ordenar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}
