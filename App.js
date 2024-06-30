// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import InvestingScreen from './screens/InvestingScreen';
import BusinessScreen from './screens/BusinessScreen';
import EarningsScreen from './screens/EarningsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { GameProvider } from './GameContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Earnings">
          <Tab.Screen name="Earnings" component={EarningsScreen} />
          <Tab.Screen name="Business" component={BusinessScreen} />
          <Tab.Screen name="Investing" component={InvestingScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}
