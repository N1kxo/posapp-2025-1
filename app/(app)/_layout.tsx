import { View, Text } from 'react-native';
import React from 'react';
import { AuthProvider } from '@/context/authContext/AuthContext';
import { MenuProvider } from '@/context/menuContext/MenuContext';
import { ImageProvider } from '@/context/imageContext/imageContext';
import { Stack } from 'expo-router';

export default function _layout() {
  return (
    <AuthProvider>
      <MenuProvider>
        <ImageProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="admin" options={{ headerShown: false }} />
          <Stack.Screen name="cashier" options={{ headerShown: true }} />
          <Stack.Screen name="kitchen" options={{ headerShown: false}} />
          <Stack.Screen name="menu" options={{ headerShown: false}} />
          <Stack.Screen name="qr" options={{ headerShown: false}} />
          <Stack.Screen name="cashierMainScreen" options={{ headerShown: false}} />
          <Stack.Screen name="history" options={{ headerShown: true}} />



        </Stack>
        </ImageProvider>
      </MenuProvider>
    </AuthProvider>
  );
}
