import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Quote {
  id: string;
  text: string;
  author: string;
  source?: 'goodreads' | 'user';
  createdBy?: string;
  createdAt: number;
  likes: number;
  likedBy?: string[];
  shares: number;
  userLiked?: boolean;
}

export interface User {
  id: string;
  name: string;
  bio?: string;
  likes: number;
  quotes: number;
  followers: number;
  following: number;
  isCurrentUser?: boolean;
}

const QUOTES_KEY = '@quotle_quotes';
const CURRENT_USER_KEY = '@quotle_current_user';
const USERS_KEY = '@quotle_users';
const USER_QUOTES_KEY = '@quotle_user_quotes';
const LIKES_KEY = '@quotle_likes';

// Initialize default users
const defaultUsers: { [key: string]: User } = {
  'user_1': {
    id: 'user_1',
    name: 'Brandon Tedesco',
    bio: 'Quote enthusiast 💭',
    likes: 420,
    quotes: 24,
    followers: 1309,
    following: 342,
    isCurrentUser: true,
  },
  'user_2': {
    id: 'user_2',
    name: 'Buzz',
    bio: 'Daily inspiration',
    likes: 1309,
    quotes: 156,
    followers: 5420,
    following: 234,
  },
  'user_3': {
    id: 'user_3',
    name: 'Heather',
    bio: 'Philosophy & life',
    likes: 220,
    quotes: 89,
    followers: 892,
    following: 156,
  },
};

export const StorageService = {
  // User operations
  async getCurrentUser(): Promise<User> {
    try {
      const user = await AsyncStorage.getItem(CURRENT_USER_KEY);
      return user ? JSON.parse(user) : defaultUsers['user_1'];
    } catch {
      return defaultUsers['user_1'];
    }
  },

  async setCurrentUser(user: User): Promise<void> {
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  },

  async getUser(userId: string): Promise<User | null> {
    try {
      const users = await AsyncStorage.getItem(USERS_KEY);
      const userMap = users ? JSON.parse(users) : defaultUsers;
      return userMap[userId] || null;
    } catch {
      return defaultUsers[userId] || null;
    }
  },

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await AsyncStorage.getItem(USERS_KEY);
      const userMap = users ? JSON.parse(users) : defaultUsers;
      return Object.values(userMap);
    } catch {
      return Object.values(defaultUsers);
    }
  },

  // Quote operations
  async getQuotes(): Promise<Quote[]> {
    try {
      const quotes = await AsyncStorage.getItem(QUOTES_KEY);
      return quotes ? JSON.parse(quotes) : [];
    } catch {
      return [];
    }
  },

  async saveQuote(quote: Quote): Promise<void> {
    const quotes = await this.getQuotes();
    quotes.push(quote);
    await AsyncStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
  },

  async updateQuote(quote: Quote): Promise<void> {
    const quotes = await this.getQuotes();
    const index = quotes.findIndex((q) => q.id === quote.id);
    if (index !== -1) {
      quotes[index] = quote;
      await AsyncStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
    }
  },

  async getUserQuotes(userId: string): Promise<Quote[]> {
    try {
      const quotes = await this.getQuotes();
      return quotes.filter((q) => q.createdBy === userId);
    } catch {
      return [];
    }
  },

  // Like operations
  async toggleLike(quoteId: string, userId: string): Promise<void> {
    const quote = await this.getQuoteById(quoteId);
    if (!quote) return;

    const likedBy = quote.likedBy || [];
    const index = likedBy.indexOf(userId);

    if (index === -1) {
      likedBy.push(userId);
      quote.likes += 1;
    } else {
      likedBy.splice(index, 1);
      quote.likes -= 1;
    }

    quote.likedBy = likedBy;
    await this.updateQuote(quote);
  },

  async isQuoteLikedByUser(quoteId: string, userId: string): Promise<boolean> {
    const quote = await this.getQuoteById(quoteId);
    if (!quote || !quote.likedBy) return false;
    return quote.likedBy.includes(userId);
  },

  async getQuoteById(id: string): Promise<Quote | null> {
    const quotes = await this.getQuotes();
    return quotes.find((q) => q.id === id) || null;
  },

  async getTopQuotes(limit: number = 10): Promise<Quote[]> {
    const quotes = await this.getQuotes();
    return quotes.sort((a, b) => b.likes - a.likes).slice(0, limit);
  },

  async searchQuotes(query: string): Promise<Quote[]> {
    const quotes = await this.getQuotes();
    const lowerQuery = query.toLowerCase();
    return quotes.filter(
      (q) =>
        q.text.toLowerCase().includes(lowerQuery) ||
        q.author.toLowerCase().includes(lowerQuery)
    );
  },

  async checkSimilarQuotes(text: string): Promise<Quote[]> {
    const quotes = await this.getQuotes();
    return quotes.filter((q) => {
      const similarity = this.calculateSimilarity(text, q.text);
      return similarity > 0.7;
    });
  },

  calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    if (longer.length === 0) return 1.0;
    const editDistance = this.getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  },

  getEditDistance(s1: string, s2: string): number {
    const costs: number[] = [];
    for (let j = 0; j <= s2.length; j++) costs[j] = j;
    for (let i = 1; i <= s1.length; i++) {
      costs[0] = i;
      let nw = i - 1;
      for (let j = 1; j <= s2.length; j++) {
        const cj = Math.min(1 + Math.min(costs[j], costs[j - 1]), nw + (s1[i - 1] === s2[j - 1] ? 0 : 1));
        nw = costs[j];
        costs[j] = cj;
      }
    }
    return costs[s2.length];
  },
};

export default StorageService;
