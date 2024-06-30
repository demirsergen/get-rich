import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Business from '../components/Business';
import { useGameContext } from '../GameContext';

export default function BusinessScreen() {
  const { balance, businesses, buyBusiness, upgradeBusiness } =
    useGameContext();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.balance}>
        Balance: ${balance.toFixed(2)}
      </Text>
      {businesses.map((business) => (
        <Business
          key={business.id}
          business={business}
          onBuy={() => buyBusiness(business.id)}
          onUpgrade={() => upgradeBusiness(business.id)}
          canAfford={balance >= business.upgradeCost}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
