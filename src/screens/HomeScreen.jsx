import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { quotesDatabase } from '../data/quotesDatabase';

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
  quotesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  quoteCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  quoteText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  quoteAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorAvatarText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  quoteFooter: {
    fontSize: 13,
    color: '#999',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  quoteActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: 14,
    color: '#666',
  },
  searchResultsModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  searchResultsContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchResultsHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
  },
  searchResultCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchResultText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    lineHeight: 20,
  },
  searchResultAuthor: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  addQuoteBtn: {
    backgroundColor: '#667eea',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addQuoteBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [likedQuotes, setLikedQuotes] = useState(new Set());
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      text: "At the end of the day people won't remember what you said or did, they will remember how you made them feel.",
      author: "Maya Angelou",
      discoverer: "Btedz",
      likes: 120,
    },
    {
      id: 2,
      text: "Our identity is wrapped up in what others think of us—or, more accurately, what we think others think of us.",
      author: "Jay Shetty",
      discoverer: "Htedz",
      likes: 120,
    },
    {
      id: 3,
      text: "Nobody in life gets exactly what they thought they were going to get. But if you work really hard and you're kind, amazing things will happen.",
      author: "Conan O'Brien",
      discoverer: "Efedz",
      likes: 120,
    },
  ]);

  const scrollViewRef = useRef(null);

  const handleLikePress = (quoteId) => {
    const isLiked = likedQuotes.has(quoteId);
    const newLikedQuotes = new Set(likedQuotes);
    
    if (isLiked) {
      newLikedQuotes.delete(quoteId);
    } else {
      newLikedQuotes.add(quoteId);
    }
    
    setLikedQuotes(newLikedQuotes);
    
    const updatedQuotes = quotes.map(q => 
      q.id === quoteId 
        ? { ...q, likes: isLiked ? q.likes - 1 : q.likes + 1 }
        : q
    );
    setQuotes(updatedQuotes);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setShowSearchModal(true);

    try {
      // Search through local database
      const searchLower = searchTerm.toLowerCase();
      const filtered = quotesDatabase.filter(quote =>
        quote.content.toLowerCase().includes(searchLower) ||
        quote.author.toLowerCase().includes(searchLower)
      );

      // If no exact matches, do a fuzzy match on individual words
      if (filtered.length === 0) {
        const keywords = searchLower.split(' ').filter(word => word.length > 2);
        const fuzzyMatches = quotesDatabase.filter(quote => {
          const quoteLower = quote.content.toLowerCase() + ' ' + quote.author.toLowerCase();
          return keywords.some(keyword => quoteLower.includes(keyword));
        });
        setSearchResults(fuzzyMatches.slice(0, 20));
      } else {
        setSearchResults(filtered.slice(0, 20));
      }
    } catch (error) {
      console.error('Error searching quotes:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const addQuoteToHome = (quote) => {
    const newQuote = {
      id: Math.max(...quotes.map(q => q.id), 0) + 1,
      text: quote.content,
      author: quote.author,
      discoverer: 'You',
      likes: 0,
    };
    setQuotes([...quotes, newQuote]);
    setSearchResults(searchResults.filter(r => r._id !== quote._id));
  };

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
            placeholder="Search quotes..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
            placeholderTextColor="#999"
            returnKeyType="search"
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity
              style={styles.searchClear}
              onPress={() => {
                setSearchTerm('');
                setShowSearchModal(false);
              }}
            >
              <Text style={styles.searchClearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.quotesContainer}
        ref={scrollViewRef}
      >
        {quotes.map((quote, index) => (
          <View key={quote.id} style={styles.quoteCard}>
            <Text style={styles.quoteText}>"{quote.text}"</Text>
            <View style={styles.quoteAuthor}>
              <View style={styles.authorAvatar}>
                <Text style={styles.authorAvatarText}>
                  {quote.author.charAt(0)}
                </Text>
              </View>
              <Text style={styles.authorName}>~{quote.author}</Text>
            </View>
            <Text style={styles.quoteFooter}>Discoverer: {quote.discoverer}</Text>
            <View style={styles.quoteActions}>
              <TouchableOpacity 
                style={styles.actionBtn}
                onPress={() => handleLikePress(quote.id)}
              >
                <Text style={{
                  fontSize: 14,
                  color: likedQuotes.has(quote.id) ? '#e74c3c' : '#999',
                }}>
                  {likedQuotes.has(quote.id) ? '❤️' : '🤍'} {quote.likes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>📤 Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={showSearchModal}
        animationType="slide"
        onRequestClose={() => setShowSearchModal(false)}
        transparent={true}
      >
        <View style={styles.searchResultsModal}>
          <View style={styles.searchResultsContainer}>
            <Text style={styles.searchResultsHeader}>Search Results</Text>
            
            {isSearching ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#667eea" />
              </View>
            ) : searchResults.length === 0 ? (
              <Text style={styles.noResultsText}>
                {searchTerm.trim() ? 'No quotes found. Try a different search.' : 'Enter a search term to find quotes.'}
              </Text>
            ) : (
              <ScrollView showsVerticalScrollIndicator={true}>
                {searchResults.map((quote, index) => (
                  <View key={quote._id || index} style={styles.searchResultCard}>
                    <Text style={styles.searchResultText}>"{quote.content}"</Text>
                    <Text style={styles.searchResultAuthor}>— {quote.author}</Text>
                    <TouchableOpacity 
                      style={styles.addQuoteBtn}
                      onPress={() => addQuoteToHome(quote)}
                    >
                      <Text style={styles.addQuoteBtnText}>➕ Add to Home</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                <View style={{ height: 20 }} />
              </ScrollView>
            )}
            
            <TouchableOpacity 
              style={{ paddingVertical: 16 }}
              onPress={() => setShowSearchModal(false)}
            >
              <Text style={{ 
                fontSize: 16, 
                color: '#667eea', 
                textAlign: 'center',
                fontWeight: '600'
              }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
