import { AuthProvider } from "@/context/authContext/AuthContext";
import {OrderProvider} from "@/context/orderContext/orderContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <OrderProvider> 
       <Stack>
        <Stack.Screen name="auth" options={{headerShown: false}} />
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(menu)" />
        <Stack.Screen name="(admin)" />

       </Stack>
      </OrderProvider>
  </AuthProvider>
  );
}
