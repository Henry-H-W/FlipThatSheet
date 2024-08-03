import {
  Image,
  StyleSheet,
  Platform,
  FlatList,
  View,
  Text,
} from "react-native";

import SheetMusicRow from "@/components/SheetMusicRow";
import React from "react";
import TopBar from "@/components/navigation/navbar";

const sheetMusicData = [
  { id: "1", name: "Prelude in C Major" },
  { id: "2", name: "Moonlight Sonata" },
  { id: "3", name: "Für Elise" },
  // Add more sheet music items here
];
export default function HomeScreen() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: "#F5F5DC",
    }}>
      <TopBar/>
    <View style={styles.background}>
      <View style={styles.inner}>
        <View style={styles.titleContainer}>
          <Text style={{ color: "#ebc221", fontWeight: 500, fontSize: 30 }}>
            FLIP THAT SHEET
          </Text>
        </View>
        {/* <View style={styles.titleContainer}> */}
        <FlatList
          data={sheetMusicData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SheetMusicRow name={item.name} />}
          style={styles.flatList}
        />
      </View>
      {/* </View> */}
    </View>
    </View>
    // </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#F5F5DC",
    padding: 20,
  },
  inner: {
    flex: 1,
    backgroundColor: "#fff4b5",
    borderWidth: 5,
    borderColor: "#fcda17",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
  titleContainer: {
    alignItems: "center",
    gap: 8,
  },
  flatList: {
    flex: 1,
    backgroundColor: "#fff4b5",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
