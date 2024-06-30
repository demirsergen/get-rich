import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Car from '../components/Car';
import { useGameContext } from '../GameContext';

export default function CarListScreen() {
  const { balance, cars, buyCar, sellCar } = useGameContext();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.balance}>
        Balance: ${balance.toFixed(2)}
      </Text>
      {cars.map((car) => (
        <Car
          key={car.id}
          car={car}
          onBuy={() => buyCar(car.id)}
          onSell={() => sellCar(car.id)}
          canAfford={balance >= car.price}
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
