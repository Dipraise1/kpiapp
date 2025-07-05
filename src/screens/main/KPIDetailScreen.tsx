import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, Appbar, Divider, Chip, ProgressBar, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const KPIDetailScreen = ({ route, navigation }: any) => {
  const { kpi } = route.params;

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
        return <MaterialIcons name="trending-up" size={32} color="#4CAF50" />;
      case 'down':
        return <MaterialIcons name="trending-down" size={32} color="#F44336" />;
      default:
        return <MaterialIcons name="trending-flat" size={32} color="#9E9E9E" />;
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

  const getTrendChip = (trend: string) => {
    const colors = {
      up: { bg: '#E8F5E8', text: '#4CAF50' },
      down: { bg: '#FFEBEE', text: '#F44336' },
      stable: { bg: '#F5F5F5', text: '#9E9E9E' }
    };
    
    return (
      <Chip
        icon={trend === 'up' ? 'trending-up' : trend === 'down' ? 'trending-down' : 'trending-flat'}
        style={{ backgroundColor: colors[trend as keyof typeof colors]?.bg }}
        textStyle={{ color: colors[trend as keyof typeof colors]?.text }}
      >
        {trend.charAt(0).toUpperCase() + trend.slice(1)}
      </Chip>
    );
  };

  const getRecentChange = () => {
    if (!kpi.historicalData || kpi.historicalData.length < 2) return null;
    
    const recent = kpi.historicalData.slice(-7); // Last 7 data points
    const weekAgo = recent[0];
    const current = recent[recent.length - 1];
    
    if (weekAgo === 0) return null;
    const weeklyChange = ((current - weekAgo) / weekAgo * 100).toFixed(1);
    
    return {
      value: weeklyChange,
      isPositive: current > weekAgo
    };
  };

  const getPerformanceStatus = () => {
    if (!kpi.target) return null;
    
    const progress = getTargetProgress(kpi.value, kpi.target);
    if (progress >= 1) return { status: 'Achieved', color: '#4CAF50' };
    if (progress >= 0.8) return { status: 'On Track', color: '#FF9800' };
    return { status: 'Below Target', color: '#F44336' };
  };

  const weeklyChange = getRecentChange();
  const performanceStatus = getPerformanceStatus();

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="KPI Details" />
        <Appbar.Action icon="share" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Card style={styles.mainCard}>
          <Card.Content>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Text style={styles.category}>{kpi.category}</Text>
                <Title style={styles.name}>{kpi.name}</Title>
              </View>
              <View style={styles.headerRight}>
                {getTrendIcon(kpi.trend)}
              </View>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.valueSection}>
              <Text style={styles.currentValue}>
                {formatValue(kpi.value, kpi.unit)}
              </Text>
              <Text style={styles.currentLabel}>Current Value</Text>
              {getTrendChip(kpi.trend)}
            </View>

            <View style={styles.comparisonSection}>
              <View style={styles.comparisonItem}>
                <Text style={styles.comparisonValue}>
                  {formatValue(kpi.previousValue, kpi.unit)}
                </Text>
                <Text style={styles.comparisonLabel}>Previous Value</Text>
              </View>
              <View style={styles.comparisonItem}>
                <Text
                  style={[
                    styles.comparisonValue,
                    {
                      color: kpi.trend === 'up' ? '#4CAF50' : 
                             kpi.trend === 'down' ? '#F44336' : '#9E9E9E'
                    }
                  ]}
                >
                  {kpi.trend === 'up' ? '+' : kpi.trend === 'down' ? '-' : ''}
                  {getChangePercentage(kpi.value, kpi.previousValue)}%
                </Text>
                <Text style={styles.comparisonLabel}>Change</Text>
              </View>
              {weeklyChange && (
                <View style={styles.comparisonItem}>
                  <Text
                    style={[
                      styles.comparisonValue,
                      { color: weeklyChange.isPositive ? '#4CAF50' : '#F44336' }
                    ]}
                  >
                    {weeklyChange.isPositive ? '+' : ''}{weeklyChange.value}%
                  </Text>
                  <Text style={styles.comparisonLabel}>7-Day Change</Text>
                </View>
              )}
            </View>
          </Card.Content>
        </Card>

        {kpi.target && (
          <Card style={styles.targetCard}>
            <Card.Content>
              <View style={styles.targetHeader}>
                <Title>🎯 Target Performance</Title>
                {performanceStatus && (
                  <Chip
                    style={{ backgroundColor: `${performanceStatus.color}20` }}
                    textStyle={{ color: performanceStatus.color }}
                  >
                    {performanceStatus.status}
                  </Chip>
                )}
              </View>
              
              <View style={styles.targetProgress}>
                <View style={styles.targetLabels}>
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
                <Text style={styles.targetGap}>
                  {kpi.value >= kpi.target ? 
                    `${formatValue(kpi.value - kpi.target, kpi.unit)} above target` :
                    `${formatValue(kpi.target - kpi.value, kpi.unit)} to reach target`
                  }
                </Text>
              </View>
            </Card.Content>
          </Card>
        )}

        <Card style={styles.detailCard}>
          <Card.Content>
            <Title>📊 Details & Metrics</Title>
            <View style={styles.detailGrid}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Category:</Text>
                <Text style={styles.detailValue}>{kpi.category}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Unit:</Text>
                <Text style={styles.detailValue}>{kpi.unit || 'None'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Last Updated:</Text>
                <Text style={styles.detailValue}>
                  {kpi.lastUpdated.toLocaleDateString()} at {kpi.lastUpdated.toLocaleTimeString()}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Historical Points:</Text>
                <Text style={styles.detailValue}>
                  {kpi.historicalData ? kpi.historicalData.length : 0} data points
                </Text>
              </View>
              {kpi.historicalData && kpi.historicalData.length > 0 && (
                <>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Highest Value:</Text>
                    <Text style={styles.detailValue}>
                      {formatValue(Math.max(...kpi.historicalData), kpi.unit)}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Lowest Value:</Text>
                    <Text style={styles.detailValue}>
                      {formatValue(Math.min(...kpi.historicalData), kpi.unit)}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Average:</Text>
                    <Text style={styles.detailValue}>
                      {formatValue(
                        kpi.historicalData.reduce((a, b) => a + b, 0) / kpi.historicalData.length,
                        kpi.unit
                      )}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.actionsCard}>
          <Card.Content>
            <Title>🔧 Actions</Title>
            <View style={styles.actionButtons}>
              <Button 
                mode="outlined" 
                icon="chart-line" 
                style={styles.actionButton}
                onPress={() => {}}
              >
                View Trends
              </Button>
              <Button 
                mode="outlined" 
                icon="target" 
                style={styles.actionButton}
                onPress={() => {}}
              >
                Set Target
              </Button>
              <Button 
                mode="outlined" 
                icon="download" 
                style={styles.actionButton}
                onPress={() => {}}
              >
                Export Data
              </Button>
              <Button 
                mode="outlined" 
                icon="bell" 
                style={styles.actionButton}
                onPress={() => {}}
              >
                Set Alerts
              </Button>
            </View>
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
  content: {
    flex: 1,
    padding: 16,
  },
  mainCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    marginLeft: 16,
  },
  category: {
    fontSize: 14,
    color: '#666',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  divider: {
    marginVertical: 16,
  },
  valueSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  currentValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 4,
  },
  currentLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  comparisonSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  comparisonItem: {
    alignItems: 'center',
  },
  comparisonValue: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  comparisonLabel: {
    fontSize: 12,
    color: '#666',
  },
  targetCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#F3E5F5',
    elevation: 2,
  },
  targetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  targetProgress: {
    marginTop: 8,
  },
  targetLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  targetLabel: {
    fontSize: 14,
    color: '#666',
  },
  targetPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  targetGap: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  detailCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  detailGrid: {
    marginTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  actionsCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  actionButtons: {
    marginTop: 16,
  },
  actionButton: {
    marginBottom: 8,
  },
});

export default KPIDetailScreen; 