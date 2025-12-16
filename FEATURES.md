# Quotle - Feature Guide

## 📱 App Overview

Quotle is a modern social media platform dedicated to sharing and discovering inspiring quotes. Users can explore quotes from the Goodreads database, create their own quotes, and interact with a community of quote enthusiasts.

---

## 🎯 Core Features

### 1. Home Screen 🏠
**Your personalized quote feed**

**Features:**
- View your top 5 saved quotes at a glance
- Discover new quotes from the Goodreads API
- Each quote displays:
  - Full quote text
  - Author name (clickable to view author profile)
  - Like count
  - Share count
- Pull-to-refresh to get new quotes
- Tap any quote to view full details

**How to Use:**
1. Open the app - you'll see your saved top quotes first
2. Scroll down to see discovered quotes
3. Tap "Load More Quotes" to refresh the discovery feed
4. Tap any quote for more details (like, share, view creator)
5. Tap author name to see their profile and quotes

**Pro Tips:**
- Your top quotes are automatically sorted by engagement
- Discovery quotes rotate from Goodreads API
- Likes are saved locally on your device

---

### 2. Search 🔍
**Find quotes and authors instantly**

**Features:**
- Real-time search as you type
- Three filter options:
  - **All**: Search both Goodreads and your local quotes
  - **Goodreads**: Only search the Goodreads API
  - **My Quotes**: Only search your created quotes
- Results show:
  - Quote text
  - Author name
  - Engagement stats
  - Source indication

**How to Use:**
1. Navigate to the Search tab
2. Enter a keyword or author name
3. Results appear in real-time
4. Use filter tabs to narrow results:
   - Filter for quotes about "motivation"
   - Filter for author "Maya Angelou"
   - Filter for "My Quotes" to see only your creations
5. Tap any result to view details

**Pro Tips:**
- Search is case-insensitive
- Try searching for both quote text and author names
- Use "My Quotes" filter to organize your creations
- Searching for author names finds all their quotes

**Examples:**
- Search: "success" → Filter: "All" → See all success quotes
- Search: "Maya Angelou" → See all quotes by this author
- Search: "strength" → Filter: "My Quotes" → Find your strength-themed quotes

---

### 3. Create Quote ✍️
**Share your wisdom with the world**

**Features:**
- Clean, intuitive form with two fields:
  - Quote text (10-500 characters)
  - Author name (required)
- Real-time character counter
- Smart quote validation:
  - Prevents duplicate quotes (70% similarity detection)
  - Shows similar existing quotes if found
  - Option to override and publish anyway
- Form validation with clear error messages

**How to Use:**
1. Navigate to the Create tab
2. Enter your quote (min 10, max 500 characters)
3. Enter the author's name
4. Tap "Publish Quote"
5. If similar quotes exist:
   - Review the suggested quotes
   - Choose "Start Over" to revise, or
   - Choose "Publish Anyway" to proceed
6. Success! Your quote is now live

**Validation Rules:**
- Quote: Must be 10-500 characters
- Author: Must be 2+ characters
- Both fields are required

**Similarity Checking:**
- Uses Levenshtein distance algorithm
- Triggers at >70% similarity
- Prevents near-duplicate submissions
- Shows suggestions before publishing

**Pro Tips:**
- Use quotes you find meaningful
- Always credit the correct author
- Be specific with attribution
- Check character count before publishing

**Examples:**
- ✅ "The only way to do great work is to love what you do." ~Steve Jobs
- ❌ Quote too short or long
- ⚠️ Similar quote exists → Review and decide

---

### 4. Profile 👤
**Your quote presence**

**Features:**
- Profile header with your information:
  - Display name
  - Personal bio
  - Stats (total quotes, likes, followers, following)
- View all your created quotes
- Quick action buttons:
  - "+ Create" - Jump to create quote screen
  - "📤 Share" - Share your profile
- Sort quotes by creation date

**How to Use:**
1. Navigate to the Profile tab
2. View your profile stats
3. Scroll to see all your created quotes
4. Tap any quote to view and manage it
5. Use "+ Create" button to make new quotes
6. Use "📤 Share" to share your profile with others

**Your Profile Stats:**
- **Quotes**: Total quotes you've created
- **Likes**: Total likes your quotes received
- **Followers**: Users following your profile
- **Following**: Profiles you're following

