import React from 'react';
import {
  View,
  Text,
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
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 40,
    paddingHorizontal: 32,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
    marginBottom: 24,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
    borderWidth: 3,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatarText: {
    fontSize: 36,
    fontWeight: '600',
    color: '#999',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  profileBio: {
    fontSize: 14,
    color: '#999',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    gap: 32,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
    width: '100%',
    marginVertical: 16,
    marginBottom: 16,
  },
  socialBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
  },
  socialBtnText: {
    fontSize: 24,
  },
  shareBtn: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtnText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
});

export default function ProfileScreen() {
  const user = {
    name: "Brandon Tedesco",
    bio: "Personal Quote",
    avatar: "B",
    likes: 120,
    discovers: 0,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoSymbol}>◆</Text>
          <Text style={styles.logo}>quotle</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>{user.avatar}</Text>
          </View>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileBio}>{user.bio}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Likes</Text>
            <Text style={styles.statValue}>{user.likes}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Discovers</Text>
            <Text style={styles.statValue}>{user.discovers}</Text>
          </View>
        </View>

        <View style={styles.socialLinks}>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>📍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>📷</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>👥</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>🔗</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.shareBtn}>
          <Text style={styles.shareBtnText}>📤 Share</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
