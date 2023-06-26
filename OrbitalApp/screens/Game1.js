import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';

import Game1board from '../components/Game1board';

export default function Game1() {
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [gameResult, setGameResult] = useState('');
  const [gameState, setGameState] = useState({});

  const togglePlayerTurn = () => setIsPlayerOneTurn(!isPlayerOneTurn);
  const toggleGameEnd = () => setGameEnded(!gameEnded);
  const toggleModal = () => setModalVisible(!modalVisible);

  const startNewGame = () => {
    setGameState({});
    setGameEnded(false);
    setModalVisible(false);
    setIsPlayerOneTurn(true);
  };

  const finishGame = () => {
    setGameEnded(true);
    toggleModal();
  };

  function checkWinner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (
        gameState[a] === gameState[b] &&
        gameState[b] === gameState[c] &&
        a in gameState &&
        b in gameState &&
        c in gameState
      ) {
        setGameResult(isPlayerOneTurn ? 'Congratulations, Player 1 wins!' : 'Congratulations, Player 2 wins!');
        finishGame();
      }
    }

    if (Object.keys(gameState).length === 9) {
      setGameResult('It\'s a tie!');
      finishGame();
    }
  }

  function makeMove(value) {
    const updatedGameState = { ...gameState };
    updatedGameState[value] = isPlayerOneTurn ? 'X' : 'O';

    setGameState(updatedGameState);

    checkWinner();
    togglePlayerTurn();
  }

  return (
    <View style={mainStyle.container}>
      <Text style={mainStyle.paragraph}>Let's play Tic-Tac-Toe!</Text>
      {!gameEnded && (
        <Game1board
          gameState={gameState}
          makeMove={makeMove}
        />
      )}
      <Modal animationType="slide" visible={modalVisible}>
        <View style={mainStyle.centeredView}>
          <View style={mainStyle.modalView}>
            <Text style={mainStyle.h2}>{gameResult}</Text>
            <TouchableOpacity style={mainStyle.purpleButton} onPress={startNewGame}>
              <Text style={mainStyle.whiteButtonText}>Start a new game</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={mainStyle.legend}>
        <Text style={mainStyle.subheader}>X - Player 1</Text>
        <Text style={mainStyle.subheader}>O - Player 2</Text>
      </View>
    </View>
  );
}


const mainStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFD700', // Updated color
    padding: 8,
  },
  paragraph: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  subheader: {
    margin: 10,
    fontSize: 14,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF1493', // Updated color
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700', // Updated color
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  h2: {
    margin: 10,
    fontSize: 16,
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF1493', // Updated color
  },
  purpleButton: {
    backgroundColor: '#FF1493', // Updated color
    padding: 5,
    borderRadius: 5,
  },
  whiteButtonText: {
    margin: 10,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});



