import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GameProvider } from './GameContext';
import EarningsScreen from './screens/EarningsScreen';
import BusinessScreen from './screens/BusinessScreen';
import InvestingScreen from './screens/InvestingScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Earnings" component={EarningsScreen} />
          <Tab.Screen name="Business" component={BusinessScreen} />
          <Tab.Screen name="Investing" component={InvestingScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}
