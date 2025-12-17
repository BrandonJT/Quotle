import React, { useState, useCallback, useEffect } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';
import QuoteCard from '../components/QuoteCard';
import StorageService, { User, Quote } from '../services/StorageService';

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
  profileHeader: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    fontFamily: 'DMSans-Regular',
    marginBottom: 4,
  },
  profileBio: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
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
    fontSize: 11,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  primaryButton: {
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'DMSans-Regular',
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#1f2937',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    fontFamily: 'DMSans-Regular',
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
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
});

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userQuotes, setUserQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const user = await StorageService.getCurrentUser();
      setCurrentUser(user);

      const quotes = await StorageService.getUserQuotes(user.id);
      setUserQuotes(quotes);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
    setLoading(false);
  };

  const handleQuotePress = (quote: Quote) => {
    navigation.navigate('QuoteDetail', { quote });
  };

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {currentUser && (
        <>
          <View style={styles.profileHeader}>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{currentUser.name}</Text>
              {currentUser.bio && <Text style={styles.profileBio}>{currentUser.bio}</Text>}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{currentUser.quotes}</Text>
                  <Text style={styles.statLabel}>Quotes</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{currentUser.likes}</Text>
                  <Text style={styles.statLabel}>Likes</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{currentUser.followers}</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{currentUser.following}</Text>
                  <Text style={styles.statLabel}>Following</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => navigation.navigate('Create')}
            >
              <Text style={[styles.buttonText, styles.primaryButtonText]}>+ Create</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>📤 Share</Text>
            </TouchableOpacity>
          </View>

          {userQuotes.length > 0 && (
            <Text style={styles.sectionTitle}>Your Quotes ({userQuotes.length})</Text>
          )}
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
          !loading ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                No quotes yet. Create one to get started!
              </Text>
            </View>
          ) : null
        }
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
