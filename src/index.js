import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { chapters } from "../data";
import Pdf from "react-native-pdf";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const PdfRead = () => {
  const [page, setPage] = useState(1); // Current page state
  const [inputValue, setInputValue] = useState(""); // Tracks user input
  const [controlsVisible, setControlsVisible] = useState(true);

  const PdfResource = {
    uri: "https://drive.google.com/uc?export=download&id=1Qx_ybnljPVA-TqR6gnZ8axCtBqUud-k2",
    cache: true,
  };
  function renderItem({ item, index }) {
    const title = index + 1;
    return <Button title={title.toString()} onPress={() => setPage(item)} />;
  }
  // Handles user input but DOES NOT change the page yet
  const handleChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, ""); // Allow only numbers
    setInputValue(numericValue);
  };

  // Trigger page change when user presses Enter (Done button)
  const handleSubmit = () => {
    const pageNumber = parseInt(inputValue, 10);
    console.log(pageNumber);
    if (!isNaN(pageNumber) && pageNumber > 0) {
      setPage(pageNumber); // Now update the actual PDF page
    }
    if (!isNaN(pageNumber) && pageNumber > 1184) {
      setPage(1184);
    }
  };

  return (
    <View style={styles.container}>
      {/* Toggle Button */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setControlsVisible(!controlsVisible)}
      >
        <Icon name="menu" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.pdfContainer}>
        <Pdf
          key={page}
          source={PdfResource}
          style={styles.pdf}
          page={page} // Navigates to the page when setPage updates
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onError={(error) => {
            console.log("Error loading PDF:", error);
          }}
        />
        {/* Navigation Buttons */}
        {controlsVisible && (
          <View>
            <FlatList
              data={chapters}
              renderItem={renderItem}
              keyExtractor={(i) => i.toString()}
            />
          </View>
        )}
        {false && (
          <View style={styles.buttonContainer}>
            {/* Search Bar (Goes to Page) */}
            <TextInput
              placeholder="Go To Page"
              value={inputValue}
              onChangeText={handleChange}
              onSubmitEditing={handleSubmit} // Fires when user presses "Enter/Done"
              style={styles.searchInput}
              keyboardType="numeric"
              returnKeyType="done" // Makes the keyboard show "Done"
            />
            <Button title="Old Testament" onPress={() => setPage(1)} />
            <Button title="New Testament" onPress={() => setPage(725)} />
          </View>
        )}
      </View>
    </View>
  );
};

export default PdfRead;

const styles = StyleSheet.create({
  container: { flex: 1 },
  pdfContainer: { flex: 1, width: "100%", height: "100%" },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchInput: {
    position: "absolute",
    left: 20,
    right: 20,
    backgroundColor: "white",
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    zIndex: 10, // Make sure it's above PDF
  },
  buttonContainer: {
    position: "absolute",
    top: "10%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    paddingTop: "15%",
    borderRadius: 10,
  },
  toggleButton: {
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
