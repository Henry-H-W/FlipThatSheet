import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const SheetMusicRow = ({ name }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{name}</Text>

      <TouchableOpacity
        onPress={() => console.log("opened")}
        style={styles.iconContainer}
      >
        <Ionicons name="arrow-forward-circle-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 20,
  },
});

export default SheetMusicRow;
