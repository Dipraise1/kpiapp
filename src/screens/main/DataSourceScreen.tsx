import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Title, Paragraph, FAB, Button, IconButton, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useData } from '../../contexts/DataContext';
import { useSubscription } from '../../contexts/SubscriptionContext';

const DataSourceScreen = ({ navigation }: any) => {
  const { dataSources, addDataSource, removeDataSource } = useData();
  const { currentPlan, canAccessDataSource } = useSubscription();

  const handleImportExcel = () => {
    if (!canAccessDataSource(dataSources.length + 1)) {
      Alert.alert(
        'Upgrade Required',
        `You've reached the limit of ${currentPlan?.maxDataSources} data sources for your ${currentPlan?.name} plan. Upgrade to add more data sources.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Upgrade', onPress: () => navigation.navigate('Subscription') }
        ]
      );
      return;
    }

    // Simulate Excel import
    Alert.alert(
      'Import Excel File',
      'Choose how to simulate the import:',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Add Sample Data', 
          onPress: () => {
            const sampleFiles = [
              { name: 'Marketing Data.xlsx', rowCount: 500, columnCount: 10, status: 'active' as const },
              { name: 'HR Analytics.xlsx', rowCount: 200, columnCount: 6, status: 'processing' as const },
              { name: 'Customer Survey.xlsx', rowCount: 1200, columnCount: 15, status: 'active' as const },
            ];
            
            const randomFile = sampleFiles[Math.floor(Math.random() * sampleFiles.length)];
            addDataSource(randomFile);
            Alert.alert('Success', `${randomFile.name} imported successfully!`);
          }
        }
      ]
    );
  };

  const handleDeleteDataSource = (id: string, name: string) => {
    Alert.alert(
      'Delete Data Source',
      `Are you sure you want to delete "${name}"? This will also remove any KPIs generated from this data source.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            removeDataSource(id);
            Alert.alert('Deleted', 'Data source removed successfully.');
          }
        }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'processing':
        return '#FF9800';
      case 'inactive':
        return '#9E9E9E';
      default:
        return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return 'check-circle';
      case 'processing':
        return 'sync';
      case 'inactive':
        return 'pause-circle';
      default:
        return 'help-circle';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Data Sources</Text>
          <Text style={styles.subtitle}>
            {dataSources.length} of {currentPlan?.maxDataSources === -1 ? '∞' : currentPlan?.maxDataSources} sources
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {dataSources.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="cloud-upload" size={80} color="#ccc" />
            <Title style={styles.emptyTitle}>No Data Sources</Title>
            <Paragraph style={styles.emptyText}>
              Import your first Excel file to start tracking KPIs
            </Paragraph>
            <Button
              mode="contained"
              onPress={handleImportExcel}
              style={styles.importButton}
              icon="file-excel"
            >
              Import Excel File
            </Button>
          </View>
        ) : (
          <View style={styles.sourcesList}>
            {dataSources.map((source) => (
              <Card key={source.id} style={styles.sourceCard}>
                <Card.Content>
                  <View style={styles.sourceHeader}>
                    <MaterialIcons name="insert-drive-file" size={24} color="#4CAF50" />
                    <View style={styles.sourceInfo}>
                      <Title style={styles.sourceName}>{source.name}</Title>
                      <Paragraph style={styles.sourceStats}>
                        {source.rowCount.toLocaleString()} rows • {source.columnCount} columns
                      </Paragraph>
                    </View>
                    <View style={styles.sourceActions}>
                      <Chip 
                        icon={getStatusIcon(source.status)}
                        style={[styles.statusChip, { backgroundColor: `${getStatusColor(source.status)}20` }]}
                        textStyle={{ color: getStatusColor(source.status) }}
                      >
                        {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                      </Chip>
                      <IconButton
                        icon="delete"
                        size={20}
                        onPress={() => handleDeleteDataSource(source.id, source.name)}
                      />
                    </View>
                  </View>
                  <Text style={styles.lastUpdated}>
                    Last updated: {source.lastUpdated.toLocaleDateString()} at {source.lastUpdated.toLocaleTimeString()}
                  </Text>
                  
                  <View style={styles.sourceMetrics}>
                    <View style={styles.metric}>
                      <MaterialIcons name="storage" size={16} color="#666" />
                      <Text style={styles.metricText}>
                        {(source.rowCount * source.columnCount / 1000).toFixed(1)}k cells
                      </Text>
                    </View>
                    <View style={styles.metric}>
                      <MaterialIcons name="schedule" size={16} color="#666" />
                      <Text style={styles.metricText}>
                        {Math.floor((Date.now() - source.lastUpdated.getTime()) / (1000 * 60 * 60 * 24))} days ago
                      </Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>
        )}

        <Card style={styles.infoCard}>
          <Card.Content>
            <Title>📊 Import Excel Files</Title>
            <Paragraph>
              Upload your Excel files to automatically generate KPIs from your data.
              Supported formats: .xlsx, .xls
            </Paragraph>
            <View style={styles.features}>
              <View style={styles.feature}>
                <MaterialIcons name="auto-fix-high" size={16} color="#4CAF50" />
                <Text style={styles.featureText}>Automatic KPI detection</Text>
              </View>
              <View style={styles.feature}>
                <MaterialIcons name="refresh" size={16} color="#4CAF50" />
                <Text style={styles.featureText}>Real-time data updates</Text>
              </View>
              <View style={styles.feature}>
                <MaterialIcons name="layers" size={16} color="#4CAF50" />
                <Text style={styles.featureText}>Multiple sheet support</Text>
              </View>
              <View style={styles.feature}>
                <MaterialIcons name="trending-up" size={16} color="#4CAF50" />
                <Text style={styles.featureText}>Trend analysis</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.statsCard}>
          <Card.Content>
            <Title>📈 Usage Statistics</Title>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{dataSources.length}</Text>
                <Text style={styles.statLabel}>Data Sources</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {dataSources.reduce((sum, source) => sum + source.rowCount, 0).toLocaleString()}
                </Text>
                <Text style={styles.statLabel}>Total Rows</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{dataSources.filter(s => s.status === 'active').length}</Text>
                <Text style={styles.statLabel}>Active Sources</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {currentPlan?.maxDataSources === -1 ? '∞' : (currentPlan?.maxDataSources || 0) - dataSources.length}
                </Text>
                <Text style={styles.statLabel}>Remaining</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {currentPlan?.maxDataSources !== -1 && 
         dataSources.length >= currentPlan?.maxDataSources && (
          <Card style={styles.limitCard}>
            <Card.Content>
              <View style={styles.limitHeader}>
                <MaterialIcons name="warning" size={24} color="#FF9800" />
                <Title style={styles.limitTitle}>Data Source Limit Reached</Title>
              </View>
              <Paragraph>
                You've reached the limit of {currentPlan?.maxDataSources} data sources for your {currentPlan?.name} plan.
                Upgrade to add more data sources and unlock advanced features.
              </Paragraph>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Subscription')}
                style={styles.upgradeButton}
                icon="star"
              >
                Upgrade Plan
              </Button>
            </Card.Content>
          </Card>
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={handleImportExcel}
        label="Import"
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    marginTop: 16,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 24,
  },
  importButton: {
    marginTop: 16,
  },
  sourcesList: {
    marginBottom: 16,
  },
  sourceCard: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  sourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sourceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  sourceName: {
    fontSize: 16,
    marginBottom: 4,
  },
  sourceStats: {
    fontSize: 12,
    color: '#666',
  },
  sourceActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusChip: {
    marginRight: 8,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  sourceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  infoCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
  },
  features: {
    marginTop: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  statsCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  limitCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#FFF3E0',
  },
  limitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  limitTitle: {
    marginLeft: 8,
    fontSize: 18,
    color: '#333',
  },
  upgradeButton: {
    marginTop: 16,
    backgroundColor: '#FF9800',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EE',
  },
});

export default DataSourceScreen; 