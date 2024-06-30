import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { GameProvider } from './GameContext';
import EarningsScreen from './screens/EarningsScreen';
import BusinessScreen from './screens/BusinessScreen';
import InvestingScreen from './screens/InvestingScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShopScreen from './screens/ShopScreen';
import { Ionicons } from '@expo/vector-icons';
import HouseListScreen from './screens/HouseListScreen';
import CarListScreen from './screens/CarListScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ShopStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Shop" component={ShopScreen} />
    <Stack.Screen name="CarList" component={CarListScreen} />
    <Stack.Screen name="HouseList" component={HouseListScreen} />
  </Stack.Navigator>
);

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
              } else if (route.name === 'Shop') {
                iconName = 'bag';
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
          <Tab.Screen name="Shop" component={ShopStack} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}
