# Quotle - Mobile Quote Sharing App

A modern React Native mobile application for storing, discovering, and sharing inspirational quotes with a social media twist.

## Features

- **Home Screen**: View your curated top quotes and discover new inspirational quotes from the Goodreads API
- **Search**: Search for quotes by text or author, with filtering by source (Goodreads, user quotes)
- **Create Quotes**: Share your own quotes with automatic similarity checking to prevent duplicates
- **Profile**: Manage your profile, view your quotes, stats, and followers
- **Leaderboard**: Discover top users ranked by likes, quotes created, or followers
- **Social Features**: Like, share, and follow functionality
- **Modern UI**: Clean, intuitive design with smooth animations and transitions

## Tech Stack

- **React Native** with Expo for cross-platform development (iOS/Android)
- **React Navigation** for intuitive navigation flows
- **TypeScript** for type safety
- **AsyncStorage** for local data persistence
- **Axios** for API calls
- **Goodreads & Quotable APIs** for quote discovery

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
expo start
```

3. Open the app:
   - **iOS**: Press `i` to open in iOS Simulator
   - **Android**: Press `a` to open in Android Emulator
   - **Web**: Press `w` to open in web browser
   - **Scan QR Code**: Use Expo Go app on your mobile device

## Project Structure

```
src/
├── screens/              # Screen components
│   ├── HomeScreen.tsx
│   ├── SearchScreen.tsx
│   ├── CreateQuoteScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── LeaderboardScreen.tsx
│   ├── QuoteDetailScreen.tsx
│   └── UserProfileScreen.tsx
├── components/           # Reusable components
│   ├── QuoteCard.tsx
│   └── Icons.tsx
├── services/            # Business logic & API calls
│   ├── StorageService.ts
│   └── QuoteAPIService.ts
└── styles/              # Global styles (optional)
```

## API Integration

### Goodreads Quotes
- **Zen Quotes API**: Random quote generation
- **Quotable API**: Search quotes by keywords, authors, and tags

### Features

- Automatic quote validation against similar existing quotes
- Case-insensitive search across all quotes
- Real-time like and share counters
- User follow system
- Dynamic leaderboards

## How to Use

### Discovering Quotes
1. Open the Home screen to see your top quotes
2. Scroll to discover quotes from the Goodreads API
3. Tap "Load More Quotes" to refresh the discovery feed

### Searching Quotes
1. Navigate to the Search tab
2. Enter keywords or author names
3. Filter by source (All, Goodreads, My Quotes)
4. Tap any quote to view details

### Creating Quotes
1. Go to the Create tab
2. Enter your quote and the author
3. The app will check for similar existing quotes
4. If similar quotes are found, you can either start over or publish anyway
5. Your quote will be added to your profile

### Profile Management
1. Visit your Profile tab to view your stats
2. See your total likes, quotes, followers, and following count
3. View all your created quotes
4. Access sharing options

### Leaderboard
1. View top users ranked by:
   - **Likes**: Most popular quotes
   - **Quotes**: Most prolific creators
   - **Followers**: Most followed users
2. Tap any user to view their profile and quotes

## Data Storage

The app uses AsyncStorage for local persistence:
- User profiles and statistics
- Created quotes
- Like/unlike data
- User relationships (following/followers)

**Note**: In a production app, this should be replaced with a backend database (Firebase, MongoDB, etc.)

## Customization

### Colors & Branding
- Primary color: `#7c3aed` (Purple)
- Accent colors: Various pastels for different UI elements
- Edit colors in component `StyleSheet` definitions

### Fonts
- Primary font: "DM Sans" (modern, clean)
- Located in `assets/fonts/`

## Future Enhancements

- [ ] Backend authentication (Firebase/Auth0)
- [ ] Real-time notifications
- [ ] Quote collections/favorites
- [ ] Quote commenting system
- [ ] Advanced analytics
- [ ] Dark mode support
- [ ] Offline quote sync
- [ ] Quote of the day feature
- [ ] Advanced filtering and sorting
- [ ] User message/DM system

## Known Limitations

- Data is stored locally and not synced across devices
- Quote similarity checking is client-side only
- No backend persistence
- Limited to Goodreads and Quotable APIs

## License

MIT License - feel free to use this project as a template for your own apps

## Support

For issues or feature requests, please open an issue or contact the development team.

---

**Happy quoting! 💭**
