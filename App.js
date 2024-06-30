import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GameProvider } from './GameContext';
import EarningsScreen from './screens/EarningsScreen';
import BusinessScreen from './screens/BusinessScreen';
import InvestingScreen from './screens/InvestingScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Earnings') {
                iconName = 'cash';
              } else if (route.name === 'Business') {
                iconName = 'business';
              } else if (route.name === 'Investing') {
                iconName = 'analytics';
              } else if (route.name === 'Profile') {
                iconName = 'person';
              }
              return (
                <Ionicons name={iconName} size={size} color={color} />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Earnings" component={EarningsScreen} />
          <Tab.Screen name="Business" component={BusinessScreen} />
          <Tab.Screen name="Investing" component={InvestingScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}
