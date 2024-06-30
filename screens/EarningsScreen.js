// screens/EarningsScreen.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useGameContext } from '../GameContext';

const windowHeight = Dimensions.get('window').height;

export default function EarningsScreen() {
  const {
    balance,
    increaseBalance,
    calculateClickValue,
    calculateTotalEarningsPerMinute,
  } = useGameContext();

  const clickValue = calculateClickValue();

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Earnings</Text>
        <Text style={styles.balance}>
          Balance: ${balance.toFixed(2)}
        </Text>
        <Text style={styles.hourlyEarnings}>
          Earnings per minute: $
          {calculateTotalEarningsPerMinute().toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.clickBox}
        onPress={() => increaseBalance(clickValue)}
      >
        <Text style={styles.clickBoxText}>
          Tap to Earn ${clickValue.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ... styles remain the same

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  topSection: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balance: {
    fontSize: 24,
    marginBottom: 10,
  },
  hourlyEarnings: {
    fontSize: 18,
    marginBottom: 20,
  },
  clickBox: {
    backgroundColor: '#4CAF50',
    width: '100%',
    height: windowHeight * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  clickBoxText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
