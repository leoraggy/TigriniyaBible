import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useMemo } from "react";
import { images } from "../utils/sortedImages";
import ImageViewing from "react-native-image-viewing";

export default function ImagesScreen() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageViewingData = useMemo(
    () =>
      images.map((item) => ({
        uri: Image.resolveAssetSource(item.image).uri,
      })),
    []
  );

  const openImageViewer = (index) => {
    setCurrentIndex(index);
    setVisible(true);
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
      <ImageViewing
        images={imageViewingData}
        imageIndex={currentIndex}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        swipeToCloseEnabled={true}
        doubleTapToZoomEnabled={true}
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
