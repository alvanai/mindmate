import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

const STORAGE_KEY = 'moodHistory';

export default function MoodTrackerScreen() {
  const moods = ['😊', '🙂', '😐', '😔', '😡'];
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setHistory(JSON.parse(raw));
      } catch (e) { console.warn(e); }
    })();
  }, []);

  const save = async () => {
    if (!selected) { alert('Pick a mood first'); return; }
    const item = { mood: selected, date: new Date().toISOString() };
    const updated = [item, ...history];
    setHistory(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      Haptics.selectionAsync();
    } catch (e) { console.warn(e); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling?</Text>
      <View style={styles.row}>
        {moods.map(m => (
          <TouchableOpacity key={m} onPress={() => setSelected(m)} style={[styles.moodBtn, selected === m && styles.moodSelected]}>
            <Text style={{ fontSize:36 }}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={save}>
        <Text style={styles.saveText}>Save Mood</Text>
      </TouchableOpacity>

      <Text style={styles.historyTitle}>Mood history</Text>
      <FlatList
        data={history}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyRow}>
            <Text>{item.mood}</Text>
            <Text style={{ color:'#666' }}>{new Date(item.date).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:20},
  title:{fontSize:20,fontWeight:'700',marginBottom:12},
  row:{flexDirection:'row',justifyContent:'space-around',marginBottom:16},
  moodBtn:{padding:10},
  moodSelected:{backgroundColor:'#e6f0ff',borderRadius:8},
  saveBtn:{backgroundColor:'#4a90e2',padding:12,borderRadius:8,alignItems:'center',marginBottom:12},
  saveText:{color:'#fff',fontWeight:'600'},
  historyTitle:{fontSize:16,fontWeight:'600',marginTop:8,marginBottom:6},
  historyRow:{flexDirection:'row',justifyContent:'space-between',paddingVertical:8,borderBottomWidth:1,borderBottomColor:'#f0f0f0'}
});
