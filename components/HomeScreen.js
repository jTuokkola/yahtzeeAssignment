import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Keyboard, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from './constants';
import Styles from '../style/Styles';
import Header from './Header';
import Footer from './Footer';

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState("");
  const [hasPlayerName, setHasPlayerName] = useState(false);

  const handlePlayerName = (value) => {
    if (value.trim().length > 0){
      setHasPlayerName(true);
      Keyboard.dismiss();
    } 
  }
  
  return (
    <>
      <Header/>
      <View style={Styles.container}>
        {!hasPlayerName ?
        <>
            <Text style={Styles.header}>Please enter your name:</Text>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor={'grey'}
              onChangeText={setName}
              autoFocus={true}
              style={Styles.input}
            />
            <Pressable onPress={() => handlePlayerName(name)} style={Styles.button}>
              <Text style={{fontFamily: "comic sans ms"}}>OK</Text>
            </Pressable>
        </>
        :
        <>
            <Text style={Styles.header}>Rules of the game...</Text>
            <View style={Styles.textcontainer}>
              <Text multiline={true} style={Styles.text}>
                You have {NBR_OF_DICES} dices and
                for every dice you have {NBR_OF_THROWS} throws. After each throw, you can keep dices in
                order to get the same dice spot counts as many as
                possible. At the end of the turn, you must select
                your points from {MIN_SPOT} to {MAX_SPOT}. {'\n'}{'\n'}
                The game ends when all points have been selected.
                The order for selecting those is free.
                POINTS: After each turn, the game calculates the sum
                for the dices you selected. Only the dices having
                the same spot count are calculated. Inside the
                game, you cannot select the same points from {MIN_SPOT} to {MAX_SPOT} again.{'\n'}{'\n'}
                GOAL: To get as many points as possible. {BONUS_POINTS_LIMIT} points is the limit of
                getting bonus, which gives you {BONUS_POINTS} points more.
              </Text>
            </View>
            <Text style={Styles.header}>Good luck, {name}!</Text>
            <Pressable onPress={() => navigation.navigate("Gameboard", {player: name})} style={Styles.button}>
              <Text style={{fontFamily: "comic sans ms"}}>Start Game</Text>
            </Pressable>
        </>
        }
      </View>
      <Footer/>
    </>
  );
}