**Pro Tips:**
- Edit your bio to reflect your interests
- Monitor your stats to see popular quotes
- Share your profile to grow your audience
- Use the "+ Create" quick access regularly

---

### 5. Leaderboard 🏆
**Discover top contributors**

**Features:**
- Three ranking categories (switchable via tabs):
  - **Likes**: Users with most-liked quotes
  - **Quotes**: Most prolific quote creators
  - **Followers**: Most followed users
- Rank badge showing position (#1, #2, etc.)
- User card displaying:
  - User name
  - Bio
  - Ranking stat
- Tap any user to view their profile

**How to Use:**
1. Navigate to the Leaderboard (Trending) tab
2. View default "Likes" leaderboard
3. Switch tabs to see other rankings:
   - Tap "❤️ Likes" for most-liked quotes
   - Tap "📝 Quotes" for most quotes created
   - Tap "👥 Followers" for most followers
4. Tap any user card to view their profile
5. On their profile, you can:
   - Follow/unfollow them
   - View all their quotes
   - Like their quotes
   - Share their profile

**Understanding Rankings:**
- Rankings update in real-time
- Position updates as likes/quotes increase
- Each tab shows independent rankings
- Your position shown in all rankings

**Pro Tips:**
- Follow top creators for inspiration
- Create high-quality quotes to climb rankings
- Engage with others to grow your followers
- Study top quotes in "Likes" ranking

---

### 6. Quote Detail 💬
**Deep dive into any quote**

**Accessing Quote Detail:**
- Tap any quote from Home, Search, or Profile
- View comprehensive quote information

**Features on Quote Detail Screen:**
- Large, readable quote text
- Author name (clickable to view author profile)
- Engagement statistics:
  - Total likes
  - Total shares
  - Creation date
- Action buttons:
  - ❤️ Like/Unlike
  - 📤 Share quote
- Creator information (for user-created quotes)

**Interactions:**
- **Like Button**:
  - Click to like/unlike
  - Button color changes when liked
  - Like counter updates immediately
  - Your like is saved permanently
  
- **Share Button**:
  - On iOS: Opens native share sheet
  - On Android: Opens native share options
  - Fallback: Copy to clipboard
  - Includes "From Quotle 💭" attribution

**How to Use:**
1. Tap any quote from any screen
2. Read the full quote and author info
3. View engagement stats
4. Like the quote if you enjoy it
5. Share with others via native sharing
6. Click author name to see their profile

**Pro Tips:**
- Like quotes to build your personal collection
- Share quotes to spread inspiration
- Follow quote creators you admire
- Check the creator's other quotes

---

### 7. User Profile 👥
**View other users' contributions**

**Accessing User Profiles:**
- Tap author name from any quote
- Tap user from Leaderboard
- Tap creator name from quote detail

**Features:**
- User information:
  - Display name
  - Bio/description
  - Stats (quotes, likes, followers, following)
- Follow/Unfollow button
- All their created/shared quotes
- Full quote interaction available

**How to Use:**
1. Tap a user's name from any screen
2. View their profile information
3. See their follower/following counts
4. Follow them with the "Follow" button
5. Browse all their quotes
6. Like and share their quotes
7. Tap back to return to previous screen

**Profile Insights:**
- See what topics they focus on
- View their most popular quotes
- Check their engagement level
- Decide if you want to follow them

**Pro Tips:**
- Follow inspirational creators
- Engage with their quotes
- Share your favorites
- Build your network of quote lovers

---

## 🎨 UI/UX Design Highlights

### Color Scheme
- **Primary Purple**: #7c3aed (main actions, highlights)
- **Light Gray**: #f3f4f6 (backgrounds, cards)
- **Dark Gray**: #1f2937 (text, headers)
- **Neutral Gray**: #6b7280 (secondary text)
- **Light Red**: #fef2f2 (like button background)

### Typography
- **Font Family**: DM Sans (modern, clean, readable)
- **Headers**: Bold weight (700), larger sizes
- **Body Text**: Regular weight (400), optimized line height

### Interaction Patterns
- **Tap Feedback**: Visual feedback on all interactive elements
- **Smooth Scrolling**: Fluid list interactions
- **Pull-to-Refresh**: Standard mobile pattern on home
- **Modal Overlays**: For important confirmations
- **Toast Notifications**: Feedback for actions

---

## 🔄 Common Workflows

### Workflow 1: Discover & Engage
```
Home → Load More Quotes → View Quote → Like/Share → Follow Creator → Done
```

### Workflow 2: Search & Learn
```
Search Tab → Search Author → View Results → Tap Quote → Read Details → Follow User
```

### Workflow 3: Create & Share
```
Create Tab → Write Quote → Check Similarity → Publish → View on Profile → Share
```

### Workflow 4: Explore Community
```
Leaderboard → Change Tab → Tap User → View Quotes → Like Favorites → Follow
```

---

## 📊 Data You Can Track

### Personal Stats
- Your total quotes created
- Total likes received on your quotes
- Number of followers
- Number of profiles you follow

### Engagement Metrics
- Individual quote likes
- Individual quote shares
- Most popular quote
- Trending topics

### Community Insights
- Top users overall
- Trending quotes
- Popular authors
- Most-liked topics

---

## 💡 Tips for Maximum Enjoyment

### For Quote Lovers
1. Follow creators whose style you like
2. Like quotes that resonate with you
3. Share quotes that inspire others
4. Build collections of related quotes
5. Discover new authors through leaderboards

### For Quote Creators
1. Create original, thoughtful quotes
2. Always credit quoted authors correctly
3. Engage with the community
4. Share your quotes to gain followers
5. Study high-performing quotes
6. Be consistent with posting
7. Respond to followers who like your quotes

### For Community Building
1. Follow diverse creators
2. Like and share regularly
3. Participate in trending topics
4. Be respectful and positive
5. Build genuine connections
6. Support fellow quote enthusiasts

---

## ⚙️ Settings & Customization

### Current Customization
- Follow/unfollow users
- Like/unlike quotes (automatically saved)
- Choose which quotes to share

### Future Features (Coming Soon)
- Dark mode
- Theme customization
- Notification preferences
- Content filtering
- Quote categories

---

## 🔐 Privacy & Data

### Your Data
- All data stored locally on your device
- No data sent to external servers
- No personal information shared
- Your likes are private to you
- Profile info only shows what you set

### What Others See
- Your public profile name
- Your bio (if set)
- Your quote creations
- Your public engagement
- Your follower count

---

## 🆘 Troubleshooting

### Quote Not Publishing
- Check quote length (10-500 characters)
- Check author field is filled
- Similar quote may exist - review suggestions
- Try different wording if too similar

### Search Not Working
- Check internet connection for Goodreads API
- Ensure search term is entered
- Try fewer keywords
- Wait a moment and retry

### App Running Slow
- Close and reopen app
- Clear app cache (in iOS/Android settings)
- Delete old quotes (storage limit)
- Restart your device

### Likes Not Saving
- Ensure app is fully closed before reopening
- Check device storage space
- Try again after closing other apps
- Check device settings allow app storage

---

## 📈 Quotle Growth Tips

### Content Strategy
- Create quotes that spark discussion
- Focus on universal themes
- Share daily for consistency
- Engage with your audience
- Collaborate with other creators

### Community Engagement
- Like and share others' quotes
- Follow creators in your niche
- Participate in trending topics
- Comment meaningfully
- Build relationships

### Quality Focus
- Write original, authentic quotes
- Proper attribution
- Clear, concise language
- Meaningful messages
- Unique perspective

---

## 🎓 Learning Resources

### Inspiration Sources
- [Goodreads Quotes](https://www.goodreads.com/quotes)
- [Famous Quotes](https://www.brainyquote.com/)
- [Author Bios](https://en.wikipedia.org/)
- [Quote Databases](https://quotable.io/)

### Quote Writing Tips
- Be authentic
- Use vivid language
- Include emotion
- Make it memorable
- Keep it concise

---

## 🚀 Your Quotle Journey

**Day 1**: Install, explore Home, check out Leaderboard
**Day 2**: Search for favorite authors, follow inspirational users
**Day 3**: Create your first quote
**Week 1**: Create 5 quotes, follow 10 users, like daily quotes
**Month 1**: 20+ quotes, active community member, growing followers

---

**Remember**: Quotle is about sharing wisdom, building community, and inspiring others. Enjoy your journey! 💭✨

---

*Last Updated: December 2024*
*For support or feature requests, open an issue on GitHub*
