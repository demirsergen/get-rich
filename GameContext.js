// GameContext.js
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';

const GameContext = createContext();

const BUSINESSES = [
  {
    id: 1,
    name: 'Lemonade Stand',
    baseCost: 5,
    baseEarning: 0.05,
    upgradeCostMultiplier: 1.15,
    upgradeEffect: 1.1,
  },
  {
    id: 2,
    name: 'Newspaper Route',
    baseCost: 100,
    baseEarning: 0.5,
    upgradeCostMultiplier: 1.2,
    upgradeEffect: 1.15,
  },
  {
    id: 3,
    name: 'Car Wash',
    baseCost: 1000,
    baseEarning: 5,
    upgradeCostMultiplier: 1.25,
    upgradeEffect: 1.2,
  },
  {
    id: 4,
    name: 'Pizza Shop',
    baseCost: 10000,
    baseEarning: 50,
    upgradeCostMultiplier: 1.3,
    upgradeEffect: 1.25,
  },
  {
    id: 5,
    name: 'Tech Startup',
    baseCost: 100000,
    baseEarning: 500,
    upgradeCostMultiplier: 1.35,
    upgradeEffect: 1.3,
  },
];

export const GameProvider = ({ children }) => {
  const [balance, setBalance] = useState(5);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [businesses, setBusinesses] = useState(
    BUSINESSES.map((b) => ({
      ...b,
      level: 0,
      currentEarning: 0,
      upgradeCost: b.baseCost,
    }))
  );

  const calculateClickValue = () => {
    return Math.min(
      0.1 + Math.floor(totalEarnings / 1000) * 0.01,
      1.0
    );
  };

  const increaseBalance = (amount) => {
    setBalance((prev) => {
      const newBalance = Math.round((prev + amount) * 100) / 100;
      setTotalEarnings((prevTotal) => prevTotal + amount);
      return newBalance;
    });
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
          business.level > 0
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
      increaseBalance(earnings); // Convert per-minute earnings to per-second
    }, 5000);

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
        buyBusiness,
        upgradeBusiness,
        increaseBalance,
        calculateClickValue,
        calculateTotalEarningsPerMinute,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
