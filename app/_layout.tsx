import { AuthProvider } from "@/context/authContext/AuthContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
       <Stack>
        <Stack.Screen name="auth" options={{headerShown: false}} />
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(menu)" />
       </Stack>
  </AuthProvider>
  );
}
