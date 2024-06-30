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
    baseCost: 50,
    baseEarning: 0.5,
    upgradeCostMultiplier: 1.15,
    upgradeEffect: 1.1,
  },
  {
    id: 2,
    name: 'Newspaper Route',
    baseCost: 500,
    baseEarning: 3,
    upgradeCostMultiplier: 1.2,
    upgradeEffect: 1.15,
  },
  {
    id: 3,
    name: 'Car Wash',
    baseCost: 5000,
    baseEarning: 20,
    upgradeCostMultiplier: 1.25,
    upgradeEffect: 1.2,
  },
  {
    id: 4,
    name: 'Pizza Shop',
    baseCost: 50000,
    baseEarning: 100,
    upgradeCostMultiplier: 1.3,
    upgradeEffect: 1.25,
  },
  {
    id: 5,
    name: 'Tech Startup',
    baseCost: 500000,
    baseEarning: 500,
    upgradeCostMultiplier: 1.35,
    upgradeEffect: 1.3,
  },
];

const TAP_UPGRADE_COST = [100, 500, 2500, 10000, 50000];

export const GameProvider = ({ children }) => {
  const [balance, setBalance] = useState(10);
  const [tapLevel, setTapLevel] = useState(0);
  const [businesses, setBusinesses] = useState(
    BUSINESSES.map((b) => ({
      ...b,
      level: 0,
      currentEarning: 0,
      upgradeCost: b.baseCost,
    }))
  );

  const calculateTapValue = () => {
    return 1 + tapLevel * 1.8; // $1, $2.8, $4.6, $6.4, $8.2, $10
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
