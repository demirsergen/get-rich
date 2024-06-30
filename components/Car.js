import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function Car({ car, onBuy, onSell, canAfford }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{car.name}</Text>
      <Text>Price: ${car.price.toFixed(2)}</Text>
      {car.isOwned ? (
        <TouchableOpacity style={styles.sellButton} onPress={onSell}>
          <Text style={styles.buttonText}>
            Sell for ${(car.price * 0.5).toFixed(2)}
          </Text>
        </TouchableOpacity>
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
            Buy (${car.price.toFixed(2)})
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
  sellButton: {
    backgroundColor: '#F44336',
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
