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
  Animated,
  PanResponder,
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
    paddingTop: 50,
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
  autocompleteContainer: {
    position: 'absolute',
    top: 150,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    maxHeight: 300,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  autocompleteSuggestion: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  autocompleteSuggestionLast: {
    borderBottomWidth: 0,
  },
  autocompleteSuggestionText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    lineHeight: 20,
  },
  autocompleteSuggestionAuthor: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
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
    marginBottom: 0,
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
  quoteCardContainer: {
    marginBottom: 16,
    overflow: 'hidden',
    borderRadius: 12,
    position: 'relative',
    backgroundColor: '#f5f5f5',
  },
  quoteCardAnimated: {
    zIndex: 1,
  },
  deleteAction: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 12,
    zIndex: 0,
    minHeight: 20,
  },
  deleteIcon: {
    fontSize: 32,
  },
});

export default function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
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

  const handleSearchInput = (text) => {
    setSearchTerm(text);
    
    if (text.trim().length === 0) {
      setAutocompleteSuggestions([]);
      setShowAutocomplete(false);
      return;
    }

    // Filter quotes for autocomplete
    const searchLower = text.toLowerCase();
    const suggestions = quotesDatabase.filter(quote =>
      quote.content.toLowerCase().includes(searchLower) ||
      quote.author.toLowerCase().includes(searchLower)
    ).slice(0, 5); // Limit to 5 suggestions

    setAutocompleteSuggestions(suggestions);
    setShowAutocomplete(suggestions.length > 0);
  };

  const handleAutocompleteSuggestionPress = (quote) => {
    setSearchTerm(quote.content);
    setShowAutocomplete(false);
    
    // Trigger search with the selected quote
    const searchLower = quote.content.toLowerCase();
    const filtered = quotesDatabase.filter(q =>
      q.content.toLowerCase().includes(searchLower) ||
      q.author.toLowerCase().includes(searchLower)
    );
    
    setSearchResults(filtered.slice(0, 20));
    setShowSearchModal(true);
  };

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

  const deleteQuote = (quoteId) => {
    setQuotes(quotes.filter(q => q.id !== quoteId));
  };

  const SwipeableQuoteCard = ({ quote, index }) => {
    const pan = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 5,
        onPanResponderMove: (evt, gestureState) => {
          // Only allow swiping left (negative values)
          if (gestureState.dx <= 0) {
            // Constrain to max swipe of 80 (width of delete button)
            const newValue = Math.max(gestureState.dx, -80);
            pan.setValue(newValue);
          }
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dx < -40) {
            // Snap to open position (show delete button)
            Animated.spring(pan, {
              toValue: -80,
              tension: 50,
              friction: 10,
              useNativeDriver: true,
            }).start();
          } else {
            // Snap back to closed position
            Animated.spring(pan, {
              toValue: 0,
              tension: 50,
              friction: 10,
              useNativeDriver: true,
            }).start();
          }
        },
      })
    ).current;

    return (
      <View style={styles.quoteCardContainer}>
        <TouchableOpacity 
          style={styles.deleteAction}
          onPress={() => deleteQuote(quote.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.deleteIcon}>🗑️</Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.quoteCardAnimated,
            {
              transform: [{ translateX: pan }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.quoteCard}>
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
        </Animated.View>
      </View>
    );
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
            onChangeText={handleSearchInput}
            onSubmitEditing={handleSearch}
            placeholderTextColor="#999"
            returnKeyType="search"
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity
              style={styles.searchClear}
              onPress={() => {
                setSearchTerm('');
                setShowAutocomplete(false);
                setAutocompleteSuggestions([]);
                setShowSearchModal(false);
              }}
            >
              <Text style={styles.searchClearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {showAutocomplete && autocompleteSuggestions.length > 0 && (
          <View style={styles.autocompleteContainer}>
            <ScrollView scrollEnabled={autocompleteSuggestions.length > 3}>
              {autocompleteSuggestions.map((quote, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.autocompleteSuggestion,
                    index === autocompleteSuggestions.length - 1 && styles.autocompleteSuggestionLast,
                  ]}
                  onPress={() => handleAutocompleteSuggestionPress(quote)}
                  activeOpacity={0.7}
                >
                  <Text 
                    style={styles.autocompleteSuggestionText}
                    numberOfLines={2}
                  >
                    {quote.content}
                  </Text>
                  <Text style={styles.autocompleteSuggestionAuthor}>
                    — {quote.author}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <ScrollView
        style={styles.quotesContainer}
        ref={scrollViewRef}
      >
        {quotes.map((quote, index) => (
          <SwipeableQuoteCard key={quote.id} quote={quote} index={index} />
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
