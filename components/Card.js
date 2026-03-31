import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children, style, shadow = true, padding = 16 }) => {
  const cardStyle = [
    styles.card,
    shadow && styles.shadow,
    { padding },
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 8,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Card;
