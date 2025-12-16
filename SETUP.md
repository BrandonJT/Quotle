# Quotle Setup Guide

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Expo CLI** - Install with: `npm install -g expo-cli`
- **iOS Simulator** (for Mac users) or **Android Emulator**
- **Expo Go app** (available on iOS App Store and Google Play Store)

## Installation Steps

### 1. Install Dependencies

Navigate to the Quotle folder and install all required packages:

```bash
cd Quotle
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

### 2. Start the Development Server

Launch the Expo development server:

```bash
npm start
```

or

```bash
expo start
```

You should see output like:

```
› Metro waiting on exp://YOUR_IP:19000
```

### 3. Run on Different Platforms

#### **iOS Simulator** (Mac only)
Press `i` in the terminal, or scan the QR code with Xcode

#### **Android Emulator**
Press `a` in the terminal

#### **Web Browser**
Press `w` in the terminal

#### **Physical Device**
1. Install the **Expo Go** app from App Store or Google Play
2. Scan the QR code displayed in the terminal
3. Wait for the app to load

## Project Structure

```
Quotle/
├── App.tsx                    # Main app entry point with navigation
├── app.json                   # Expo configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── index.js                  # Entry point for Expo
├── assets/                   # Static assets (fonts, images)
├── src/
│   ├── screens/             # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── CreateQuoteScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── LeaderboardScreen.tsx
│   │   ├── QuoteDetailScreen.tsx
│   │   └── UserProfileScreen.tsx
│   ├── components/          # Reusable UI components
│   │   ├── QuoteCard.tsx
│   │   └── Icons.tsx
│   └── services/            # Business logic & APIs
│       ├── StorageService.ts
│       └── QuoteAPIService.ts
└── README.md                # Project documentation
```

## Features Overview

### 🏠 Home Screen
- View your personalized top quotes
- Discover new quotes from the Goodreads API
- Shows quote stats (likes, shares, discovery info)
- Pull-to-refresh functionality

### 🔍 Search
- Search quotes by text or author
- Filter by source: All, Goodreads, or My Quotes
- Real-time search results
- Navigate to quote details from results

### ✍️ Create Quote
- Submit your own quotes with author attribution
- Automatic similarity detection
- Character count (max 500)
- Form validation for both quote and author fields
- Modal confirmation for similar quotes

### 👤 Profile
- View your profile stats (quotes, likes, followers)
- See all your created quotes
- Quick access to create new quotes
- Share your profile

### 🏆 Leaderboard
- View top users ranked by:
  - Likes received
  - Number of quotes created
  - Number of followers
- Tab-based navigation between rankings
- Click to view user profiles

### 💬 Quote Detail
- View full quote with author info
- Like/unlike functionality
- Share quotes via native sharing or clipboard
- See who created the quote (for user-created quotes)
- View quote creation date and engagement stats

### 👥 User Profiles
- View any user's profile
- See their quotes collection
- View user stats
- Follow/unfollow users

## API Integration

### Goodreads Quote APIs
The app uses two free APIs for quote discovery:

1. **Zen Quotes API** - Random quotes
   - Endpoint: `https://zenquotes.io/api/random`
   - No authentication required
   - Rate limit: Reasonable

2. **Quotable API** - Search and tag-based quotes
   - Endpoint: `https://api.quotable.io`
   - No authentication required
   - Features: Author search, keyword search, tags

**Note:** No API keys are required for these services.

## Data Storage

### Local Storage (AsyncStorage)
All data is stored locally on the device using React Native's AsyncStorage:

- **User profiles** - Default users and custom user data
- **Quotes** - All quotes (user-created and discovered)
- **Interactions** - Likes and sharing data
- **Preferences** - User-specific settings

### Default Users

The app comes with three pre-loaded users:

1. **Brandon Tedesco** (Current user)
   - 420 likes | 24 quotes | 1,309 followers

2. **Buzz**
   - 1,309 likes | 156 quotes | 5,420 followers

3. **Heather**
   - 220 likes | 89 quotes | 892 followers

## Customization

### Change Primary Color
The primary color is `#7c3aed` (purple). To change:

1. Open any component file
2. Find `#7c3aed` in the StyleSheet
3. Replace with your desired color

### Change Fonts
Fonts are configured in `app.json` under `plugins`. To add new fonts:

1. Add font files to `assets/fonts/`
2. Update `app.json` plugins configuration
3. Import fonts in `App.tsx` using `useFonts()`

### Modify Default Data
Edit [StorageService.ts](src/services/StorageService.ts) to change:

- Default users
- Initial quote data
- Storage keys

## Building for Production

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

**Note:** You'll need an Expo account. Sign up at [expo.dev](https://expo.dev)

## Troubleshooting

### App won't start
- Clear cache: `expo start -c`
- Delete `node_modules` and reinstall: `npm install`

### Can't connect on device
- Ensure device and computer are on same WiFi
- Check firewall settings
- Try tunneling: `expo start --tunnel`

### TypeScript errors
- Run: `npm install` to ensure all types are installed
- Check `tsconfig.json` configuration

### API calls failing
- Check internet connection
- Verify API endpoints are accessible
- Check console for detailed error messages

## Next Steps

1. **Customize branding**: Update app.json, colors, and fonts
2. **Add backend**: Replace AsyncStorage with Firebase or custom API
3. **Add authentication**: Implement user login/signup
4. **Enhance features**: Add comments, collections, notifications
5. **Deploy**: Build and submit to App Store and Google Play

## Performance Tips

- Minimize re-renders using `useMemo` and `useCallback`
- Lazy load images using `react-native-fast-image`
- Implement pagination for large lists
- Use FlatList with proper key extraction

## Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/)

## Support & Community

- **Expo Community**: [Discord](https://discord.gg/4gtbUxM)
- **React Native**: [GitHub Discussions](https://github.com/facebook/react-native/discussions)

---

Happy coding! 💭
