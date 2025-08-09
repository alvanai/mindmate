import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MindMate 💙</Text>
      <Text style={styles.subtitle}>Your pocket mental health companion</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Journal')}>
        <Text style={styles.buttonText}>Start Daily Journal</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MoodTracker')}>
        <Text style={styles.buttonText}>Track My Mood</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Breathing')}>
        <Text style={styles.buttonText}>Breathing Exercise</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Resources')}>
        <Text style={styles.buttonText}>Mental Health Resources</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:'center', alignItems:'center', backgroundColor:'#f5f7fa' },
  title: { fontSize:32, fontWeight:'700', color:'#4a90e2', marginBottom:6 },
  subtitle: { fontSize:14, marginBottom:24, color:'#444', textAlign:'center' },
  button: { width:'85%', backgroundColor:'#4a90e2', padding:14, borderRadius:8, marginVertical:8 },
  buttonSecondary: { width:'85%', backgroundColor:'#50c878', padding:14, borderRadius:8, marginTop:12 },
  buttonText: { color:'#fff', textAlign:'center', fontSize:16 },
});
