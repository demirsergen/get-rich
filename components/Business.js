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

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  upgradeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
