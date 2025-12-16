import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  quoteCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#7c3aed',
  },
  quoteCardHighlight: {
    backgroundColor: '#faf5ff',
    borderLeftColor: '#a855f7',
  },
  quoteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'DMSans-Regular',
    marginBottom: 12,
    lineHeight: 24,
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorText: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
  },
  touchable: {
    flex: 1,
  },
});

export interface QuoteCardProps {
  quote: string;
  author: string;
  likes?: number;
  shares?: number;
  isTopQuote?: boolean;
  onPress?: () => void;
  onAuthorPress?: () => void;
  likeCount?: number;
  shareCount?: number;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author,
  likes = 120,
  shares = 45,
  isTopQuote = false,
  onPress,
  onAuthorPress,
  likeCount,
  shareCount,
}) => {
  return (
    <TouchableOpacity 
      style={[styles.quoteCard, isTopQuote && styles.quoteCardHighlight]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.quoteText}>"{quote}"</Text>
      <View style={styles.authorContainer}>
        <TouchableOpacity onPress={onAuthorPress}>
          <Text style={styles.authorText}>~{author}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statText}>❤️ {likeCount ?? likes}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statText}>📤 {shareCount ?? shares}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default QuoteCard;
