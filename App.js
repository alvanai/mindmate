// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import JournalScreen from './screens/JournalScreen';
import MoodTrackerScreen from './screens/MoodTrackerScreen';
import BreathingScreen from './screens/BreathingScreen';
import ResourcesScreen from './screens/ResourcesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />
        <Stack.Screen name="MoodTracker" component={MoodTrackerScreen} options={{ title: 'Mood Tracker' }} />
        <Stack.Screen name="Breathing" component={BreathingScreen} options={{ title: 'Breathing Exercise' }} />
        <Stack.Screen name="Resources" component={ResourcesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
