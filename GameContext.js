import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameContext = createContext();

const BUSINESSES = [
  {
    id: 1,
    name: 'Lemonade Stand',
    baseCost: 50,
    baseEarning: 0.5,
    upgradeCostMultiplier: 1.15, // Further reduced from 1.12
    upgradeEffect: 1.4, // Further increased from 1.12
    level: 0,
  },
  {
    id: 2,
    name: 'Newspaper Route',
    baseCost: 500,
    baseEarning: 3,
    upgradeCostMultiplier: 1.18, // Further reduced from 1.15
    upgradeEffect: 1.45, // Further increased from 1.17
    level: 0,
  },
  {
    id: 3,
    name: 'Car Wash',
    baseCost: 5000,
    baseEarning: 20,
    upgradeCostMultiplier: 1.21, // Further reduced from 1.18
    upgradeEffect: 1.5, // Further increased from 1.22
    level: 0,
  },
  {
    id: 4,
    name: 'Pizza Shop',
    baseCost: 50000,
    baseEarning: 100,
    upgradeCostMultiplier: 1.24, // Further reduced from 1.22
    upgradeEffect: 1.55, // Further increased from 1.27
    level: 0,
  },
  {
    id: 5,
    name: 'Tech Startup',
    baseCost: 500000,
    baseEarning: 500,
    upgradeCostMultiplier: 1.27, // Further reduced from 1.25
    upgradeEffect: 1.6, // Further increased from 1.32
    level: 0,
  },
  {
    id: 6,
    name: 'Coffee Shop Chain',
    baseCost: 2500000,
    baseEarning: 2000,
    upgradeCostMultiplier: 1.3, // Further reduced from 1.28
    upgradeEffect: 1.65, // Further increased from 1.37
    level: 0,
  },
  {
    id: 7,
    name: 'Real Estate Agency',
    baseCost: 10000000,
    baseEarning: 7500,
    upgradeCostMultiplier: 1.33, // Further reduced from 1.32
    upgradeEffect: 1.7, // Further increased from 1.42
    level: 0,
  },
  {
    id: 8,
    name: 'Shopping Mall',
    baseCost: 50000000,
    baseEarning: 30000,
    upgradeCostMultiplier: 1.36, // Further reduced from 1.35
    upgradeEffect: 1.75, // Further increased from 1.47
    level: 0,
  },
  {
    id: 9,
    name: 'Space Tourism Company',
    baseCost: 250000000,
    baseEarning: 150000,
    upgradeCostMultiplier: 1.39, // Further reduced from 1.38
    upgradeEffect: 1.8, // Further increased from 1.52
    level: 0,
  },
  {
    id: 10,
    name: 'Interplanetary Mining Corp',
    baseCost: 1000000000,
    baseEarning: 750000,
    upgradeCostMultiplier: 1.42, // Further reduced from 1.42
    upgradeEffect: 1.85, // Further increased from 1.57
    level: 0,
  },
];
const HOUSES = [
  {
    id: 1,
    name: 'Small Apartment',
    price: 10000,
    rent: 100,
    isRented: false,
    isOwned: false,
  },
  {
    id: 2,
    name: 'Townhouse',
    price: 50000,
    rent: 500,
    isRented: false,
    isOwned: false,
  },
  {
    id: 3,
    name: 'Luxury Villa',
    price: 200000,
    rent: 2000,
    isRented: false,
    isOwned: false,
  },
];

const CARS = [
  { id: 1, name: 'Used Car', price: 5000, isOwned: false },
  { id: 2, name: 'New Car', price: 20000, isOwned: false },
  { id: 3, name: 'Luxury Car', price: 100000, isOwned: false },
];

const TAP_UPGRADE_COST = [80, 400, 2100, 7000, 30000];

