import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import { images } from "../utils/sortedImages";

export default function ImagesScreen() {
  function renderItem({ item }) {
    return (
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    margin: 2,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
});
