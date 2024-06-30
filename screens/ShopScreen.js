import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ShopScreen() {
  const navigation = useNavigation();

  const navigateToCarList = () => {
    navigation.navigate('CarList');
  };

  const navigateToHouseList = () => {
    navigation.navigate('HouseList');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.box}
        onPress={navigateToCarList}
      >
        <Text style={styles.boxText}>CarMax</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={navigateToHouseList}
      >
        <Text style={styles.boxText}>Realtor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 200,
    height: 100,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  boxText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
