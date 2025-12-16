import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import QuoteCard from '../components/QuoteCard';
import StorageService, { Quote } from '../services/StorageService';
import QuoteAPIService, { GoodReadsQuote } from '../services/QuoteAPIService';

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
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#1f2937',
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButtonActive: {
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
  },
  filterText: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
  },
  filterTextActive: {
    color: '#fff',
  },
  resultsSection: {
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  resultsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
    marginBottom: 8,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
  },
});

interface SearchScreenProps {
  navigation: any;
}

type FilterType = 'all' | 'goodreads' | 'user';

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  useFocusEffect(
    useCallback(() => {
      setSearchQuery('');
      setResults([]);
      setFilter('all');
    }, [])
  );

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    try {
      let combinedResults: Quote[] = [];

      // Search user quotes
      if (filter === 'all' || filter === 'user') {
        const userQuotes = await StorageService.searchQuotes(query);
        combinedResults = [...combinedResults, ...userQuotes];
      }

      // Search Good Reads API
      if (filter === 'all' || filter === 'goodreads') {
        const apiQuotes = await Promise.all([
          QuoteAPIService.searchQuotes(query),
          QuoteAPIService.searchQuotesByAuthor(query),
        ]);
        const flattenedQuotes = apiQuotes.flat();
        const convertedQuotes = flattenedQuotes.map((q, index) => ({
          id: `search_${index}_${Date.now()}`,
          text: q.text,
          author: q.author,
          source: 'goodreads' as const,
          createdAt: Date.now(),
          likes: Math.floor(Math.random() * 500),
          shares: Math.floor(Math.random() * 200),
        }));
        combinedResults = [...combinedResults, ...convertedQuotes];
      }

      // Remove duplicates and sort by relevance
      const seen = new Set();
      const uniqueResults = combinedResults.filter((quote) => {
        if (seen.has(quote.text)) return false;
        seen.add(quote.text);
        return true;
      });

      setResults(uniqueResults);
    } catch (error) {
      console.error('Error searching quotes:', error);
    }
    setLoading(false);
  };

  const handleQuotePress = (quote: Quote) => {
    navigation.navigate('QuoteDetail', { quote });
  };

  const handleAuthorPress = (author: string) => {
    navigation.navigate('UserProfile', { userName: author });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Quotes</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search quotes or authors..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <View style={styles.filterContainer}>
          {(['all', 'goodreads', 'user'] as FilterType[]).map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterButton, filter === f && styles.filterButtonActive]}
              onPress={() => {
                setFilter(f);
                if (searchQuery.trim().length >= 2) {
                  handleSearch(searchQuery);
                }
              }}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f === 'all' ? 'All' : f === 'goodreads' ? 'GoodReads' : 'My Quotes'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#7c3aed" />
        </View>
      )}

      {!loading && results.length > 0 && (
        <View style={styles.resultsSection}>
          <Text style={styles.resultsTitle}>{results.length} results found</Text>
        </View>
      )}

      {!loading && results.length === 0 && searchQuery.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Start searching for quotes</Text>
        </View>
      )}

      {!loading && results.length === 0 && searchQuery.length > 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No results found</Text>
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={(item, index) => `${item.id}_${index}`}
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
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
