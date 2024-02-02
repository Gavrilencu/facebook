import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import News from "./News";
import Message from "./Message";
import Settings from "./Settings";
import MyAccount from "./MyAccount";
import { AppContext } from "./AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Search from "./Search.js";

const Tab = createBottomTabNavigator();

export function Home() {
  const { setUsername } = useContext(AppContext);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        if (username !== null) {
          setUsername(username);
        }
      } catch (error) {
        console.error(
          "Eroare la încărcarea username-ului din AsyncStorage",
          error
        );
      }
    };

    fetchUsername();
  }, [setUsername]);

  return (
    <Tab.Navigator
      style={styles.app}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "News") {
            iconName = "article";
          } else if (route.name === "Message") {
            iconName = "message";
          } else if (route.name === "Settings") {
            iconName = "settings";
          } else if (route.name === "MyAccount") {
            iconName = "person";
          } else if (route.name === "Search") {
            iconName = "search";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#86B6F6",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "transparent",
          elevation: 5,
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="News" component={News} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Message" component={Message} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="MyAccount" component={MyAccount} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  app: {
    paddingTop: 20,
  },
});
