import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function House({ house, onBuy, onRent, canAfford }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{house.name}</Text>
      <Text>Price: ${house.price.toFixed(2)}</Text>
      <Text>Rent: ${house.rent.toFixed(2)}/minute</Text>
      {house.isOwned ? (
        <Text style={styles.owned}>Owned</Text>
      ) : (
        <TouchableOpacity
          style={[
            styles.buyButton,
            !canAfford && styles.disabledButton,
          ]}
          onPress={onBuy}
          disabled={!canAfford}
        >
          <Text style={styles.buttonText}>
            Buy (${house.price.toFixed(2)})
          </Text>
        </TouchableOpacity>
      )}
      {!house.isRented && house.isOwned && (
        <TouchableOpacity style={styles.rentButton} onPress={onRent}>
          <Text style={styles.buttonText}>
            Rent (${house.rent.toFixed(2)}/minute)
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
  owned: {
    color: 'green',
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  rentButton: {
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
