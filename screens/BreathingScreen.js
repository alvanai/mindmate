import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const phases = [
  { text: 'Breathe in', seconds: 4 },
  { text: 'Hold', seconds: 4 },
  { text: 'Breathe out', seconds: 6 },
];

export default function BreathingScreen() {
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [count, setCount] = useState(phases[0].seconds);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!running) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setCount(n => {
        if (n <= 1) {
          // switch phase
          setPhaseIndex(p => {
            const next = (p + 1) % phases.length;
            setCount(phases[next].seconds);
            return next;
          });
          return 0;
        }
        return n - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [running]);

  useEffect(() => {
    setCount(phases[phaseIndex].seconds);
  }, [phaseIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{phases[phaseIndex].text}</Text>
      <Text style={styles.count}>{count}s</Text>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: running ? '#d9534f' : '#4a90e2' }]}
        onPress={() => setRunning(r => !r)}
      >
        <Text style={styles.btnText}>{running ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,alignItems:'center',justifyContent:'center',padding:20},
  title:{fontSize:24,fontWeight:'700',marginBottom:6},
  count:{fontSize:48,fontWeight:'700',marginBottom:20,color:'#333'},
  btn:{padding:14,borderRadius:8,width:'60%',alignItems:'center'},
  btnText:{color:'#fff',fontSize:16,fontWeight:'600'}
});
