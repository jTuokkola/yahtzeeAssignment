import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, BONUS_POINTS, BONUS_POINTS_LIMIT } from './constants';
import Footer from './Footer';
import Header from './Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Col, Row, Container } from 'react-native-flex-grid';
import Styles from '../style/Styles';
import AsyncStorage from "@react-native-async-storage/async-storage";

const board = [];
let gameNumber = 1; // Initialize game number

export default function Game({ navigation, route }) {

  const [name, setName] = useState('');
  useEffect(() => {
    if (name === "" && route.params?.player) {
      setName(route.params.player);
    }
  }, []);

  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('Throw dices');
  const [gameEndStatus, setGameEndStatus] = useState(false);
  useEffect(() => {
    if (gameEndStatus) {
      saveScoreToStorage(gameNumber); // Pass gameNumber to saveScoreToStorage
    }
  }, [gameEndStatus]);

  const [selectedDices, setSelectedDices] = useState(Array(NBR_OF_DICES).fill(false));
  const [diceSpots, setDiceSpots] = useState(Array(NBR_OF_DICES).fill(0));
  const [selectedDicePoints, setSelectedDicePoints] = useState(Array(MAX_SPOT).fill(false));
  const [dicePointsTotal, setDicePointsTotal] = useState(Array(MAX_SPOT).fill(0));
  const [totalpoints, setTotalPoints] = useState(0);
  const [pointsNeededForBonus, setPointsNeededForBonus] = useState(BONUS_POINTS_LIMIT);

  const dicesRow = [];
  for (let dice = 0; dice < NBR_OF_DICES; dice++) {
    dicesRow.push(
      <Col key={"col" + dice}>
        <Pressable
          key={"dice" + dice}
          onPress={() => selectDice(dice)}
          disabled={gameEndStatus} // Disable dice selection when game is over
        >
          <MaterialCommunityIcons
            name={board[dice]}
            size={50}
            key={"icon" + dice}
            color={getDiceColor(dice)}
          />
        </Pressable>
      </Col>
    );
  }

  const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = !selectedDices[i];
    setSelectedDices(dices);
  }

  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={"pointsRow" + spot}>
        <Text key={"pointsRow" + spot} style={{ fontFamily: "comic sans ms", }}>{getSpotTotal(spot)}</Text>
      </Col>
    )
  }

  const pointsToSelectRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    pointsToSelectRow.push(
      <Col key={"buttonsRow" + diceButton}>
        <Pressable
          key={"buttonsRow" + diceButton}
          onPress={() => selectDicePoints(diceButton)}
          disabled={gameEndStatus} // Disable point selection when game is over
        >
          <MaterialCommunityIcons
            key={"buttonsRow" + diceButton}
            name={'numeric-' + (diceButton + 1) + "-circle"}
            size={35}
            color={getDicePointsColor(diceButton)}
          />
        </Pressable>
      </Col>
    );
  }

  function getDiceColor(i) {
    return selectedDices[i] ? "black" : "darkblue";
  }

  function getDicePointsColor(i) {
    return selectedDicePoints[i] ? "black" : "darkblue";
  }

  const selectDicePoints = (i) => {
    if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
      let selectedPoints = [...selectedDicePoints];
      let points = [...dicePointsTotal];
      if (!selectedPoints[i]) {
        selectedPoints[i] = true;
        let nbrOfDices = diceSpots.reduce((total, x) => (x === i + 1) ? total + 1 : total, 0);
        points[i] = nbrOfDices * (i + 1);
        console.log(points);
        setSelectedDicePoints(selectedPoints);
        setDicePointsTotal(prevState => {
          const updatedPoints = [...prevState];
          updatedPoints[i] = points[i];
          return updatedPoints;
        });

        // Check if all selections have been made and end game if so
        if (selectedPoints.every(selected => selected)) {
          console.log("Dice points total before saving:", points);
          setGameEndStatus(true);
          setStatus("Game over! All points have been selected.");

        }
        setNbrOfThrowsLeft(NBR_OF_THROWS);

        // Calculate total points and apply bonus if necessary
        let total = points.reduce((acc, curr) => acc + curr, 0);
        if (total >= BONUS_POINTS_LIMIT) {
          total += BONUS_POINTS;
        }
        setTotalPoints(total);

        let pointsNeeded = BONUS_POINTS_LIMIT - total;
        if (pointsNeeded < 0) {
          pointsNeeded = 0;
        }
        setPointsNeededForBonus(pointsNeeded);
        return points[i];
      } else {
        setStatus("You have already selected points for " + (i + 1) + "!");
      }
    } else {
      setStatus("Throw " + (nbrOfThrowsLeft) + " before selecting points!")
    }
  }



  const throwDices = () => {
    if (nbrOfThrowsLeft > 0 && !gameEndStatus) {
      let spots = [...diceSpots];
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomnumber = Math.floor(Math.random() * MAX_SPOT) + 1;
          spots[i] = randomnumber;
          board[i] = "dice-" + randomnumber;
        }
      }
      setDiceSpots(spots);
      setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);

      if (nbrOfThrowsLeft === 1) {
        setStatus("Select points for the thrown dices");
      }
    } else {
      setStatus("You must select points before throwing again!");
    }
  }

  const resetGame = () => {
    // Reset all game state variables
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    setStatus('Throw dices');
    setGameEndStatus(false);
    setSelectedDices(Array(NBR_OF_DICES).fill(false));
    setDiceSpots(Array(NBR_OF_DICES).fill(0));
    setSelectedDicePoints(Array(MAX_SPOT).fill(false));
    setDicePointsTotal(Array(MAX_SPOT).fill(0));
    setTotalPoints(0);
    setPointsNeededForBonus(BONUS_POINTS_LIMIT);
    board.length = 0; // Clear the board array
    gameNumber++; // Increment game number for the next game
  };

  const saveScoreToStorage = async (gameNumber) => {
    try {
      // Fetch existing scores from AsyncStorage
      const existingScores = await AsyncStorage.getItem('scores');
      const parsedScores = existingScores ? JSON.parse(existingScores) : [];

      // Add the current score to the list
      const newScore = {
        name: `${name} Game ${gameNumber}`,
        score: totalpoints,
        date: new Date().toISOString() // Include current date and time
      };
      const updatedScores = [...parsedScores, newScore];

      // Save the updated scores back to AsyncStorage
      await AsyncStorage.setItem('scores', JSON.stringify(updatedScores));
    } catch (error) {
      console.error('Error saving score to AsyncStorage:', error);
    }
  };

  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }

  return (
    <>
      <Header />
      <View style={Styles.container}>
        <Text style={Styles.header}>Gameboard</Text>
        <Container style={Styles.pointdicecontainer}>
          <Container style={Styles.diceContainer}>
            <Row>{dicesRow}</Row>
          </Container>
          <Container style={Styles.pointContainer}>
            <Container fluid>
              <Row>{pointsRow}</Row>
            </Container>
            <Container fluid>
              <Row>{pointsToSelectRow}</Row>
            </Container>
          </Container>
        </Container>
        {/**total points here */}
        <Text style={{ fontFamily: "comic sans ms", color: "green", fontWeight: "bold" }}>Total points: {totalpoints} </Text>
        {/**bonus points here */}
        <View style={{ backgroundColor: "green", borderRadius: 5, marginTop: 5, padding: 2, }}>
          {pointsNeededForBonus > 0 &&
            <Text style={{ fontFamily: "comic sans ms", color: "white" }}>Points needed for bonus: {pointsNeededForBonus}</Text>
          }
          {pointsNeededForBonus === 0 &&
            <Text style={{ fontFamily: "comic sans ms", color: "white" }}>Bonus points awarded!</Text>
          }
        </View>
        {/** render some elements based on gameEndStatus*/}
        {!gameEndStatus && <Text style={{ fontFamily: "comic sans ms" }}>Throws left: {nbrOfThrowsLeft}</Text>}
        <Text style={{ fontFamily: "comic sans ms" }}>{status}</Text>
        {!gameEndStatus && (
          <Pressable onPress={throwDices} style={Styles.button}>
            <Text style={{ fontFamily: "comic sans ms" }}>Throw</Text>
          </Pressable>
        )}
        {gameEndStatus && (
          <>
            <Pressable onPress={() => navigation.navigate('Scoreboard')} style={Styles.scoreButton}>
              <Text style={{ fontFamily: "comic sans ms" }}>View Scoreboard</Text>
            </Pressable>
            <Pressable onPress={resetGame} style={Styles.resetButton}>
              <Text style={{ fontFamily: "comic sans ms" }}>New Game</Text>
            </Pressable>
          </>
        )}

        <Text style={{ fontFamily: "comic sans ms" }}>Player name: {name}</Text>
      </View>
      <Footer />
    </>
  );
}
