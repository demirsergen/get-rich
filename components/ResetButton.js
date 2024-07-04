import React from 'react';
import { View, Button, Alert } from 'react-native';
import { useGameContext } from '../GameContext';

const ResetButton = () => {
  const { resetGame } = useGameContext();

  const handleReset = () => {
    Alert.alert(
      'Reset Game',
      'Are you sure you want to reset the game? All progress will be lost.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => resetGame(),
        },
      ]
    );
  };

  return <Button title="Reset Game" onPress={handleReset} />;
};

export default ResetButton;
