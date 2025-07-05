import React, { createContext, useContext, useState, useEffect } from 'react';

interface KPIData {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  category: string;
  lastUpdated: Date;
  target?: number;
  historicalData: number[];
}

interface DataSource {
  id: string;
  name: string;
  lastUpdated: Date;
  rowCount: number;
  columnCount: number;
  status: 'active' | 'inactive' | 'processing';
}

interface DataContextType {
  kpis: KPIData[];
  dataSources: DataSource[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  addKPI: (kpi: Omit<KPIData, 'id' | 'lastUpdated' | 'historicalData'>) => void;
  removeKPI: (id: string) => void;
  updateKPI: (id: string, updates: Partial<KPIData>) => void;
  addDataSource: (source: Omit<DataSource, 'id' | 'lastUpdated'>) => void;
  removeDataSource: (id: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const generateHistoricalData = (currentValue: number, length: number = 30): number[] => {
  const data: number[] = [];
  let value = currentValue * 0.8; // Start from 80% of current value
  
  for (let i = 0; i < length; i++) {
    const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
    value = value * (1 + variation);
    data.push(Math.round(value * 100) / 100);
  }
  
  return data;
};

const initialKPIs: KPIData[] = [
  {
    id: '1',
    name: 'Monthly Revenue',
    value: 125000,
    previousValue: 118000,
    unit: '$',
    trend: 'up',
    category: 'Financial',
    lastUpdated: new Date(),
    target: 130000,
    historicalData: generateHistoricalData(125000),
  },
  {
    id: '2',
    name: 'Active Users',
    value: 2850,
    previousValue: 2920,
    unit: '',
    trend: 'down',
    category: 'User Metrics',
    lastUpdated: new Date(),
    target: 3000,
    historicalData: generateHistoricalData(2850),
  },
  {
    id: '3',
    name: 'Conversion Rate',
    value: 3.2,
    previousValue: 3.1,
    unit: '%',
    trend: 'up',
    category: 'Performance',
    lastUpdated: new Date(),
    target: 3.5,
    historicalData: generateHistoricalData(3.2),
  },
  {
    id: '4',
    name: 'Customer Satisfaction',
    value: 4.3,
    previousValue: 4.1,
    unit: '/5',
    trend: 'up',
    category: 'Quality',
    lastUpdated: new Date(),
    target: 4.5,
    historicalData: generateHistoricalData(4.3),
  },
  {
    id: '5',
    name: 'Support Tickets',
    value: 142,
    previousValue: 158,
    unit: '',
    trend: 'down',
    category: 'Operations',
    lastUpdated: new Date(),
    target: 120,
    historicalData: generateHistoricalData(142),
  },
  {
    id: '6',
    name: 'Website Traffic',
    value: 15420,
    previousValue: 14800,
    unit: 'visits',
    trend: 'up',
    category: 'Marketing',
    lastUpdated: new Date(),
    target: 16000,
    historicalData: generateHistoricalData(15420),
  }
];

const initialDataSources: DataSource[] = [
  {
    id: '1',
    name: 'Q4 Sales Data.xlsx',
    lastUpdated: new Date('2024-01-15'),
    rowCount: 250,
    columnCount: 8,
    status: 'active'
  },
  {
    id: '2',
    name: 'User Analytics.xlsx',
    lastUpdated: new Date('2024-01-10'),
    rowCount: 1500,
    columnCount: 12,
    status: 'active'
  },
  {
    id: '3',
    name: 'Financial Report.xlsx',
    lastUpdated: new Date('2024-01-08'),
    rowCount: 89,
    columnCount: 15,
    status: 'inactive'
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [kpis, setKpis] = useState<KPIData[]>(initialKPIs);
  const [dataSources, setDataSources] = useState<DataSource[]>(initialDataSources);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setKpis(currentKpis => 
        currentKpis.map(kpi => {
          const variation = (Math.random() - 0.5) * 0.05; // ±2.5% variation
          const newValue = Math.round(kpi.value * (1 + variation) * 100) / 100;
          const newTrend = newValue > kpi.value ? 'up' : newValue < kpi.value ? 'down' : 'stable';
          
          return {
            ...kpi,
            previousValue: kpi.value,
            value: newValue,
            trend: newTrend,
            lastUpdated: new Date(),
            historicalData: [...kpi.historicalData.slice(1), newValue]
          };
        })
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update all KPIs with slight variations
    setKpis(currentKpis => 
      currentKpis.map(kpi => {
        const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
        const newValue = Math.round(kpi.value * (1 + variation) * 100) / 100;
        const newTrend = newValue > kpi.value ? 'up' : newValue < kpi.value ? 'down' : 'stable';
        
        return {
          ...kpi,
          previousValue: kpi.value,
          value: newValue,
          trend: newTrend,
          lastUpdated: new Date(),
          historicalData: [...kpi.historicalData.slice(1), newValue]
        };
      })
    );
    
    setIsLoading(false);
  };

  const addKPI = (kpiData: Omit<KPIData, 'id' | 'lastUpdated' | 'historicalData'>) => {
    const newKPI: KPIData = {
      ...kpiData,
      id: Date.now().toString(),
      lastUpdated: new Date(),
      historicalData: generateHistoricalData(kpiData.value)
    };
    setKpis(prev => [...prev, newKPI]);
  };

  const removeKPI = (id: string) => {
    setKpis(prev => prev.filter(kpi => kpi.id !== id));
  };

  const updateKPI = (id: string, updates: Partial<KPIData>) => {
    setKpis(prev => 
      prev.map(kpi => 
        kpi.id === id 
          ? { ...kpi, ...updates, lastUpdated: new Date() }
          : kpi
      )
    );
  };

  const addDataSource = (sourceData: Omit<DataSource, 'id' | 'lastUpdated'>) => {
    const newSource: DataSource = {
      ...sourceData,
      id: Date.now().toString(),
      lastUpdated: new Date()
    };
    setDataSources(prev => [...prev, newSource]);
  };

  const removeDataSource = (id: string) => {
    setDataSources(prev => prev.filter(source => source.id !== id));
  };

  const value: DataContextType = {
    kpis,
    dataSources,
    isLoading,
    refreshData,
    addKPI,
    removeKPI,
    updateKPI,
    addDataSource,
    removeDataSource
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}; 