import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import Colors from '../Constants/colors';
import Card from '../Components/Card';
import Input from '../Components/Input';
import NumberContainer from '../Components/NumberContainer';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  useEffect(() => {
    console.log(selectedNumber);
  });

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid Number',
        'Number has to be a number between 0 and 99',
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}],
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text style={{color: 'black'}}>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button
          title="START GAME"
          onPress={() => {
            props.onStartGame(selectedNumber);
          }}
        />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text style={styles.text}>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.BtnContainer}>
            <View style={styles.btn}>
              <Button
                title="reset"
                onPress={resetInputHandler}
                color={Colors.primary}
              />
            </View>
            <View style={styles.btn}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.accent}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    color: 'black',
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  },
  BtnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  btn: {
    width: 90,
    color: '#63e6be',
  },
  input: {
    width: 200,
    textAlign: 'center',
    marginVertical: 20,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default StartGameScreen;
