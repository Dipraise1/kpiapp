import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Title, List, Divider, Switch, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../contexts/SubscriptionContext';

const SettingsScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const { currentPlan } = useSubscription();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: () => logout(),
          style: 'destructive',
        },
      ]
    );
  };

  const handleFeatureAlert = (feature: string) => {
    Alert.alert(
      'Coming Soon',
      `${feature} feature will be available in a future update!`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your account and preferences</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Account Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Account</Title>
            <View style={styles.accountInfo}>
              <View style={styles.avatar}>
                <MaterialIcons name="account-circle" size={60} color="#6200EE" />
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user?.name}</Text>
                <Text style={styles.userEmail}>{user?.email}</Text>
                <View style={styles.planBadge}>
                  <MaterialIcons name="star" size={16} color="#FF9800" />
                  <Text style={styles.planText}>{currentPlan?.name} Plan</Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Subscription Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Subscription</Title>
            <List.Item
              title="Current Plan"
              description={`${currentPlan?.name} - ${currentPlan?.price === 0 ? 'Free' : `$${currentPlan?.price}/month`}`}
              left={(props) => <List.Icon {...props} icon="star" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('Subscription')}
            />
            <List.Item
              title="Usage"
              description="View your current usage statistics"
              left={(props) => <List.Icon {...props} icon="chart-bar" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleFeatureAlert('Usage statistics')}
            />
          </Card.Content>
        </Card>

        {/* Data Management Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Data Management</Title>
            <List.Item
              title="Data Sources"
              description="Manage your Excel files and data imports"
              left={(props) => <List.Icon {...props} icon="database" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('Data Sources')}
            />
            <List.Item
              title="Export Data"
              description="Export your KPIs and data"
              left={(props) => <List.Icon {...props} icon="download" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleFeatureAlert('Data export')}
            />
            <List.Item
              title="Clear Cache"
              description="Clear cached data and refresh"
              left={(props) => <List.Icon {...props} icon="cached" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleFeatureAlert('Clear cache')}
            />
          </Card.Content>
        </Card>

        {/* Preferences Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Preferences</Title>
            <List.Item
              title="Notifications"
              description="Manage app notifications"
              left={(props) => <List.Icon {...props} icon="bell" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleFeatureAlert('Notification settings')}
            />
            <List.Item
              title="Auto-refresh"
              description="Automatically refresh data"
              left={(props) => <List.Icon {...props} icon="refresh" />}
              right={() => <Switch value={true} disabled />}
            />
            <List.Item
              title="Dark Mode"
              description="Switch to dark theme"
              left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => <Switch value={false} disabled />}
            />
          </Card.Content>
        </Card>

        {/* Support Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Support</Title>
            <List.Item
              title="Help & FAQ"
              description="Get help and find answers"
              left={(props) => <List.Icon {...props} icon="help-circle" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleFeatureAlert('Help center')}
            />
            <List.Item
              title="Contact Support"
              description="Get in touch with our team"
              left={(props) => <List.Icon {...props} icon="email" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleFeatureAlert('Contact support')}
            />
            <List.Item
              title="App Version"
              description="1.0.0 (Demo)"
              left={(props) => <List.Icon {...props} icon="information" />}
            />
          </Card.Content>
        </Card>

        {/* Logout Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Button
              mode="outlined"
              onPress={handleLogout}
              style={styles.logoutButton}
              icon="logout"
              textColor="#F44336"
            >
              Logout
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  planText: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '600',
    marginLeft: 4,
  },
  logoutButton: {
    marginTop: 8,
    borderColor: '#F44336',
  },
});

export default SettingsScreen; 