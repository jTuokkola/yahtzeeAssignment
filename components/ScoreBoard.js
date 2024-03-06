import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Styles from '../style/Styles';
import Header from './Header';

export default function ScoreBoard({ navigation }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        // Fetch scores from AsyncStorage
        const storedScores = await AsyncStorage.getItem('scores');
        if (storedScores) {
          // parse and sort by score (descending)
          const parsedScores = JSON.parse(storedScores);
          const sortedScores = parsedScores.sort((a, b) => b.score - a.score); 
          setScores(sortedScores);
        }
      } catch (error) {
        console.error('Error fetching scores from AsyncStorage:', error);
      }
    };

    // Call the function to fetch scores whenever the component mounts or when a new game is started
    fetchScores();

    // Listen for changes in AsyncStorage and update scores accordingly
    const unsubscribe = navigation.addListener('focus', () => {
      fetchScores();
    });

    return unsubscribe;
  }, [navigation]); // Run the effect whenever the component mounts or when navigation focus changes

  // Determine the highest score
  const highestScore = scores.length > 0 ? scores[0].score : 0;

  return (
    <>
      <Header />
      <View>
        <Text style={Styles.header}>
          Scoreboard
        </Text>
        <FlatList
          data={scores}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5, borderBottomWidth: 1, borderBottomColor: "black", backgroundColor: item.score === highestScore ? "yellow" : "transparent" }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 12, fontFamily: "comic sans ms", color: "darkblue" }}>{new Date(item.date).toLocaleDateString()}</Text>
                <Text style={{ fontSize: 12, fontFamily: "comic sans ms", color: "darkblue" }}>{new Date(item.date).toLocaleTimeString()}</Text>
              </View>
              <Text style={{ fontSize: 18, fontFamily: "comic sans ms" }}>
                {item.name} {item.score === highestScore && <MaterialCommunityIcons name="crown" size={24} color="gold" />}
              </Text>
              <Text style={{ fontSize: 18, fontFamily: "comic sans ms" }}>{item.score}</Text>
            </View>
          )}
        />

      </View>
    </>
  );
}
