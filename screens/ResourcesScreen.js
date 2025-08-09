import React from 'react';
import { View, Text, Button, Linking, StyleSheet } from 'react-native';

const resources = [
  { title: 'Crisis Text Line', url: 'https://www.crisistextline.org' },
  { title: 'Mental Health America', url: 'https://mhanational.org' },
  { title: 'BetterHelp', url: 'https://www.betterhelp.com' },
];

export default function ResourcesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resources</Text>
      {resources.map((r, i) => (
        <View key={i} style={{ marginVertical:8 }}>
          <Button title={r.title} onPress={() => Linking.openURL(r.url)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:20},
  title:{fontSize:20,fontWeight:'700',marginBottom:12}
});
