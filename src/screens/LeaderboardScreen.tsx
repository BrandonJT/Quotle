import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import StorageService, { User } from '../services/StorageService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    fontFamily: 'DMSans-Regular',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#7c3aed',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
  },
  tabTextActive: {
    color: '#7c3aed',
  },
  userCard: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    alignItems: 'center',
    gap: 12,
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'DMSans-Regular',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'DMSans-Regular',
    marginBottom: 2,
  },
  userBio: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
  },
  userStats: {
    alignItems: 'flex-end',
    gap: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
    fontFamily: 'DMSans-Regular',
  },
  statLabel: {
    fontSize: 10,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

interface LeaderboardScreenProps {
  navigation: any;
}

type LeaderboardTab = 'quotes' | 'likes' | 'followers';

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('likes');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const allUsers = await StorageService.getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    }
    setLoading(false);
  };

  const getSortedUsers = () => {
    const sorted = [...users];
    switch (activeTab) {
      case 'quotes':
        return sorted.sort((a, b) => b.quotes - a.quotes);
      case 'followers':
        return sorted.sort((a, b) => b.followers - a.followers);
      case 'likes':
      default:
        return sorted.sort((a, b) => b.likes - a.likes);
    }
  };

  const handleUserPress = (user: User) => {
    if (!user.isCurrentUser) {
      navigation.navigate('UserProfile', { userId: user.id, userName: user.name });
    }
  };

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
      </View>

      <View style={styles.tabContainer}>
        {(['likes', 'quotes', 'followers'] as LeaderboardTab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab === 'likes' ? '❤️ Likes' : tab === 'quotes' ? '📝 Quotes' : '👥 Followers'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loading]}>
        <ActivityIndicator size="large" color="#7c3aed" />
      </View>
    );
  }

  const sortedUsers = getSortedUsers();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sortedUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.userCard}
            onPress={() => handleUserPress(item)}
            disabled={item.isCurrentUser}
          >
            <View style={styles.rankBadge}>
              <Text style={styles.rankNumber}>#{index + 1}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              {item.bio && <Text style={styles.userBio}>{item.bio}</Text>}
            </View>
            <View style={styles.userStats}>
              <Text style={styles.statValue}>
                {activeTab === 'likes'
                  ? item.likes
                  : activeTab === 'quotes'
                  ? item.quotes
                  : item.followers}
              </Text>
              <Text style={styles.statLabel}>
                {activeTab === 'likes'
                  ? 'likes'
                  : activeTab === 'quotes'
                  ? 'quotes'
                  : 'followers'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={renderHeader}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

export default LeaderboardScreen;
