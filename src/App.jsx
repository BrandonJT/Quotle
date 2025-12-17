import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#667eea',
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
    opacity: 0.9,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>
      <Text style={styles.subtitle}>Welcome to your React Native app</Text>
      <StatusBar style="light" />
    </View>
  );
}
