import React, { useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
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

  // Helper function to chunk array into groups of 5
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  function renderOld({ item, section }) {
    return (
      <View style={styles.row}>
        {item.map((pageNum, index) => {
          const globalIndex = section.data.flat().indexOf(pageNum);
          const title = globalIndex + 1;
          return (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => {
                setPage(pageNum);
                setOldVisible(false);
                setNewVisible(false);
              }}
            >
              <Text style={styles.buttonText}>{title.toString()}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  function renderNew({ item, section }) {
    return (
      <View style={styles.row}>
        {item.map((pageNum, index) => {
          const globalIndex = section.data.flat().indexOf(pageNum);
          const title = globalIndex + 1;
          return (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => {
                setPage(pageNum);
                setOldVisible(false);
                setNewVisible(false);
              }}
            >
              <Text style={styles.buttonText}>{title.toString()}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
              style={styles.button2}
              title="Old Testament"
              onPress={() => {
                setOldVisible(true);
                setControlsVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Old Testament</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
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
              sections={oldTestamentChapters.map((section) => ({
                ...section,
                data: chunkArray(section.data, 5),
              }))}
              renderItem={renderOld}
              keyExtractor={(item, index) => `old-${index}`}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
              )}
            />
          </View>
        )}
        {newVisible && (
          <View style={{ paddingTop: "15%" }}>
            <SectionList
              sections={newTestamentChapters.map((section) => ({
                ...section,
                data: chunkArray(section.data, 5),
              }))}
              renderItem={renderNew}
              keyExtractor={(item, index) => `new-${index}`}
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
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 1,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#e50000",
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: (Dimensions.get("window").width - 60) / 5, // Calculate width for 5 columns
    height: (Dimensions.get("window").width - 60) / 5, // Same as width for square
  },
  button2: {
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
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
    padding: 10,
  },
});
