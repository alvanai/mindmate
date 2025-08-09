import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'journalEntries';

export default function JournalScreen() {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setEntries(JSON.parse(raw));
      } catch (e) {
        console.warn('Failed to load journal', e);
      }
    })();
  }, []);

  const saveEntries = async (newEntries) => {
    setEntries(newEntries);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
    } catch (e) {
      console.warn('Failed to save journal', e);
    }
  };

  const addEntry = () => {
    if (!entry.trim()) return;
    const item = { text: entry.trim(), date: new Date().toISOString() };
    const updated = [item, ...entries];
    saveEntries(updated);
    setEntry('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Journal</Text>
      <TextInput
        placeholder="Write your thoughts..."
        value={entry}
        onChangeText={setEntry}
        multiline
        style={styles.input}
      />
      <Button title="Save Entry" onPress={addEntry} />
      <Text style={styles.historyTitle}>Recent entries</Text>
      <FlatList
        data={entries}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text style={styles.entryDate}>{new Date(item.date).toLocaleString()}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container:{flex:1,padding:20},
  title:{fontSize:22,fontWeight:'700',marginBottom:12},
  input:{borderWidth:1,borderColor:'#ddd',padding:10,borderRadius:8,minHeight:100,marginBottom:10},
  historyTitle:{fontSize:16,fontWeight:'600',marginTop:16,marginBottom:8},
  entry:{padding:10,borderBottomWidth:1,borderBottomColor:'#eee'},
  entryDate:{color:'#666',fontSize:12,marginBottom:6}
});
