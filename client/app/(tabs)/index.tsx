import {
  Image,
  StyleSheet,
  Platform,
  FlatList,
  View,
  Text,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import SheetMusicRow from "@/components/SheetMusicRow";
import React from "react";

const sheetMusicData = [
  { id: "1", name: "Prelude in C Major" },
  { id: "2", name: "Moonlight Sonata" },
  { id: "3", name: "Für Elise" },
  // Add more sheet music items here
];
export default function HomeScreen() {
  return (
    <View style={styles.background}>
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
      {/* </View> */}
    </View>
    // </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#F5F5DC",
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
  titleContainer: {
    // flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  flatList: {
    flex: 1,
    backgroundColor: "#F5F5DC",
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
