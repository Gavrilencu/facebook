import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername } = useContext(AppContext);
  const { username } = useContext(AppContext); // Folosește doar setUsername, deoarece username-ul va fi setat aici
  const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername && !isInitialCheckDone) {
          navigation.navigate("Home");
        }
        setIsInitialCheckDone(true);
      } catch (error) {
        console.error("Error retrieving username", error);
      }
    };

    if (!isInitialCheckDone) {
      checkUsername();
    }
  }, [isInitialCheckDone, navigation]);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://gavrilencu.com/authorization/Token?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`
      );

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Expected JSON response, received: ${contentType}`);
      }

      const data = await response.json();
      if (data.username) {
        setUsername(data.username); // Setează username-ul în context
        await AsyncStorage.setItem("username", data.username);
        navigation.navigate("Home");
      } else {
        alert("Username not received from server");
      }
    } catch (error) {
      console.error("Login error", error);
      alert(`Login error: ${error.message}`);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

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
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>Register Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff", // White background
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333", // Dark text for title
  },
  input: {
    width: "100%",
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: "#007bff", // Blue border for inputs
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff", // Blue button
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff", // White text for button
    fontSize: 16,
  },
  registerContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  registerText: {
    marginBottom: 10,
    color: "#666", // Gray text
  },
  registerLink: {
    color: "#007bff", // Blue link text
    fontWeight: "bold",
  },
});
