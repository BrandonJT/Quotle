import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import QuoteCard from '../components/QuoteCard';
import StorageService, { Quote, User } from '../services/StorageService';
import QuoteAPIService from '../services/QuoteAPIService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    fontFamily: 'DMSans-Regular',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
    fontFamily: 'DMSans-Regular',
  },
  discoverButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    alignItems: 'center',
  },
  discoverButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'DMSans-Regular',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
  },
});

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [topQuotes, setTopQuotes] = useState<Quote[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [discoverQuotes, setDiscoverQuotes] = useState<Quote[]>([]);

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

      const quotes = await StorageService.getTopQuotes(5);
      setTopQuotes(quotes);

      // Load discover quotes from API
      if (discoverQuotes.length === 0) {
        const apiQuotes = await QuoteAPIService.getRandomQuotes(5);
        const convertedQuotes = apiQuotes.map((q, index) => ({
          id: q.id,
          text: q.text,
          author: q.author,
          source: 'goodreads' as const,
          createdAt: Date.now(),
          likes: Math.floor(Math.random() * 500),
          shares: Math.floor(Math.random() * 200),
        }));
        setDiscoverQuotes(convertedQuotes);
      }
    } catch (error) {
      console.error('Error loading home data:', error);
    }
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleQuotePress = (quote: Quote) => {
    navigation.navigate('QuoteDetail', { quote });
  };

  const handleAuthorPress = (author: string) => {
    navigation.navigate('UserProfile', { userName: author });
  };

  const handleDiscoverMore = async () => {
    const apiQuotes = await QuoteAPIService.getRandomQuotes(5);
    const convertedQuotes = apiQuotes.map((q, index) => ({
      id: `${q.id}_${index}`,
      text: q.text,
      author: q.author,
      source: 'goodreads' as const,
      createdAt: Date.now(),
      likes: Math.floor(Math.random() * 500),
      shares: Math.floor(Math.random() * 200),
    }));
    setDiscoverQuotes([...discoverQuotes, ...convertedQuotes]);
  };

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Quotes</Text>
        <Text style={styles.headerSubtitle}>
          {currentUser?.name} • {topQuotes.length} saved quotes
        </Text>
      </View>

      {topQuotes.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Your Top Quotes</Text>
          {topQuotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote.text}
              author={quote.author}
              likeCount={quote.likes}
              shareCount={quote.shares}
              isTopQuote={true}
              onPress={() => handleQuotePress(quote)}
              onAuthorPress={() => handleAuthorPress(quote.author)}
            />
          ))}
        </>
      )}

      <Text style={styles.sectionTitle}>Discover Quotes</Text>
      <TouchableOpacity 
        style={styles.discoverButton}
        onPress={handleDiscoverMore}
      >
        <Text style={styles.discoverButtonText}>Load More Quotes</Text>
      </TouchableOpacity>
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
        data={discoverQuotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <QuoteCard
            quote={item.text}
            author={item.author}
            likeCount={item.likes}
            shareCount={item.shares}
            onPress={() => handleQuotePress(item)}
            onAuthorPress={() => handleAuthorPress(item.author)}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No quotes yet. Discover some!</Text>
          </View>
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        scrollEnabled={true}
        nestedScrollEnabled={true}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
