import React, { useState, useRef } from 'react';
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
});

export default function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [likedQuotes, setLikedQuotes] = useState(new Set());
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
    </View>
  );
}
