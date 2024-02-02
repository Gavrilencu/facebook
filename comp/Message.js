import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Message({ navigation }) {
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const myUsername = await AsyncStorage.getItem('username');
        if (!myUsername) {
          console.error('Username not found in AsyncStorage');
          return;
        }

        const response = await fetch(`http://192.168.0.47:3000/myMessages/${myUsername}`);
        const data = await response.json();
        setUsernames(data);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };

    fetchUsernames();
  }, []);

  const openChat = async (receiverUsername) => {
    try {
      const myUsername = await AsyncStorage.getItem('username');
      if (!myUsername) {
        console.error('Username not found in AsyncStorage');
        return;
      }
      navigation.navigate('Chat', { sender: myUsername, receiver: receiverUsername });
    } catch (error) {
      console.error('Error navigating to chat:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={usernames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openChat(item.Username)}>
            <Text style={styles.text}>{item.Username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // stilurile rămân neschimbate
});
