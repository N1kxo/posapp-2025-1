import { View, Text } from 'react-native'
import React from 'react'
import { AuthProvider } from '@/context/authContext/AuthContext'
import { Stack } from 'expo-router'
import { MenuProvider } from '@/context/menuContext/MenuContext'
import { ImageProvider } from '@/context/imageContext/imageContext';

export default function _layout() {
  return (

    <AuthProvider>
      <ImageProvider>
        <MenuProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="menuscreen" options={{ headerShown: false }} />
          </Stack>
        </MenuProvider>
      </ImageProvider>
    </AuthProvider>
  )
}