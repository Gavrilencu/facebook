import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'; // Importați SafeAreaProvider și useSafeAreaInsets

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [myMail, setMyMail] = useState('');
  const [senderMail, setSenderMail] = useState('');
  const [senderName, setSenderName] = useState('');

  useEffect(() => {
    const init = async () => {
      const myMailStored = await AsyncStorage.getItem('MyMail');
      const senderMailStored = await AsyncStorage.getItem('SenderMail');
      const senderNameStored = await AsyncStorage.getItem('SenderName');
      if (myMailStored && senderMailStored && senderNameStored) {
        setMyMail(myMailStored);
        setSenderMail(senderMailStored);
        setSenderName(senderNameStored); // Setați numele expeditorului din AsyncStorage
      }

      const newWs = new WebSocket('ws://192.168.0.47:3000');
      newWs.onopen = () => {
        console.log('WebSocket connection opened');
        setWs(newWs);
      };

      newWs.onerror = (e) => {
        console.error(`WebSocket error: ${e.message}`);
      };

      newWs.onclose = () => {
        console.log('WebSocket connection closed');
      };

      newWs.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);

        // Verificăm dacă mesajul primit nu există deja în listă
        if (!messages.some((msg) => msg.text === receivedMessage.text)) {
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
      };
      
      // Solicitați mesajele de la server atunci când componenta se încarcă
      fetchMessages();
    };

    init();
  }, []);

  const fetchMessages = async () => {
    try {
      // Faceți o cerere GET către server pentru a obține mesajele
      const response = await fetch(`http://192.168.0.47:3000/messages?myMail=${myMail}&senderMail=${senderMail}`);
      if (response.ok) {
        const data = await response.json();
        // Actualizați starea cu mesajele primite de la server
        setMessages(data);
      } else {
        console.error('Eroare la obținerea mesajelor:', response.status);
      }
    } catch (error) {
      console.error('Eroare la obținerea mesajelor:', error);
    }
  };

  const sendMessage = () => {
    if (message.trim() && ws) {
      const newMessage = {
        sender: myMail,
        receiver: senderMail,
        text: message,
      };

      ws.send(JSON.stringify(newMessage));
      setMessage(''); // Ștergeți mesajul din TextInput după trimitere, astfel încât să nu fie adăugat de două ori în listă
    }
  };

  const flatListRef = useRef();

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const insets = useSafeAreaInsets(); // Obțineți informații despre zona sigură

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{senderName}</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.innerContainer}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageContainer,
                  item.sender === myMail ? styles.messageSent : styles.messageReceived,
                ]}
              >
                <Text style={styles.senderName}>
                  {item.sender === myMail ? 'Me' : senderName}
                </Text>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
            style={styles.messageList}
            onContentSizeChange={() => {
              if (flatListRef.current) {
                flatListRef.current.scrollToEnd({ animated: true });
              }
            }}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message"
              placeholderTextColor="#7b7b7b"
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Icon name="send" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
     paddingTop: Platform.OS === 'android' ? 25 : 0, // Nu mai este nevoie de această linie
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  messageSent: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    maxWidth: '80%',
  },
  messageReceived: {
    alignSelf: 'flex-start',
    backgroundColor: '#e4e6eb',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    maxWidth: '80%',
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {},
  senderName: {
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    backgroundColor: '#f0f2f5',
    color: '#000',
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
