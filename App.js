import HomeScreen from './components/HomeScreen';
import Game from './components/Game';
import ScoreBoard from './components/ScoreBoard';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//  import AsyncStorage from "@react-native-async-storage/async-storage";
//  import { useEffect } from 'react';

const Tab = createBottomTabNavigator();

export default function App() {

  //  useEffect(() => {
  //    resetAsyncStorage();
  //  }, []);

  //  const resetAsyncStorage = async () => {
  //    try {
  //      await AsyncStorage.clear();
  //      console.log("AsyncStorage cleared");
  //    } catch (e) {
  //      console.log(e);
  //    }
  //  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Gameboard') {
              iconName = focused ? 'gamepad' : 'gamepad-outline';
            } else if (route.name === 'Scoreboard') {
              iconName = focused ? 'scoreboard' : 'scoreboard-outline';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: { display: "none"},
          headerShown: false,
          tabBarActiveBackgroundColor:"black",
          tabBarInactiveBackgroundColor:"#fff47c",
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} 
        options={{tabBarStyle: {display: "none"}}}/>
        <Tab.Screen name="Gameboard" component={Game} />
        <Tab.Screen name="Scoreboard" component={ScoreBoard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
