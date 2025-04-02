import { View, Text } from 'react-native'
import React from 'react'
import { AuthProvider } from '@/context/authContext/AuthContext'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
      <AuthProvider>
          <Stack>
            <Stack.Screen name="splashscreen" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
          </Stack>
      </AuthProvider>
  )
}