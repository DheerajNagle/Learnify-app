import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const LoadingSpinner = ({ size = 'large', color = '#6366f1', text = 'Loading...' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
});

export default LoadingSpinner;
