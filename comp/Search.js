import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Search({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://192.168.0.47:3000/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const openChat = async (user) => {
    try {
      await AsyncStorage.setItem('SenderName', user.Username);
      await AsyncStorage.setItem('SenderMail', user.Mail);

      const senderUsername = await AsyncStorage.getItem('username');
      if (!senderUsername) {
        console.error('Sender username not found in AsyncStorage');
        return;
      }
      navigation.navigate('Chat', { sender: senderUsername, receiver: user.Username });
    } catch (error) {
      console.error('Error navigating to chat or saving to AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openChat(item)} style={styles.userItem}>
            <Text style={styles.text}>{item.Username}</Text>
            <Text style={styles.email}>{item.Mail}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  userItem: {
    backgroundColor: '#e7e7e7',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
});
