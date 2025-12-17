import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
  },
  logoSymbol: {
    marginRight: 8,
    color: '#667eea',
    fontSize: 28,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  searchClear: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchClearText: {
    fontSize: 18,
    color: '#999',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  adminSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  leaderboardTable: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#667eea',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableHeaderText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  colUsername: {
    flex: 1,
    minWidth: 150,
  },
  colDiscovers: {
    flex: 0.8,
    minWidth: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colLikes: {
    flex: 0.6,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  tableCell: {
    fontSize: 15,
    color: '#333',
  },
  cellCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function LeaderboardScreen() {
  const [searchTerm, setSearchTerm] = useState('');

  const leaderboardData = [
    { rank: 1, username: "Buzz", discovers: 1309, likes: 0 },
    { rank: 2, username: "Heather", discovers: 220, likes: 0 },
    { rank: 3, username: "Brandon", discovers: 220, likes: 0 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoSymbol}>◆</Text>
          <Text style={styles.logo}>quotle</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#999"
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity
              style={styles.searchClear}
              onPress={() => setSearchTerm('')}
            >
              <Text style={styles.searchClearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.adminSection}>
          <Text style={styles.sectionTitle}>Admin List</Text>
        </View>

        <View style={styles.leaderboardTable}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colUsername]}>
              Username
            </Text>
            <Text style={[styles.tableHeaderText, styles.colDiscovers]}>
              Discovers
            </Text>
            <Text style={[styles.tableHeaderText, styles.colLikes]}>
              Likes
            </Text>
          </View>

          {leaderboardData.map((entry, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.colUsername]}>
                {entry.username}
              </Text>
              <Text style={[styles.tableCell, styles.colDiscovers]}>
                {entry.discovers}
              </Text>
              <Text style={[styles.tableCell, styles.colLikes]}>
                {entry.likes}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
