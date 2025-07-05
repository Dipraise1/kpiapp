import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Title, Paragraph, FAB, IconButton, ProgressBar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useSubscription } from '../../contexts/SubscriptionContext';

const DashboardScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const { kpis, isLoading, refreshData } = useData();
  const { currentPlan, canAccessKPI } = useSubscription();

  useEffect(() => {
    refreshData();
  }, []);

  const formatValue = (value: number, unit: string) => {
    if (unit === '$') {
      return `$${value.toLocaleString()}`;
    }
    if (unit === '%') {
      return `${value}%`;
    }
    if (unit === 'visits') {
      return `${value.toLocaleString()} visits`;
    }
    return `${value.toLocaleString()}${unit}`;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <MaterialIcons name="trending-up" size={24} color="#4CAF50" />;
      case 'down':
        return <MaterialIcons name="trending-down" size={24} color="#F44336" />;
      default:
        return <MaterialIcons name="trending-flat" size={24} color="#9E9E9E" />;
    }
  };

  const getChangePercentage = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const getTargetProgress = (current: number, target?: number) => {
    if (!target) return 0;
    return Math.min((current / target), 1);
  };

  // Filter KPIs based on subscription limits
  const visibleKPIs = kpis.filter((_, index) => canAccessKPI(index + 1));
  const hiddenKPIsCount = kpis.length - visibleKPIs.length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back, {user?.name}!</Text>
          <Text style={styles.subtitle}>
            {currentPlan?.name} Plan • {visibleKPIs.length} of {kpis.length} KPIs
          </Text>
        </View>
        <IconButton
          icon="refresh"
          size={24}
          onPress={refreshData}
          disabled={isLoading}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refreshData} />
        }
      >
        <View style={styles.kpiGrid}>
          {visibleKPIs.map((kpi) => (
            <Card
              key={kpi.id}
              style={styles.kpiCard}
              onPress={() => navigation.navigate('KPIDetail', { kpi })}
            >
              <Card.Content>
                <View style={styles.kpiHeader}>
                  <Text style={styles.kpiCategory}>{kpi.category}</Text>
                  {getTrendIcon(kpi.trend)}
                </View>
                <Title style={styles.kpiValue}>
                  {formatValue(kpi.value, kpi.unit)}
                </Title>
                <Paragraph style={styles.kpiName}>{kpi.name}</Paragraph>
                
                {kpi.target && (
                  <View style={styles.targetSection}>
                    <View style={styles.targetHeader}>
                      <Text style={styles.targetLabel}>Target: {formatValue(kpi.target, kpi.unit)}</Text>
                      <Text style={styles.targetPercentage}>
                        {(getTargetProgress(kpi.value, kpi.target) * 100).toFixed(0)}%
                      </Text>
                    </View>
                    <ProgressBar
                      progress={getTargetProgress(kpi.value, kpi.target)}
                      color={kpi.value >= kpi.target ? '#4CAF50' : '#FF9800'}
                      style={styles.progressBar}
                    />
                  </View>
                )}
                
                <View style={styles.kpiChange}>
                  <Text
                    style={[
                      styles.changeText,
                      {
                        color: kpi.trend === 'up' ? '#4CAF50' : 
                               kpi.trend === 'down' ? '#F44336' : '#9E9E9E'
                      }
                    ]}
                  >
                    {kpi.trend === 'up' ? '+' : kpi.trend === 'down' ? '-' : ''}
                    {getChangePercentage(kpi.value, kpi.previousValue)}%
                  </Text>
                  <Text style={styles.changeLabel}>vs previous</Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {hiddenKPIsCount > 0 && (
          <Card style={styles.upgradeCard}>
            <Card.Content>
              <View style={styles.upgradeHeader}>
                <MaterialIcons name="lock" size={24} color="#FF9800" />
                <Title style={styles.upgradeTitle}>
                  {hiddenKPIsCount} More KPI{hiddenKPIsCount > 1 ? 's' : ''} Available
                </Title>
              </View>
              <Paragraph style={styles.upgradeDescription}>
                You've reached the limit of {currentPlan?.maxKPIs} KPIs for your {currentPlan?.name} plan.
                Upgrade to unlock {hiddenKPIsCount} more KPI{hiddenKPIsCount > 1 ? 's' : ''}.
              </Paragraph>
              <View style={styles.upgradeActions}>
                <FAB
                  icon="star"
                  label="Upgrade Plan"
                  onPress={() => navigation.navigate('Subscription')}
                  style={styles.upgradeFab}
                />
              </View>
            </Card.Content>
          </Card>
        )}

        <Card style={styles.summaryCard}>
          <Card.Content>
            <Title>Performance Summary</Title>
            <View style={styles.summaryStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{visibleKPIs.filter(kpi => kpi.trend === 'up').length}</Text>
                <Text style={styles.statLabel}>Improving</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{visibleKPIs.filter(kpi => kpi.trend === 'down').length}</Text>
                <Text style={styles.statLabel}>Declining</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{visibleKPIs.filter(kpi => kpi.trend === 'stable').length}</Text>
                <Text style={styles.statLabel}>Stable</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {visibleKPIs.filter(kpi => kpi.target && kpi.value >= kpi.target).length}
                </Text>
                <Text style={styles.statLabel}>On Target</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        icon="plus"
        label="Add KPI"
        onPress={() => navigation.navigate('Data Sources')}
        style={styles.fab}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  kpiGrid: {
    padding: 16,
  },
  kpiCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiCategory: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  kpiValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  kpiName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  targetSection: {
    marginBottom: 8,
  },
  targetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  targetLabel: {
    fontSize: 12,
    color: '#666',
  },
  targetPercentage: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  kpiChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  changeLabel: {
    fontSize: 12,
    color: '#999',
  },
  upgradeCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#FFF3E0',
    elevation: 2,
  },
  upgradeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  upgradeTitle: {
    marginLeft: 8,
    fontSize: 18,
    color: '#333',
  },
  upgradeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  upgradeActions: {
    marginTop: 16,
    alignItems: 'flex-start',
  },
  upgradeFab: {
    backgroundColor: '#FF9800',
  },
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EE',
  },
});

export default DashboardScreen; 