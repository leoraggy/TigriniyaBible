import { StyleSheet, View, Dimensions, Text } from "react-native";
import Pdf from "react-native-pdf";

export default function BiblePDF({ page }) {
  const PdfResource = {
    uri: "https://drive.google.com/uc?export=download&id=1Qx_ybnljPVA-TqR6gnZ8axCtBqUud-k2",
    cache: true,
  };

  return (
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
    </View>
  );
}

const styles = StyleSheet.create({
  pdfContainer: { flex: 1, width: "100%", height: "100%" },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
