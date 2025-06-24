import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";

export default function Controls({
  handleControlsVisible,
  handleOldVisible,
  handleNewVisible,
  handlePage,
}) {
  const [inputValue, setInputValue] = useState(""); // Tracks user input

  // Handles user input but DOES NOT change the page yet
  const handleChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, ""); // Allow only numbers
    setInputValue(numericValue);
  };

  // Trigger page change when user presses Enter (Done TouchableOpacity)
  const handleSubmit = () => {
    const pageNumber = parseInt(inputValue, 10);
    if (!isNaN(pageNumber) && pageNumber > 0) {
      handlePage(pageNumber); // Now update the actual PDF page
    }
    if (!isNaN(pageNumber) && pageNumber > 1184) {
      handlePage(1184);
    }
    handleControlsVisible(false);
  };

  const openOldChapters = () => {
    handleControlsVisible(false);
    handleOldVisible(true);
  };

  const openNewChapters = () => {
    handleControlsVisible(false);
    handleNewVisible(true);
  };

  return (
    <View style={styles.touchableOpacityContainer}>
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
      <TouchableOpacity style={styles.button} onPress={openOldChapters}>
        <Text style={styles.buttonText}>Old Testament</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={openNewChapters}>
        <Text style={styles.buttonText}>New Testament</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  touchableOpacityContainer: {
    position: "absolute",
    top: "10%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    paddingTop: "15%",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#e50000",
    margin: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
});
