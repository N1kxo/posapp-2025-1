import { AuthProvider } from "@/context/authContext/AuthContext";
import {OrderProvider} from "@/context/orderContext/orderContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <OrderProvider> 
       <Stack>
        <Stack.Screen name="auth" options={{headerShown: false}} />
        <Stack.Screen name="(app)"options={{headerShown: false}} />
        <Stack.Screen name="(menu)" options={{headerShown: false}}/>
        <Stack.Screen name="(admin)"options={{headerShown: false}} />

       </Stack>
      </OrderProvider>
  </AuthProvider>
  );
}
