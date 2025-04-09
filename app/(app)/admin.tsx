import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View >
      <Text>Welcome 👋</Text>

      <TouchableOpacity  onPress={() => router.push('../(admin)/(menu)')}>
        <Text>Go to Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={() => router.push('../(admin)/(roles)')}>
        <Text >Go to Roles</Text>
      </TouchableOpacity>
    </View>
  );
}