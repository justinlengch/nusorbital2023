import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity, Text, SafeAreaView, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo } from '@expo/vector-icons';

import colors from '../colors';
import Game1 from './Game1';


export default function Chat() {

  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
    
  useEffect(() => {
    navigation.setOptions({
        headerRight: () => (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress = {() => navigation.navigate("Game1")} style={styles.gamesButton}>
                    <AntDesign name="play" size={25} color={colors.cream} style={{marginRight: 0}}/>
                </TouchableOpacity>
            </SafeAreaView>
        ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const chatcollectionRef = collection(database, 'chats');
    const q = query(chatcollectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const transformedMessages = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        transformedMessages.push({
          _id: doc.id,
          createdAt: data.createdAt.toDate(),
          text: data.text,
          user: data.user,
        });
      });

      setMessages(transformedMessages);
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];    
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user
    });
  }, []);

  return (
    
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={messages => onSend(messages)}
      messagesContainerStyle={{
      backgroundColor: '#fff'
      }}
      textInputStyle={{
        backgroundColor: '#fff',
        borderRadius: 20,
      }}
      user={{
        _id: auth?.currentUser?.email,
        avatar: 'https://i.pravatar.cc/300'
       
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      backgroundColor: "#fff",
  },
  chatButton: {
      backgroundColor: colors.primary,
      height: 50,
      width: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.primary,
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: .9,
      shadowRadius: 8,
      marginRight: 20,
      marginBottom: 50,
  },
  gamesButton: {
      backgroundColor: colors.primary,
      height: 50,
      width: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.primary,
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: .9,
      shadowRadius: 8,
      marginRight: 20,
      marginTop: 50,
  },
  logoutButton: {
      backgroundColor: colors.primary,
      height: 50,
      width: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.primary,
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: .9,
      shadowRadius: 8,
      marginLeft: 20,
      marginTop: 50,
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'center',
      justifyContent: 'center'
  }
});
