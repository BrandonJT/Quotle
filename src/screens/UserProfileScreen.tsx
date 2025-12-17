import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import QuoteCard from '../components/QuoteCard';
import StorageService, { User, Quote } from '../services/StorageService';
import { FollowIcon } from '../components/Icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    fontFamily: 'DMSans-Regular',
    marginBottom: 4,
  },
  profileBio: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
    marginBottom: 12,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    fontFamily: 'DMSans-Regular',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
  },
  followButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#7c3aed',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'DMSans-Regular',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'DMSans-Regular',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
  },
});

interface UserProfileScreenProps {
  navigation: any;
  route: any;
}

const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ navigation, route }) => {
  const { userId, userName } = route.params;
  const [user, setUser] = useState<User | null>(null);
  const [userQuotes, setUserQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, [userId, userName]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      let userData: User | null = null;

      if (userId) {
        userData = await StorageService.getUser(userId);
      } else if (userName) {
        // Search user by name
        const allUsers = await StorageService.getAllUsers();
        userData = allUsers.find((u) => u.name === userName) || null;
      }

      if (userData) {
        setUser(userData);
        const quotes = await StorageService.getUserQuotes(userData.id);
        setUserQuotes(quotes);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
    setLoading(false);
  };

  const handleToggleFollow = () => {
    setIsFollowing(!isFollowing);
    // In a real app, this would update the database
  };

  const handleQuotePress = (quote: Quote) => {
    navigation.navigate('QuoteDetail', { quote });
  };

  const renderHeader = () => (
    <View style={styles.profileHeader}>
      {user && (
        <>
          <Text style={styles.profileName}>{user.name}</Text>
          {user.bio && <Text style={styles.profileBio}>{user.bio}</Text>}

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.quotes}</Text>
              <Text style={styles.statLabel}>Quotes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.likes}</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.followButton}
            onPress={handleToggleFollow}
          >
            <FollowIcon
              color="#fff"
              size={16}
              filled={isFollowing}
            />
            <Text style={styles.followButtonText}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loading]}>
        <ActivityIndicator size="large" color="#7c3aed" />
      </View>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>User not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userQuotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <QuoteCard
            quote={item.text}
            author={item.author}
            likeCount={item.likes}
            shareCount={item.shares}
            onPress={() => handleQuotePress(item)}
            onAuthorPress={() => {}}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {user.name} hasn't shared any quotes yet
            </Text>
          </View>
        }
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

export default UserProfileScreen;
