import { StyleSheet, Text, View } from "react-native";

export default function BiblePDF() {
  const PdfResource = {
    uri: "https://drive.google.com/uc?export=download&id=1Qx_ybnljPVA-TqR6gnZ8axCtBqUud-k2",
    cache: true,
  };

  return (
    <View>
      <Text>BiblePDF</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
