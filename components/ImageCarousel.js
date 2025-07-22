import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { images } from "../utils/sortedImages";
import { useState, useEffect, useRef } from "react";
const { width: screenWidth } = Dimensions.get("window");

export default function ImageCarousel({ currentIndex, onClose }) {
  const flatListRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (
      flatListRef.current &&
      currentIndex >= 0 &&
      currentIndex < images.length
    ) {
      // Small delay to ensure FlatList is fully rendered
      setTimeout(() => {
        flatListRef.current.scrollToIndex({
          index: currentIndex,
          animated: false,
        });
        // Show the FlatList after scrolling
        setIsVisible(true);
      }, 50);
    }
  }, [currentIndex]);

  const handleLayout = () => {
    // Trigger the scroll after layout
    if (!isVisible) {
      setTimeout(() => {
        if (
          flatListRef.current &&
          currentIndex >= 0 &&
          currentIndex < images.length
        ) {
          flatListRef.current.scrollToIndex({
            index: currentIndex,
            animated: false,
          });
          setIsVisible(true);
        }
      }, 10);
    }
  };

  function renderItem({ item, index }) {
    return (
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString()}
        horizontal={true}
        snapToAlignment="center"
        snapToInterval={screenWidth}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onLayout={handleLayout}
        style={{ opacity: isVisible ? 1 : 0 }} // Hide until positioned correctly
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
      />

      {/* Close button in top corner */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  backgroundClose: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  imageContainer: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    zIndex: 2, // Ensure images are above the background TouchableOpacity
  },
  image: {
    width: screenWidth,
    height: screenWidth,
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 3,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
