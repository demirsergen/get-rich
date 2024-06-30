import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import House from '../components/House';
import { useGameContext } from '../GameContext';

export default function HouseListScreen() {
  const { balance, houses, buyHouse, rentHouse } = useGameContext();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.balance}>
        Balance: ${balance.toFixed(2)}
      </Text>
      {houses.map((house) => (
        <House
          key={house.id}
          house={house}
          onBuy={() => buyHouse(house.id)}
          onRent={() => rentHouse(house.id)}
          canAfford={balance >= house.price}
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
