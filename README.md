# KPI Dashboard - React Native App

A subscription-based KPI dashboard mobile application that allows users to import Excel data and track key performance indicators with beautiful charts and analytics.

## Features

### Free Plan
- Import Excel files
- Track up to 3 KPIs
- Basic charts
- 1 data source

### Premium Plan ($9.99/month)
- Advanced KPI tracking (up to 20 KPIs)
- Multiple data sources (up to 5)
- Advanced charts and analytics
- Data export functionality

### Enterprise Plan ($29.99/month)
- Unlimited KPIs and data sources
- All chart types
- Priority support
- Advanced analytics

## Core Features

- **Excel Import**: Upload and process Excel files to automatically generate KPIs
- **Real-time Dashboard**: Beautiful dashboard with KPI cards and trend indicators
- **Interactive Charts**: Line charts, bar charts, and trend visualizations
- **Subscription Management**: Built-in subscription system with different tiers
- **Biometric Authentication**: Touch ID/Face ID support for secure access
- **Data Export**: Export your KPI data (Premium feature)
- **Responsive Design**: Optimized for both iOS and Android

## Technology Stack

- **Frontend**: React Native with Expo
- **UI Components**: React Native Paper
- **Charts**: React Native Chart Kit
- **Navigation**: React Navigation
- **Authentication**: Expo Local Authentication
- **Data Storage**: Expo Secure Store + AsyncStorage
- **Excel Processing**: SheetJS (xlsx)
- **Icons**: Expo Vector Icons

## Installation

### Prerequisites

- Node.js 16+ 
- Expo CLI
- iOS Simulator or Android Emulator (for development)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd kpi-dashboard-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Run on device/simulator**
```bash
# For iOS
npm run ios

# For Android
npm run android

# For web
npm run web
```

## Usage

### Getting Started

1. **Login/Register**: Create an account or login with existing credentials
2. **Import Data**: Use the FAB (floating action button) to import Excel files
3. **View KPIs**: Browse your generated KPIs on the dashboard
4. **Explore Details**: Tap on any KPI to view detailed information and charts
5. **Manage Subscription**: Visit the subscription tab to upgrade your plan

### Excel File Format

The app automatically detects numeric columns in your Excel files and generates KPIs. For best results:

- Use clear column headers
- Ensure numeric data is properly formatted
- Include multiple rows for trend analysis

## Project Structure

```
src/
├── contexts/          # React contexts for state management
│   ├── AuthContext.tsx
│   ├── SubscriptionContext.tsx
│   └── DataContext.tsx
├── navigation/        # Navigation setup
│   └── AppNavigator.tsx
├── screens/          # Screen components
│   ├── auth/         # Authentication screens
│   │   ├── LoginScreen.tsx
│   │   └── RegisterScreen.tsx
│   └── main/         # Main app screens
│       ├── DashboardScreen.tsx
│       ├── KPIDetailScreen.tsx
│       ├── DataSourceScreen.tsx
│       ├── SubscriptionScreen.tsx
│       └── SettingsScreen.tsx
└── theme/            # Theme configuration
    └── theme.ts
```

## Key Components

### Authentication System
- Secure login/registration
- Biometric authentication support
- Session management with Expo Secure Store

### Data Management
- Excel file parsing with SheetJS
- Automatic KPI generation
- Local data storage with AsyncStorage
- Data refresh and synchronization

### Subscription System
- Three-tier subscription model
- Feature gating based on plan
- Mock subscription management (ready for real payment integration)

### Charts & Analytics
- Interactive line charts
- Trend indicators
- Historical data visualization
- Responsive chart sizing

## Development

### Adding New Features

1. **New KPI Types**: Extend the `KPIData` interface in `DataContext.tsx`
2. **Chart Types**: Add new chart components in screen files
3. **Subscription Features**: Update feature flags in `SubscriptionContext.tsx`
4. **New Screens**: Add to navigation in `AppNavigator.tsx`

### Testing

```bash
# Run tests (when implemented)
npm test

# Type checking
npx tsc --noEmit
```

## Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## License

MIT License - see LICENSE file for details

## Support

For support, email support@kpidashboard.com or visit our help center.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request # kpiapp
