import { View, Text } from 'react-native';
import React from 'react';
import { AuthProvider } from '@/context/authContext/AuthContext';
import { MenuProvider } from '@/context/menuContext/MenuContext';
import { Stack } from 'expo-router';

export default function _layout() {
  return (
    <AuthProvider>
      <MenuProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="admin" options={{ headerShown: false }} />
          <Stack.Screen name="cashier" options={{ headerShown: false }} />
          <Stack.Screen name="kitchen" options={{ headerShown: false}} />
          <Stack.Screen name="menu" options={{ headerShown: false}} />
        </Stack>
      </MenuProvider>
    </AuthProvider>
  );
}
