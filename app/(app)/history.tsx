import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { usePedidos } from '../../context/orderContext/orderContext';
import { format } from 'date-fns'

export default function History() {
  const pedidosPagados = usePedidos(false, ['pagado']);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Pagos</Text>

      {pedidosPagados.length === 0 ? (
        <Text style={styles.empty}>No hay pedidos pagados aún.</Text>
      ) : (
        <FlatList
          data={pedidosPagados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.text}>Mesa: {item.mesa}</Text>
              <Text style={styles.text}>Total: ${item.total}</Text>
              <Text style={styles.text}>Método: {item.paymentMethod}</Text>
              <Text style={styles.text}>
                Fecha: {format(item.createdAt.toDate(), 'dd/MM/yyyy HH:mm')}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15
  },
  card: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10
  },
  text: {
    fontSize: 16
  },
  empty: {
    fontSize: 16,
    fontStyle: 'italic'
  }
});
