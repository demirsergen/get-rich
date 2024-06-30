// components/Business.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function Business({
  business,
  onBuy,
  onUpgrade,
  canAfford,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{business.name}</Text>
      <Text>Level: {business.level}</Text>
      <Text>
        Earning: ${business.currentEarning.toFixed(2)}/minute
      </Text>
      {business.level === 0 ? (
        <TouchableOpacity
          style={[
            styles.buyButton,
            !canAfford && styles.disabledButton,
          ]}
          onPress={onBuy}
          disabled={!canAfford}
        >
          <Text style={styles.buttonText}>
            Buy (${business.upgradeCost.toFixed(2)})
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.upgradeButton,
            !canAfford && styles.disabledButton,
          ]}
          onPress={onUpgrade}
          disabled={!canAfford}
        >
          <Text style={styles.buttonText}>
            Upgrade (${business.upgradeCost.toFixed(2)})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ... styles remain the same

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  upgradeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  upgradeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
