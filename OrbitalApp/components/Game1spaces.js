import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Game1spaces = ({ spaceID, spaceValue, setTurn }) => {
  return (
    <View style={spaceStyle.container}>
      <TouchableOpacity style={spaceStyle.space} onPress={() => setTurn(spaceID)} disabled={spaceValue ? true : ""}>
        <Text style={spaceStyle.spaceValue}>{spaceValue}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Game1spaces;

const spaceStyle = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    space: {
      width: 80,
      height: 80,
      marginVertical: 5,
      marginHorizontal: 5,
      backgroundColor: '#FF1493', // Updated color
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    spaceValue: {
      fontSize: 40,
      color: '#FFD700', // Updated color
    },
  });