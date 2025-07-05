import React, { createContext, useContext, useState } from 'react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  maxDataSources: number;
  maxKPIs: number;
}

interface SubscriptionContextType {
  currentPlan: SubscriptionPlan | null;
  isLoading: boolean;
  plans: SubscriptionPlan[];
  hasFeature: (feature: string) => boolean;
  canAccessKPI: (kpiCount: number) => boolean;
  canAccessDataSource: (sourceCount: number) => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'monthly',
    features: ['Basic KPIs', 'Excel Import', 'Basic Charts'],
    maxDataSources: 1,
    maxKPIs: 3,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    interval: 'monthly',
    features: ['Advanced KPIs', 'Multiple Data Sources', 'Advanced Charts'],
    maxDataSources: 5,
    maxKPIs: 20,
  }
];

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPlan] = useState<SubscriptionPlan>(subscriptionPlans[0]); // Default to free
  const [isLoading] = useState(false);

  const hasFeature = (feature: string): boolean => {
    return currentPlan?.features.includes(feature) || false;
  };

  const canAccessKPI = (kpiCount: number): boolean => {
    if (!currentPlan) return false;
    if (currentPlan.maxKPIs === -1) return true;
    return kpiCount <= currentPlan.maxKPIs;
  };

  const canAccessDataSource = (sourceCount: number): boolean => {
    if (!currentPlan) return false;
    if (currentPlan.maxDataSources === -1) return true;
    return sourceCount <= currentPlan.maxDataSources;
  };

  const value: SubscriptionContextType = {
    currentPlan,
    isLoading,
    plans: subscriptionPlans,
    hasFeature,
    canAccessKPI,
    canAccessDataSource
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}; 