# Quotle Architecture & Technical Design

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Quotle Mobile App                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            UI Layer (React Components)              │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  Screens: Home, Search, Create, Profile, Leaderboard│  │
│  │  Components: QuoteCard, Icons, Forms               │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ▲                                  │
│                           │                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Navigation Layer (React Navigation)        │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  Bottom Tab Navigator + Stack Navigators           │  │
│  │  Route Params for Data Passing                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ▲                                  │
│                           │                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Service Layer (Business Logic)            │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  • StorageService: Local data management           │  │
│  │  • QuoteAPIService: External API integration       │  │
│  │  • Quote validation & similarity checking          │  │
│  │  • User management                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ▲                                  │
│                           │                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Data Layer (AsyncStorage)                 │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  • Local Quote Storage                             │  │
│  │  • User Profiles                                    │  │
│  │  • Like/Interaction Data                           │  │
│  │  • Preference Settings                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              External APIs                          │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  • Zen Quotes API (Random quotes)                  │  │
│  │  • Quotable API (Search & tag-based)               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Data Models

### Quote
```typescript
interface Quote {
  id: string;                    // Unique identifier
  text: string;                  // Quote text (10-500 chars)
  author: string;                // Author name
  source?: 'goodreads' | 'user'; // Origin of quote
  createdBy?: string;            // User ID if user-created
  createdAt: number;             // Unix timestamp
  likes: number;                 // Total likes count
  likedBy?: string[];            // Array of user IDs who liked
  shares: number;                // Total shares count
  userLiked?: boolean;           // Current user liked flag
}
```

### User
```typescript
interface User {
  id: string;              // Unique identifier
  name: string;            // Display name
  bio?: string;            // User biography
  likes: number;           // Total likes received
  quotes: number;          // Total quotes created
  followers: number;       // Number of followers
  following: number;       // Number of following
  isCurrentUser?: boolean; // Current user flag
}
```

## Key Features & Implementation

### 1. Quote Discovery
- **Good Reads Integration**: Fetches from Zen Quotes and Quotable APIs
- **Caching**: API results cached in AsyncStorage for offline use
- **Rate Limiting**: Implemented via exponential backoff
- **Error Handling**: Graceful fallbacks for API failures

### 2. Quote Validation
- **Similarity Detection**: Levenshtein distance algorithm
- **Threshold**: 70% similarity triggers warning
- **User Choice**: Allow override of similarity detection
- **Duplicate Prevention**: Case-insensitive text comparison

### 3. Social Features
- **Liking**: Toggle like status, increment/decrement counters
- **Following**: Track user relationships
- **Sharing**: Native share + clipboard fallback
- **Leaderboard**: Dynamic ranking by multiple metrics

### 4. Search Functionality
- **Multi-source**: Local quotes + API quotes
- **Filtering**: By source type (GoodReads vs User quotes)
- **Performance**: Debounced search, result deduplication
- **Relevance**: Keyword matching in text and author fields

### 5. Data Persistence
- **AsyncStorage**: Simple key-value store
- **Keys**: Prefixed with '@quotle_' for namespacing
- **Automatic**: No manual save required
- **Scalability**: Works up to ~10MB per device

## Navigation Structure

```
TabNavigator
├── Home (Stack)
│   ├── HomeScreen
│   ├── QuoteDetail
│   └── UserProfile
├── Search (Stack)
│   ├── SearchScreen
│   ├── QuoteDetail
│   └── UserProfile
├── Create
│   └── CreateQuoteScreen
├── Leaderboard (Stack)
│   ├── LeaderboardScreen
│   └── UserProfile
└── Profile (Stack)
    ├── ProfileScreen
    └── QuoteDetail
```

## State Management

### Local Component State
- Used for form inputs, UI toggles, loading states
- Managed with `useState` hooks

### Navigation Parameters
- Data passed between screens via route.params
- Lightweight, route-specific state

### AsyncStorage
- Persistent app state (quotes, users, interactions)
- Loaded on app launch in relevant screens

### Context (Future)
- Can be added for global app settings
- User authentication state
- Theme preferences

## Performance Optimizations

### 1. Rendering
- `FlatList` with proper key extraction
- `useFocusEffect` for screen-specific data loading
- Conditional rendering to avoid unnecessary components

### 2. Network
- API response caching
- Debounced search queries
- Parallel requests where applicable
- Error recovery mechanisms

### 3. Storage
- Efficient JSON serialization
- Indexed searches (linear, optimized for small datasets)
- Lazy loading of large lists

## Security Considerations

### Data Protection
- No sensitive data stored unencrypted
- User IDs used instead of actual identifiers
- Local-only data (no transmission)

### Input Validation
- Quote text validation (10-500 chars)
- Author name validation (2+ chars)
- Sanitization of API responses

### API Safety
- Public APIs only (no credentials needed)
- HTTPS endpoints
- Rate limiting awareness

## Future Enhancement Paths

### Phase 1: Backend Integration
```
Current: Local AsyncStorage
Target: Firebase Realtime Database or REST API

Benefits:
- Cross-device sync
- Cloud backup
- Real user accounts
- Advanced analytics
```

### Phase 2: Advanced Features
```
Additions:
- Quote collections/lists
- Comment system
- Direct messaging
- Hashtags
- Advanced search filters
- Quote of the day
- Notifications
```

### Phase 3: Monetization
```
Options:
- Premium features
- Ad integration
- In-app purchases
- Subscription model
```

## Scalability Considerations

### Current Limitations
- AsyncStorage: ~10MB limit
- Linear search: O(n) complexity
- No pagination at API level

### Scaling Strategies
1. **Backend Database**: Move data to cloud
2. **Caching**: Implement Redis for frequently accessed data
3. **Indexing**: Add full-text search indices
4. **Pagination**: Implement cursor-based pagination
5. **CDN**: Distribute static assets globally

## Testing Strategy

### Unit Tests
- StorageService operations
- Quote validation logic
- API response parsing

### Integration Tests
- Navigation flows
- Data persistence across screens
- Like/follow functionality

### E2E Tests
- Complete user workflows
- Quote creation to publication
- Search and discovery flows

## Deployment Pipeline

```
Development
    ↓
Testing (Manual/Automated)
    ↓
Staging (EAS Preview)
    ↓
Production (EAS Build)
    ↓
App Store / Google Play
```

## Monitoring & Analytics

### Recommended Tools
- **Crash Reporting**: Sentry or Firebase Crashlytics
- **Analytics**: Firebase Analytics or Amplitude
- **Performance**: React Native Performance Monitor
- **Logging**: Custom logger with error tracking

## API Rate Limits

### Zen Quotes
- Limit: 5 requests/hour
- Response: Single quote + author

### Quotable
- Limit: 100 requests/hour
- Response: Array of quotes with metadata

## Code Quality Standards

### TypeScript
- Strict mode enabled
- Full type coverage for APIs
- Interface segregation

### Naming Conventions
- camelCase for variables and functions
- PascalCase for components and types
- UPPER_SNAKE_CASE for constants

### Code Organization
- Single responsibility principle
- Modular component design
- Service layer separation

---

**Last Updated**: December 2024
**Maintained By**: Quotle Development Team
