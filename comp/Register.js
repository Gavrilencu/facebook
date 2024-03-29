import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const registertoaccount = async () => {
        if (password !== repeatPassword) {
          alert("Passwords do not match");
          return;
        }
      
        try {
          const response = await fetch('http://192.168.0.47:3000/authentication', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              mail: email, // Modifică "email" în "mail" pentru a corespunde cu serverul
              username: username,
              password: password,
            }),
          });
      
          const data = await response.json();
          if (!response.ok) {
            alert(`Error: ${response.status} - ${data.message}`);
            return;
          }
      
          if (data.username) {
            await AsyncStorage.setItem('username', data.username);
            navigation.navigate('Home');
          } else {
            alert("Registration failed. Server did not return a username.");
          }
        } catch (error) {
          console.error("Registration error", error);
          alert(`Registration error: ${error.message}`);
        }
      };
      
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <TextInput 
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput 
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <TextInput 
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TextInput 
                style={styles.input}
                placeholder="Repeat Password"
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                secureTextEntry
            />

<TouchableOpacity style={styles.button} onPress={registertoaccount}>
  <Text style={styles.buttonText}>Register</Text>
</TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLink}>Login Here</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff', // White background
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333', // Dark text for title
    },
    input: {
        width: '100%',
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: '#007bff', // Blue border for inputs
        padding: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007bff', // Blue button
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff', // White text for button
        fontSize: 16,
    },
    loginContainer: {
        marginTop: 30,
        alignItems: 'center'
    },
    loginText: {
        marginBottom: 10,
        color: '#666', // Gray text
    },
    loginLink: {
        color: '#007bff', // Blue link text
        fontWeight: 'bold',
    },
});
