import React, { useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  Text,
  SectionList,
} from "react-native";
import { oldTestamentChapters, newTestamentChapters } from "../data";
import Pdf from "react-native-pdf";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function BibleScreen({ navigation }) {
  const [page, setPage] = useState(1); // Current page state
  const [inputValue, setInputValue] = useState(""); // Tracks user input
  const [controlsVisible, setControlsVisible] = useState(false);
  const [oldVisible, setOldVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false); //725

  const PdfResource = {
    uri: "https://drive.google.com/uc?export=download&id=1Qx_ybnljPVA-TqR6gnZ8axCtBqUud-k2",
    // uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
    cache: true,
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

  function renderOld({ item, index }) {
    const title = index + 1;
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setPage(item);
          setOldVisible(false);
          setNewVisible(false);
        }}
      >
        <Text style={styles.buttonText}>{title.toString()}</Text>
      </TouchableOpacity>
    );
  }

  function renderNew({ item, index }) {
    const title = index + 1;
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setPage(item);
          setOldVisible(false);
          setNewVisible(false);
        }}
      >
        <Text style={styles.buttonText}>{title.toString()}</Text>
      </TouchableOpacity>
    );
  }
  // Handles user input but DOES NOT change the page yet
  const handleChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, ""); // Allow only numbers
    setInputValue(numericValue);
  };

  // Trigger page change when user presses Enter (Done TouchableOpacity)
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
          trustAllCerts={false}
        />
        {/* Navigation TouchableOpacitys */}
        {controlsVisible && (
          <View style={styles.TouchableOpacityContainer}>
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
            <TouchableOpacity
              style={styles.button}
              title="Old Testament"
              onPress={() => {
                setOldVisible(true);
                setControlsVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Old Testament</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setNewVisible(true);
                setControlsVisible(false);
              }}
            >
              <Text style={styles.buttonText}>New Testament</Text>
            </TouchableOpacity>
          </View>
        )}
        {oldVisible && (
          <View style={{ paddingTop: "15%" }}>
            <SectionList
              sections={oldTestamentChapters}
              renderItem={renderOld}
              keyExtractor={(i) => i.toString()}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
              )}
            />
          </View>
        )}
        {newVisible && (
          <View>
            <SectionList
              sections={newTestamentChapters}
              renderItem={renderNew}
              keyExtractor={(i) => i.toString()}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
}

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
  TouchableOpacityContainer: {
    position: "absolute",
    top: "10%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    paddingTop: "15%",
    borderRadius: 10,
  },
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
  button: {
    backgroundColor: "#e50000",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
    padding: 10,
  },
});
