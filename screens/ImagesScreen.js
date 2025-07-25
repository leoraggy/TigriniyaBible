import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState, useMemo } from "react";
import { images } from "../utils/sortedImages";
import ImageCarousel from "../components/ImageCarousel";

export default function ImagesScreen() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openImageViewer = (index) => {
    setCurrentIndex(index);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  function renderItem({ item, index }) {
    return (
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => openImageViewer(index)}>
          <Image source={item.image} style={styles.image} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString()}
        numColumns={3}
      />

      <Modal visible={visible} transparent={true} onRequestClose={closeModal}>
        <ImageCarousel currentIndex={currentIndex} onClose={closeModal} />
      </Modal>
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
  header: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
});
