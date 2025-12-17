import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Share,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import StorageService, { Quote, User } from '../services/StorageService';
import { HeartIcon, ShareIcon } from '../components/Icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  quoteText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    fontFamily: 'DMSans-Regular',
    lineHeight: 32,
    marginBottom: 20,
  },
  authorSection: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginBottom: 20,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'DMSans-Regular',
    marginBottom: 4,
  },
  authorBio: {
    fontSize: 13,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
    lineHeight: 18,
  },
  statsSection: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    fontFamily: 'DMSans-Regular',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  likeButton: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  likeButtonActive: {
    backgroundColor: '#fee2e2',
  },
  likeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'DMSans-Regular',
  },
  shareButton: {
    backgroundColor: '#f9fafb',
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'DMSans-Regular',
  },
  creatorInfo: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 20,
  },
  creatorLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
    marginBottom: 6,
  },
  creatorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7c3aed',
    fontFamily: 'DMSans-Regular',
  },
});

interface QuoteDetailScreenProps {
  navigation: any;
  route: any;
}

const QuoteDetailScreen: React.FC<QuoteDetailScreenProps> = ({ navigation, route }) => {
  const { quote } = route.params;
  const [quoteData, setQuoteData] = useState<Quote>(quote);
  const [isLiked, setIsLiked] = useState(false);
  const [creator, setCreator] = useState<User | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>('');

  useEffect(() => {
    loadQuoteData();
  }, []);

  const loadQuoteData = async () => {
    try {
      // Get fresh quote data
      const freshQuote = await StorageService.getQuoteById(quote.id);
      if (freshQuote) {
        setQuoteData(freshQuote);
      }

      // Get current user
      const currentUser = await StorageService.getCurrentUser();
      setCurrentUserId(currentUser.id);

      // Check if liked
      const liked = await StorageService.isQuoteLikedByUser(quote.id, currentUser.id);
      setIsLiked(liked);

      // Load creator info if user quote
      if (freshQuote?.createdBy) {
        const creatorUser = await StorageService.getUser(freshQuote.createdBy);
        if (creatorUser) {
          setCreator(creatorUser);
        }
      }
    } catch (error) {
      console.error('Error loading quote details:', error);
    }
  };

  const handleLike = async () => {
    try {
      await StorageService.toggleLike(quoteData.id, currentUserId);
      setIsLiked(!isLiked);

      // Refresh quote
      const updatedQuote = await StorageService.getQuoteById(quoteData.id);
      if (updatedQuote) {
        setQuoteData(updatedQuote);
      }
    } catch (error) {
      console.error('Error liking quote:', error);
    }
  };

  const handleShare = async () => {
    try {
      const shareText = `"${quoteData.text}" ~${quoteData.author}\n\nFrom Quotle 💭`;
      
      // Try using native sharing first
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(shareText);
      } else {
        // Fallback to clipboard
        await Clipboard.setStringAsync(shareText);
        Alert.alert('Copied!', 'Quote copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing quote:', error);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(`"${quoteData.text}" ~${quoteData.author}`);
      Alert.alert('Copied!', 'Quote copied to clipboard');
    } catch (error) {
      console.error('Error copying:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.quoteText}>"{quoteData.text}"</Text>

          <View style={styles.authorSection}>
            <Text style={styles.authorName}>~{quoteData.author}</Text>
            {creator && (
              <Text style={styles.authorBio}>
                Author from {creator.name}'s collection
              </Text>
            )}
          </View>

          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{quoteData.likes}</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{quoteData.shares || 0}</Text>
              <Text style={styles.statLabel}>Shares</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {new Date(quoteData.createdAt).toLocaleDateString()}
              </Text>
              <Text style={styles.statLabel}>Added</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.likeButton,
                isLiked && styles.likeButtonActive,
              ]}
              onPress={handleLike}
            >
              <HeartIcon color={isLiked ? '#dc2626' : '#9ca3af'} size={20} filled={isLiked} />
              <Text style={styles.likeButtonText}>
                {isLiked ? 'Liked' : 'Like'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.shareButton]}
              onPress={handleShare}
            >
              <ShareIcon color="#6b7280" size={20} />
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>

          {creator && creator.id !== currentUserId && (
            <View style={styles.creatorInfo}>
              <Text style={styles.creatorLabel}>Shared by</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UserProfile', {
                    userId: creator.id,
                    userName: creator.name,
                  })
                }
              >
                <Text style={styles.creatorName}>{creator.name}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuoteDetailScreen;
