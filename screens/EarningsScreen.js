import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { useGameContext } from '../GameContext';
import { formatNumber } from '../utility/formatNumber';

const windowHeight = Dimensions.get('window').height;

export default function EarningsScreen() {
  const {
    balance,
    increaseBalance,
    calculateTapValue,
    calculateTotalEarningsPerMinute,
    tapLevel,
    upgradeTap,
    getCurrentTapUpgradeCost,
  } = useGameContext();

  const tapValue = calculateTapValue();
  const tapUpgradeCost = getCurrentTapUpgradeCost();

  const handleTap = () => {
    increaseBalance(tapValue);
    // Adding vibration or animation for feedback can go here
  };

  const handleUpgradeTap = () => {
    if (balance >= tapUpgradeCost) {
      upgradeTap();
    } else {
      Alert.alert(
        'Insufficient Balance',
        'You need more money to upgrade the tap.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.balance}>
          Balance: ${formatNumber(balance)}
        </Text>
        <Text style={styles.hourlyEarnings}>
          Earnings per minute: $
          {calculateTotalEarningsPerMinute().toFixed(2)}
        </Text>
        <Text style={styles.tapLevel}>
          Tap Level: {tapLevel + 1}/6
        </Text>
      </View>
      <TouchableOpacity
        style={styles.clickBox}
        onPress={handleTap}
        accessibilityLabel={`Tap to earn ${tapValue.toFixed(
          2
        )} dollars`}
      >
        <Text style={styles.clickBoxText}>
          Tap to Earn ${tapValue.toFixed(2)}
        </Text>
      </TouchableOpacity>
      {tapUpgradeCost !== null && (
        <TouchableOpacity
          style={[
            styles.upgradeButton,
            balance < tapUpgradeCost && styles.disabledButton,
          ]}
          onPress={handleUpgradeTap}
          disabled={balance < tapUpgradeCost}
          accessibilityLabel={`Upgrade tap for ${formatNumber(
            tapUpgradeCost
          )} dollars`}
        >
          <Text style={styles.upgradeButtonText}>
            Upgrade Tap (${formatNumber(tapUpgradeCost)})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

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
  balance: {
    fontSize: 24,
    marginBottom: 10,
  },
  hourlyEarnings: {
    fontSize: 18,
    marginBottom: 10,
  },
  tapLevel: {
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
  },
  clickBoxText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  upgradeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  upgradeButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
