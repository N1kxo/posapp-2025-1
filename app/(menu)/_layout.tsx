import { View, Text } from 'react-native'
import React from 'react'
import { AuthProvider } from '@/context/authContext/AuthContext'
import { Stack } from 'expo-router'
import { MenuProvider } from '@/context/menuContext/MenuContext'

export default function _layout() {
  return (

      <AuthProvider>
           <MenuProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="menuscreen" options={{ headerShown: false }} />
          </Stack>
          </MenuProvider>
      </AuthProvider>
  )
}