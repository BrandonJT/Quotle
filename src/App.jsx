import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  navBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  navBtnActive: {
    color: '#667eea',
  },
  navBtnInactive: {
    color: '#999',
  },
  navIcon: {
    fontSize: 24,
  },
});

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const navIcons = {
    home: '🏠',
    profile: '👤',
    leaderboard: '🏆',
    settings: '⚙️',
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.content}>
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
        {activeTab === 'leaderboard' && <LeaderboardScreen />}
      </View>
      
      <View style={styles.bottomNav}>
        {['home', 'profile', 'leaderboard', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.navBtn}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={{ fontSize: 24 }}>{navIcons[tab]}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </GestureHandlerRootView>
  );
}
