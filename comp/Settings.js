import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Settings({ navigation }) {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const toggleNotificationsSwitch = () => {
    setIsNotificationsEnabled((previousState) => !previousState);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.settingItem}>
        <MaterialIcons name="notifications" size={24} color="black" />
        <Text style={styles.settingText}>Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isNotificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleNotificationsSwitch}
          value={isNotificationsEnabled}
          style={styles.switch}
        />
      </View>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => {
          /* Handle press */
        }}
      >
        <MaterialIcons name="account-circle" size={24} color="black" />
        <Text style={styles.settingText}>Account Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => {
          /* Handle press */
        }}
      >
        <MaterialIcons name="privacy-tip" size={24} color="black" />
        <Text style={styles.settingText}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <MaterialIcons name="exit-to-app" size={24} color="black" />
        <Text style={styles.settingText}>Log Out</Text>
      </TouchableOpacity>
      {/* Add more settings items with icons here */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingHorizontal: 15,
  },
  settingText: {
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
  switch: {
    // Optional: Adjust if you need specific styles for the switch
  },
  // Add any additional styles you may need
});