export const GameProvider = ({ children }) => {
  const [balance, setBalance] = useState(20);
  const [tapLevel, setTapLevel] = useState(1);
  const [businesses, setBusinesses] = useState(
    BUSINESSES.map((b) => ({
      ...b,
      level: 0,
      currentEarning: 0,
      upgradeCost: b.baseCost,
    }))
  );
  const [houses, setHouses] = useState(HOUSES);
  const [cars, setCars] = useState(CARS);

  const resetGame = () => {
    setBalance(20);
    setTapLevel(0);
    setBusinesses(
      BUSINESSES.map((b) => ({
        ...b,
        level: 0,
        currentEarning: 0,
        upgradeCost: b.baseCost,
      }))
    );
    setHouses(HOUSES);
    setCars(CARS);

    // Clear saved game state from AsyncStorage
    AsyncStorage.multiRemove([
      'balance',
      'tapLevel',
      'businesses',
      'houses',
      'cars',
    ]).catch((error) =>
      console.error('Error clearing game state:', error)
    );
  };

  const buyHouse = (id) => {
    setHouses((prevHouses) =>
      prevHouses.map((house) => {
        if (
          house.id === id &&
          balance >= house.price &&
          !house.isOwned
        ) {
          setBalance((prev) => prev - house.price);
          return { ...house, isOwned: true };
        }
        return house;
      })
    );
  };

  const rentHouse = (id) => {
    setHouses((prevHouses) =>
      prevHouses.map((house) => {
        if (house.id === id && !house.isRented) {
          return { ...house, isRented: true };
        }
        return house;
      })
    );
  };

  const buyCar = (id) => {
    setCars((prevCars) =>
      prevCars.map((car) => {
        if (car.id === id && balance >= car.price && !car.isOwned) {
          setBalance((prev) => prev - car.price);
          return { ...car, isOwned: true };
        }
        return car;
      })
    );
  };

  const sellCar = (id) => {
    setCars((prevCars) =>
      prevCars.map((car) => {
        if (car.id === id && car.isOwned) {
          setBalance((prev) => prev + car.price * 0.5);
          return { ...car, isOwned: false };
        }
        return car;
      })
    );
  };

  // Adding the rent income to balance
  useEffect(() => {
    const interval = setInterval(() => {
      let earnings = 0;
      businesses.forEach((business) => {
        if (business.level > 0) {
          earnings += business.currentEarning;
        }
      });
      houses.forEach((house) => {
        if (house.isRented) {
          earnings += house.rent;
        }
      });
      increaseBalance(earnings / 60); // Convert per-minute earnings to per-second
    }, 1000);

    return () => clearInterval(interval);
  }, [businesses, houses]);

  useEffect(() => {
    // Load game state from AsyncStorage
    const loadGameState = async () => {
      const savedBalance = await AsyncStorage.getItem('balance');
      const savedTapLevel = await AsyncStorage.getItem('tapLevel');
      const savedBusinesses = await AsyncStorage.getItem(
        'businesses'
      );

      if (savedBalance) setBalance(JSON.parse(savedBalance));
      if (savedTapLevel) setTapLevel(JSON.parse(savedTapLevel));
      if (savedBusinesses) setBusinesses(JSON.parse(savedBusinesses));
    };

    loadGameState();
  }, []);

  useEffect(() => {
    // Save game state to AsyncStorage
    const saveGameState = async () => {
      await AsyncStorage.setItem('balance', JSON.stringify(balance));
      await AsyncStorage.setItem(
        'tapLevel',
        JSON.stringify(tapLevel)
      );
      await AsyncStorage.setItem(
        'businesses',
        JSON.stringify(businesses)
      );
    };

    saveGameState();
  }, [balance, tapLevel, businesses]);

  const calculateTapValue = () => {
    return 1 + tapLevel * 2; // $1, $2.8, $4.6, $6.4, $8.2, $10 this was before
  };

  const getCurrentTapUpgradeCost = () => {
    return tapLevel < 5 ? TAP_UPGRADE_COST[tapLevel] : null;
  };

  const increaseBalance = (amount) => {
    setBalance((prev) => Math.round((prev + amount) * 100) / 100);
  };

  const upgradeTap = () => {
    const cost = getCurrentTapUpgradeCost();
    if (cost && balance >= cost) {
      setBalance((prev) => prev - cost);
      setTapLevel((prev) => prev + 1);
    }
  };

  const buyBusiness = (id) => {
    setBusinesses((prevBusinesses) =>
      prevBusinesses.map((business) => {
        if (
          business.id === id &&
          balance >= business.upgradeCost &&
          business.level === 0
        ) {
          setBalance(
            (prev) =>
              Math.round((prev - business.upgradeCost) * 100) / 100
          );
          return {
            ...business,
            level: 1,
            currentEarning: business.baseEarning,
            upgradeCost: Math.ceil(
              business.upgradeCost * business.upgradeCostMultiplier
            ),
          };
        }
        return business;
      })
    );
  };

  const upgradeBusiness = (id) => {
    setBusinesses((prevBusinesses) =>
      prevBusinesses.map((business) => {
        if (
          business.id === id &&
          balance >= business.upgradeCost &&
          business.level > 0 &&
          business.level < 30
        ) {
          setBalance(
            (prev) =>
              Math.round((prev - business.upgradeCost) * 100) / 100
          );
          return {
            ...business,
            level: business.level + 1,
            currentEarning:
              Math.round(
                business.currentEarning * business.upgradeEffect * 100
              ) / 100,
            upgradeCost: Math.ceil(
              business.upgradeCost * business.upgradeCostMultiplier
            ),
          };
        }
        return business;
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let earnings = 0;
      businesses.forEach((business) => {
        if (business.level > 0) {
          earnings += business.currentEarning;
        }
      });
      increaseBalance(earnings / 60); // Convert per-minute earnings to per-second
    }, 1000);

    return () => clearInterval(interval);
  }, [businesses]);

  const calculateTotalEarningsPerMinute = () => {
    return businesses.reduce(
      (total, business) => total + business.currentEarning,
      0
    );
  };

  return (
    <GameContext.Provider
      value={{
        balance,
        businesses,
        tapLevel,
        buyBusiness,
        upgradeBusiness,
        upgradeTap,
        increaseBalance,
        calculateTapValue,
        calculateTotalEarningsPerMinute,
        getCurrentTapUpgradeCost,
        houses,
        cars,
        buyHouse,
        rentHouse,
        buyCar,
        sellCar,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
