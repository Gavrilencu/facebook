import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AppContext } from "./AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

export default function MyAccount() {
  const { username } = useContext(AppContext);
  const isOnline = true;
  const profilePicture =
    "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1373"; // Replace with actual image URL

  // Exemplu de date pentru prieteni și postări
  const friends = [
    {
      id: "1",
      name: "Alice Johnson",
      profilePicture:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "2",
      name: "Bob Smith",
      profilePicture:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "3",
      name: "Carol White",
      profilePicture:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "4",
      name: "Dave Brown",
      profilePicture:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "5",
      name: "Eve Davis",
      profilePicture:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "6",
      name: "Frank Miller",
      profilePicture:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  const posts = [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1542370285-b8eb8317691c?q=80&w=2026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Descrierea postării 1.",
      date: "28 Dec 2023",
      likes: 102,
      comments: 10,
    },
    {
      id: "2",
      imageUrl:
        "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Descrierea postării 2.",
      date: "29 Dec 2023",
      likes: 150,
      comments: 20,
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Descrierea postării 2.",
      date: "29 Dec 2023",
      likes: 150,
      comments: 20,
    },
    // ... adăugați mai multe postări pentru a testa scroll-ul
  ];

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: profilePicture }} style={styles.profilePic} />
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.status}>{isOnline ? "Online" : "Offline"}</Text>

      <View style={styles.friendsSection}>
        <Text style={styles.sectionHeader}>Friends ({friends.length})</Text>
        <View style={styles.friendsRow}>
          {friends.slice(0, 3).map((friend) => (
            <View key={friend.id} style={styles.friendItem}>
              <Image
                source={{ uri: friend.profilePicture }}
                style={styles.friendImage}
              />
              <Text style={styles.friendName}>{friend.name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.friendsRow}>
          {friends.slice(3, 6).map((friend) => (
            <View key={friend.id} style={styles.friendItem}>
              <Image
                source={{ uri: friend.profilePicture }}
                style={styles.friendImage}
              />
              <Text style={styles.friendName}>{friend.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.postsSection}>
        <Text style={styles.sectionHeader}>Recent Posts</Text>
        {posts.map((post, index) => (
          <View key={index} style={styles.postContainer}>
            <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
            <Text style={styles.postDescription}>{post.description}</Text>
            <View style={styles.interactions}>
              <TouchableOpacity style={styles.likeButton}>
                <Icon name="thumbs-up" size={20} />
                <Text>{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.commentButton}>
                <Icon name="comment" size={20} />
                <Text>{post.comments}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#e1e4e8", // Border pentru profil
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2c3e50", // Nuanță închisă pentru text
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
    // Eliminați referința la isOnline aici
  },
  friendsSection: {
    marginBottom: 20,
    backgroundColor: "#fff", // Fundal alb pentru secțiune
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  friendsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  friendItem: {
    alignItems: "center",
    width: "33%",
  },
  friendImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  friendName: {
    fontSize: 14,
    textAlign: "center",
    color: "#34495e", // Nuanță închisă pentru nume
  },

  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50", // Nuanță închisă pentru titlul secțiunii
  },
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 16,
    color: "#34495e", // Nuanță închisă pentru descriere
  },
  interactions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});
