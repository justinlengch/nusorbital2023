import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Game1spaces from './Game1spaces';

const Game1board = ({ gameState, makeMove }) => {
  return (
    <View style={boardStyle.container}>
      <View style={boardStyle.board}>
        <View style={boardStyle.row}>
          <Game1spaces spaceID={0} spaceValue={gameState[0]} setTurn={makeMove} />
          <Game1spaces spaceID={1} spaceValue={gameState[1]} setTurn={makeMove} />
          <Game1spaces spaceID={2} spaceValue={gameState[2]} setTurn={makeMove} />
        </View>
        <View style={boardStyle.row}>
          <Game1spaces spaceID={3} spaceValue={gameState[3]} setTurn={makeMove} />
          <Game1spaces spaceID={4} spaceValue={gameState[4]} setTurn={makeMove} />
          <Game1spaces spaceID={5} spaceValue={gameState[5]} setTurn={makeMove} />
        </View>
        <View style={boardStyle.row}>
          <Game1spaces spaceID={6} spaceValue={gameState[6]} setTurn={makeMove} />
          <Game1spaces spaceID={7} spaceValue={gameState[7]} setTurn={makeMove} />
          <Game1spaces spaceID={8} spaceValue={gameState[8]} setTurn={makeMove} />
        </View>
      </View>
    </View>
  );
};

export default Game1board;


const boardStyle = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    board: {
      backgroundColor: '#FFFDD0', // Updated color
    },
    row: {
      justifyContent: 'space-around',
      flexDirection: 'row',
    },
  });
