import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import Business from '../components/Business';
import { useGameContext } from '../GameContext';
import { formatNumber } from '../utility/formatNumber';

export default function BusinessScreen() {
  const { balance, businesses, buyBusiness, upgradeBusiness } =
    useGameContext();

  const handleBuyBusiness = (id) => {
    buyBusiness(id);
    Alert.alert(
      'Business Purchased',
      'You have successfully purchased the business!'
    );
  };

  const handleUpgradeBusiness = (id) => {
    upgradeBusiness(id);
    Alert.alert(
      'Business Upgraded',
      'You have successfully upgraded the business!'
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.balance}>
        Balance: ${formatNumber(balance)}
      </Text>
      {businesses.map((business) => (
        <Business
          key={business.id}
          business={business}
          onBuy={() => handleBuyBusiness(business.id)}
          onUpgrade={() => handleUpgradeBusiness(business.id)}
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
