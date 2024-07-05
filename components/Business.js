import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { formatNumber } from '../utility/formatNumber';

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
      {business.level == 0 ? (
        <Text>Earning: $0/minute</Text>
      ) : (
        <Text>
          Earning: ${formatNumber(business.currentEarning)}/minute
        </Text>
      )}

      {business.level === 0 ? (
        <TouchableOpacity
          style={[
            styles.buyButton,
            !canAfford && styles.disabledButton,
          ]}
          onPress={onBuy}
          disabled={!canAfford}
          accessibilityLabel={`Buy ${
            business.name
          } for ${business.upgradeCost.toFixed(2)} dollars`}
        >
          <Text style={styles.buttonText}>
            Buy (${formatNumber(business.upgradeCost)})
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.upgradeButton,
            !canAfford && styles.disabledButton,
          ]}
          onPress={onUpgrade}
          disabled={!canAfford || business.level == 30}
          accessibilityLabel={`Upgrade ${
            business.name
          } for ${business.upgradeCost.toFixed(2)} dollars`}
        >
          {business.level == 30 ? (
            <Text style={styles.buttonTextMaxed}>Maxed</Text>
          ) : (
            <Text style={styles.buttonText}>
              Upgrade (${formatNumber(business.upgradeCost)})
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

Business.propTypes = {
  business: PropTypes.shape({
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    currentEarning: PropTypes.number.isRequired,
    upgradeCost: PropTypes.number.isRequired,
  }).isRequired,
  onBuy: PropTypes.func.isRequired,
  onUpgrade: PropTypes.func.isRequired,
  canAfford: PropTypes.bool.isRequired,
};

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
  buttonTextMaxed: {
    color: 'red',
    textAlign: 'center',
  },
});
