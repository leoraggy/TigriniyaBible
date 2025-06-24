import { useState, useLayoutEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { oldTestamentChapters, newTestamentChapters } from "../data";
import Icon from "react-native-vector-icons/MaterialIcons";
import BiblePDF from "../components/BiblePDF";
import Chapters from "../components/Chapters";
import Controls from "../components/Controls";

export default function BibleScreen({ navigation }) {
  const [page, setPage] = useState(1); // Current page state
  const [controlsVisible, setControlsVisible] = useState(false);
  const [oldVisible, setOldVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false); //725

  const handleOldVisible = (visible) => {
    setOldVisible(visible);
  };

  const handleNewVisible = (visible) => {
    setNewVisible(visible);
  };

  const handleControlsVisible = (visible) => {
    setControlsVisible(visible);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => {
            setControlsVisible(!controlsVisible);
          }}
        >
          <Icon name="menu" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, controlsVisible]);

  return (
    <View style={styles.container}>
      {/* Toggle TouchableOpacity style={styles.button}*/}
      {(oldVisible || newVisible) && (
        <TouchableOpacity
          style={styles.toggleTouchableOpacity}
          onPress={() => {
            setOldVisible(false);
            setNewVisible(false);
          }}
        >
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      )}
      <BiblePDF page={page} />
      {/* Navigation TouchableOpacitys */}
      {controlsVisible && (
        <Controls
          handlePage={handlePage}
          handleControlsVisible={handleControlsVisible}
          handleOldVisible={handleOldVisible}
          handleNewVisible={handleNewVisible}
        />
      )}
      {oldVisible && (
        <Chapters
          handleOldVisible={handleOldVisible}
          handleNewVisible={handleNewVisible}
          handlePage={handlePage}
          chapters={oldTestamentChapters}
        />
      )}
      {newVisible && (
        <Chapters
          handleOldVisible={handleOldVisible}
          handleNewVisible={handleNewVisible}
          handlePage={handlePage}
          chapters={newTestamentChapters}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  toggleTouchableOpacity: {
    position: "absolute",
    left: 10,
    width: 40,
    height: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    zIndex: 10,
  },
});
