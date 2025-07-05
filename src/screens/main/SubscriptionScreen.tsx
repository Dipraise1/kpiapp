import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Title, Paragraph, Button, List, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../contexts/SubscriptionContext';

const SubscriptionScreen = () => {
  const { user } = useAuth();
  const { currentPlan, plans } = useSubscription();

  const handleSubscribe = (planId: string) => {
    if (planId === 'free') {
      Alert.alert('Info', 'You are already on the free plan!');
      return;
    }
    
    // In a real app, this would integrate with payment processing
    Alert.alert(
      'Upgrade Plan',
      `This demo shows the UI structure. In a real app, this would integrate with payment processing for the ${planId} plan.`,
      [{ text: 'OK' }]
    );
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'basic kpis':
        return 'assessment';
      case 'excel import':
        return 'file-upload';
      case 'basic charts':
        return 'insert-chart';
      case 'advanced kpis':
        return 'analytics';
      case 'multiple data sources':
        return 'storage';
      case 'advanced charts':
        return 'multiline-chart';
      default:
        return 'check-circle';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Subscription</Text>
        <Text style={styles.subtitle}>Choose the plan that fits your needs</Text>
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.currentPlanCard}>
          <Card.Content>
            <View style={styles.currentPlanHeader}>
              <MaterialIcons name="star" size={24} color="#FF9800" />
              <Title style={styles.currentPlanTitle}>Current Plan</Title>
            </View>
            <Text style={styles.currentPlanName}>{currentPlan?.name}</Text>
            <Text style={styles.currentPlanPrice}>
              {currentPlan?.price === 0 ? 'Free' : `$${currentPlan?.price}/month`}
            </Text>
            <Paragraph style={styles.currentPlanDescription}>
              {currentPlan?.maxKPIs === -1 ? 'Unlimited' : currentPlan?.maxKPIs} KPIs • {' '}
              {currentPlan?.maxDataSources === -1 ? 'Unlimited' : currentPlan?.maxDataSources} Data Sources
            </Paragraph>
          </Card.Content>
        </Card>

        <Text style={styles.sectionTitle}>Available Plans</Text>

        {plans.map((plan) => {
          const isCurrentPlan = currentPlan?.id === plan.id;
          
          return (
            <Card key={plan.id} style={[
              styles.planCard,
              isCurrentPlan && styles.currentPlanBorder
            ]}>
              <Card.Content>
                <View style={styles.planHeader}>
                  <View style={styles.planInfo}>
                    <Title style={styles.planName}>{plan.name}</Title>
                    <Text style={styles.planPrice}>
                      {plan.price === 0 ? 'Free' : `$${plan.price}`}
                      {plan.price > 0 && <Text style={styles.planInterval}>/{plan.interval}</Text>}
                    </Text>
                  </View>
                  {isCurrentPlan && (
                    <View style={styles.currentBadge}>
                      <Text style={styles.currentBadgeText}>Current</Text>
                    </View>
                  )}
                </View>

                <Divider style={styles.divider} />

                <View style={styles.planLimits}>
                  <View style={styles.limitItem}>
                    <MaterialIcons name="assessment" size={20} color="#666" />
                    <Text style={styles.limitText}>
                      {plan.maxKPIs === -1 ? 'Unlimited' : plan.maxKPIs} KPIs
                    </Text>
                  </View>
                  <View style={styles.limitItem}>
                    <MaterialIcons name="storage" size={20} color="#666" />
                    <Text style={styles.limitText}>
                      {plan.maxDataSources === -1 ? 'Unlimited' : plan.maxDataSources} Data Sources
                    </Text>
                  </View>
                </View>

                <View style={styles.featuresContainer}>
                  <Text style={styles.featuresTitle}>Features:</Text>
                  {plan.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <MaterialIcons
                        name={getFeatureIcon(feature)}
                        size={16}
                        color="#4CAF50"
                      />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                {!isCurrentPlan && (
                  <Button
                    mode="contained"
                    onPress={() => handleSubscribe(plan.id)}
                    style={[
                      styles.subscribeButton,
                      plan.id === 'premium' && styles.premiumButton
                    ]}
                  >
                    {plan.price === 0 ? 'Downgrade to Free' : 'Upgrade'}
                  </Button>
                )}
              </Card.Content>
            </Card>
          );
        })}

        <Card style={styles.infoCard}>
          <Card.Content>
            <Title>Need Help?</Title>
            <Paragraph>
              Contact our support team if you have questions about subscription plans or need help choosing the right plan for your needs.
            </Paragraph>
            <Button
              mode="outlined"
              onPress={() => Alert.alert('Support', 'Support contact feature coming soon!')}
              style={styles.supportButton}
              icon="help-circle"
            >
              Contact Support
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
  currentPlanCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#E8F5E8',
    elevation: 2,
  },
  currentPlanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentPlanTitle: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  currentPlanName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  currentPlanPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  currentPlanDescription: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  planCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  currentPlanBorder: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  planInterval: {
    fontSize: 16,
    color: '#666',
  },
  currentBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    marginVertical: 16,
  },
  planLimits: {
    marginBottom: 16,
  },
  limitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  limitText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  subscribeButton: {
    marginTop: 8,
  },
  premiumButton: {
    backgroundColor: '#FF9800',
  },
  infoCard: {
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
  },
  supportButton: {
    marginTop: 12,
  },
});

export default SubscriptionScreen; 