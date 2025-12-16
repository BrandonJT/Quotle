# ✅ Quotle iOS Dev Server - Solution

## Problem Solved
You were getting two errors when trying to run the Quotle app on iOS:

1. **"EMFILE: too many open files"** - Metro bundler file watching limit exceeded
2. **"PlatformConstants could not be found"** - Native modules not in Expo Go binary

## Solutions Applied

### 1. Downgraded from SDK 54 to SDK 51
- SDK 54 had compatibility issues with the iOS native build system
- SDK 51 works reliably with React Native 0.74.5

### 2. Generated iOS Native Development Build
Ran `expo prebuild --platform ios` then `expo run:ios` to:
- Create native iOS app with all React Native modules compiled in
- Replaced Expo Go (which was missing native modules) with a proper dev build
- Fixed the TurboModuleRegistry/PlatformConstants error

### 3. Disabled Watchman File Watcher
Metro's `watchman` was watching too many files and hitting the OS file descriptor limit.

## How to Run

```bash
# Start the dev server with watchman disabled
cd /Users/brandontedesco/Documents/Code/Personal/Quotle
USE_WATCHMAN=0 npx expo start --dev-client

# The app should open automatically on the simulator
# If not, press 'i' to open iOS simulator
```

## Permanent Setup

To avoid typing `USE_WATCHMAN=0` every time, add this alias to your `~/.zshrc`:

```bash
echo 'alias quotle-dev="cd /Users/brandontedesco/Documents/Code/Personal/Quotle && USE_WATCHMAN=0 npx expo start --dev-client"' >> ~/.zshrc
source ~/.zshrc

# Then use: quotle-dev
```

## What Changed in Your Project

1. **package.json** - Pinned to SDK 51 with compatible dependency versions
2. **ios/** - New native iOS project generated (can be version controlled if needed)
3. **metro.config.js** - Updated with proper Metro configuration

## Testing the App

Once the dev server is running and connected to your iOS simulator:
- The app should display the Quotle UI
- Hot reload works with `R` key
- All React Navigation screens should work
- No more TurboModule errors

## If It Breaks Again

If you get EMFILE again:
- Make sure `USE_WATCHMAN=0` is set
- Try: `npm cache clean --force && rm -rf .expo node_modules && npm install`
- Last resort: `npx expo prebuild --platform ios --clean && expo run:ios`

## File Descriptor Limit Notes

The system file descriptor limit is around 256. That's why Metro fails without watchman disabled.
If you want to increase it permanently on macOS, see `/Library/LaunchDaemons/limit.maxfiles.plist` (may require admin privileges).
