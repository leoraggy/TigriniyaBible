import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SectionList,
  TouchableOpacity,
} from "react-native";
import { chunkArray } from "../data";

export default function Chapters({
  handlePage,
  handleOldVisible,
  handleNewVisible,
  chapters,
}) {
  function renderItem({ item, section }) {
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
                handlePage(pageNum);
                handleOldVisible(false);
                handleNewVisible(false);
              }}
            >
              <Text style={styles.buttonText}>{title.toString()}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <View style={{ paddingTop: "15%" }}>
      <SectionList
        sections={chapters.map((section) => ({
          ...section,
          data: chunkArray(section.data, 5),
        }))}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
});
