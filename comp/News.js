import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function News() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const openImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <TouchableOpacity onPress={() => openImage(item.imageUrl)}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <View style={styles.interactions}>
        <TouchableOpacity style={styles.likeButton}>
          <Icon name="thumbs-up" size={20} color="grey" />
          <Text>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commentButton}>
          <Icon name="comment" size={20} color="grey" />
          <Text>{item.comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Image
            source={{ uri: selectedImage }}
            style={styles.fullScreenImage}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Icon name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flexGrow: 1,
    paddingTop: 10,
    backgroundColor: "#f0f0f0",
  },
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  description: {
    fontSize: 16,
    padding: 15,
    paddingBottom: 5,
    color: "#2c3e50",
  },
  date: {
    fontSize: 14,
    paddingLeft: 15,
    paddingBottom: 10,
    color: "#2980b9",
  },
  interactions: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
    backgroundColor: "#ecf0f1",
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
});
