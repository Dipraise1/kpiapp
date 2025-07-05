# 📊 KPI Dashboard App

A comprehensive React Native mobile application for tracking and visualizing Key Performance Indicators (KPIs) with subscription-based features.

## ✨ Features

### 🔐 Authentication
- User login and registration
- Secure authentication flow
- Demo credentials for testing

### 📈 KPI Management
- **6 Sample KPIs** with real-time data
- Interactive KPI cards with trend indicators
- Target tracking with progress bars
- Historical data analysis
- Performance summaries and statistics

### 💰 Subscription Tiers
- **Free Plan**: 3 KPIs, 1 data source
- **Premium Plan**: 20 KPIs, 5 data sources ($9.99/month)
- **Enterprise Plan**: Unlimited KPIs and data sources ($29.99/month)

### 📊 Data Sources
- Excel file import simulation
- Multiple data source management
- Real-time data updates
- Data source analytics

### 🎨 Modern UI/UX
- Material Design components
- Beautiful charts and visualizations
- Responsive design
- Dark/Light theme support

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Dipraise1/kpiapp.git
cd kpiapp
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npx expo start
```

4. **Run on your device**
- Scan the QR code with Expo Go (Android) or Camera app (iOS)

### Demo Login
- **Email**: `demo@example.com`
- **Password**: `password`

## 📱 App Structure

```
src/
├── contexts/           # React contexts for state management
│   ├── AuthContext.tsx
│   ├── DataContext.tsx
│   └── SubscriptionContext.tsx
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── screens/           # All app screens
│   ├── auth/          # Login and registration
│   └── main/          # Main app screens
├── theme/             # Theme configuration
└── components/        # Reusable components
```

## 🔧 Key Features Walkthrough

### Dashboard Screen
- Overview of all accessible KPIs
- Real-time data updates (every 30 seconds)
- Performance summary statistics
- Subscription limits visualization

### KPI Detail Screen
- Comprehensive KPI analysis
- Target performance tracking
- Historical data insights
- 7-day change analysis

### Data Sources Screen
- Manage Excel file imports
- View data source statistics
- Add/remove data sources
- Subscription limit management

### Subscription Screen
- Compare subscription plans
- View current plan details
- Upgrade/downgrade options

## 🏗️ Building APK

### Using EAS Build (Recommended)

1. **Configure EAS**
```bash
npx eas-cli configure
```

2. **Build APK**
```bash
npx eas-cli build --platform android --profile preview
```

### Alternative: Local Build
```bash
npx expo build:android
```

## 🧪 Testing

The app includes comprehensive functionality:

- **Real-time Data**: KPIs update automatically every 30 seconds
- **Interactive Features**: Pull-to-refresh, navigation, alerts
- **Subscription Logic**: Features are locked/unlocked based on plan
- **Data Management**: Add/remove data sources and KPIs

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **UI Library**: React Native Paper (Material Design)
- **Navigation**: React Navigation v6
- **State Management**: React Context API
- **Language**: TypeScript
- **Icons**: Material Icons

## 📊 Sample KPIs Included

1. **Monthly Revenue** - $125,000 (Target: $130,000)
2. **Active Users** - 2,850 (Target: 3,000)
3. **Conversion Rate** - 3.2% (Target: 3.5%)
4. **Customer Satisfaction** - 4.3/5 (Target: 4.5/5)
5. **Support Tickets** - 142 (Target: 120)
6. **Website Traffic** - 15,420 visits (Target: 16,000)

## 🔄 Real-time Features

- **Auto-refresh**: Data updates every 30 seconds
- **Pull-to-refresh**: Manual data refresh
- **Live trends**: Trend indicators update with data
- **Progress tracking**: Target progress updates in real-time

## 🎯 Future Enhancements

- [ ] Excel file parsing integration
- [ ] Push notifications for KPI alerts
- [ ] Advanced analytics and reporting
- [ ] Custom KPI creation
- [ ] Data export functionality
- [ ] Social sharing features

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@kpidashboard.com

---

**Made with ❤️ using React Native and Expo**
