import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import NumberContainer from '../Components/NumberContainer';
import Card from '../Components/Card';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) return generateRandomBetween(min, max, exclude);
  else return rndNum;
};

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = React.useState(
    generateRandomBetween(1, 100, props.userChoice),
  );
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => {}}></Button>
        <Button title="GREATER" onPress={() => {}}></Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
});

export default GameScreen;
