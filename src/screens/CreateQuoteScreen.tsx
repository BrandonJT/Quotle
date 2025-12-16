import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import StorageService, { Quote, User } from '../services/StorageService';

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
  form: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'DMSans-Regular',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'DMSans-Regular',
  },
  submitButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    marginTop: 4,
  },
  tipBox: {
    backgroundColor: '#faf5ff',
    borderLeftWidth: 4,
    borderLeftColor: '#a855f7',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
  tipText: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    fontFamily: 'DMSans-Regular',
    marginBottom: 16,
  },
  similarQuote: {
    backgroundColor: '#f3f4f6',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  similarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'DMSans-Regular',
    marginBottom: 4,
  },
  similarAuthor: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'DMSans-Regular',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  modalButtonCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  modalButtonSubmit: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#7c3aed',
    alignItems: 'center',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
});

interface CreateQuoteScreenProps {
  navigation: any;
}

const CreateQuoteScreen: React.FC<CreateQuoteScreenProps> = ({ navigation }) => {
  const [quoteText, setQuoteText] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ quote?: string; author?: string }>({});
  const [showSimilarModal, setShowSimilarModal] = useState(false);
  const [similarQuotes, setSimilarQuotes] = useState<Quote[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadCurrentUser();
    }, [])
  );

  const loadCurrentUser = async () => {
    const user = await StorageService.getCurrentUser();
    setCurrentUser(user);
  };

  const validateQuote = (): boolean => {
    const newErrors: typeof errors = {};

    if (!quoteText.trim()) {
      newErrors.quote = 'Quote cannot be empty';
    } else if (quoteText.length < 10) {
      newErrors.quote = 'Quote must be at least 10 characters';
    } else if (quoteText.length > 500) {
      newErrors.quote = 'Quote cannot exceed 500 characters';
    }

    if (!author.trim()) {
      newErrors.author = 'Author is required';
    } else if (author.length < 2) {
      newErrors.author = 'Author name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateQuote()) {
      return;
    }

    setLoading(true);
    try {
      // Check for similar quotes
      const similar = await StorageService.checkSimilarQuotes(quoteText);

      if (similar.length > 0) {
        setSimilarQuotes(similar);
        setShowSimilarModal(true);
        setLoading(false);
        return;
      }

      // Create new quote
      const newQuote: Quote = {
        id: `user_${Date.now()}`,
        text: quoteText,
        author: author,
        source: 'user',
        createdBy: currentUser?.id || 'user_1',
        createdAt: Date.now(),
        likes: 0,
        likedBy: [],
        shares: 0,
        userLiked: false,
      };

      await StorageService.saveQuote(newQuote);

      Alert.alert('Success!', 'Your quote has been published', [
        {
          text: 'View Quote',
          onPress: () => {
            setQuoteText('');
            setAuthor('');
            navigation.navigate('Home');
          },
        },
        {
          text: 'Create Another',
          onPress: () => {
            setQuoteText('');
            setAuthor('');
          },
        },
      ]);
    } catch (error) {
      console.error('Error creating quote:', error);
      Alert.alert('Error', 'Failed to create quote. Please try again.');
    }
    setLoading(false);
  };

  const handlePublishAnyway = async () => {
    setShowSimilarModal(false);
    setLoading(true);

    try {
      const newQuote: Quote = {
        id: `user_${Date.now()}`,
        text: quoteText,
        author: author,
        source: 'user',
        createdBy: currentUser?.id || 'user_1',
        createdAt: Date.now(),
        likes: 0,
        likedBy: [],
        shares: 0,
        userLiked: false,
      };

      await StorageService.saveQuote(newQuote);

      Alert.alert('Success!', 'Your quote has been published', [
        {
          text: 'View Quote',
          onPress: () => {
            setQuoteText('');
            setAuthor('');
            navigation.navigate('Home');
          },
        },
        {
          text: 'Create Another',
          onPress: () => {
            setQuoteText('');
            setAuthor('');
          },
        },
      ]);
    } catch (error) {
      console.error('Error creating quote:', error);
      Alert.alert('Error', 'Failed to create quote. Please try again.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Quote</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.tipBox}>
            <Text style={styles.tipText}>
              💡 Share your wisdom! Quotes should be original or properly attributed.
            </Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Your Quote *</Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                errors.quote ? styles.inputError : undefined,
              ]}
              placeholder="Enter your quote here..."
              placeholderTextColor="#9ca3af"
              value={quoteText}
              onChangeText={(text) => {
                setQuoteText(text);
                if (errors.quote) {
                  setErrors({ ...errors, quote: undefined });
                }
              }}
              multiline
              maxLength={500}
            />
            <Text style={styles.characterCount}>
              {quoteText.length}/500
            </Text>
            {errors.quote && <Text style={styles.errorText}>{errors.quote}</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Author *</Text>
            <TextInput
              style={[
                styles.input,
                errors.author ? styles.inputError : undefined,
              ]}
              placeholder="Who said this quote?"
              placeholderTextColor="#9ca3af"
              value={author}
              onChangeText={(text) => {
                setAuthor(text);
                if (errors.author) {
                  setErrors({ ...errors, author: undefined });
                }
              }}
            />
            {errors.author && <Text style={styles.errorText}>{errors.author}</Text>}
          </View>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Publish Quote</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Similar Quotes Modal */}
      <Modal
        visible={showSimilarModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSimilarModal(false)}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Similar Quotes Found</Text>
            <Text style={[styles.tipText, { marginBottom: 12 }]}>
              We found quotes very similar to yours. Consider reviewing these:
            </Text>

            <ScrollView>
              {similarQuotes.map((quote) => (
                <View key={quote.id} style={styles.similarQuote}>
                  <Text style={styles.similarText}>"{quote.text}"</Text>
                  <Text style={styles.similarAuthor}>~{quote.author}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => {
                  setShowSimilarModal(false);
                  setQuoteText('');
                  setAuthor('');
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1f2937' }}>
                  Start Over
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonSubmit}
                onPress={handlePublishAnyway}
              >
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>
                  Publish Anyway
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CreateQuoteScreen;
