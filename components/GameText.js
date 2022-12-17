import React from "react";
import { StyleSheet, Text, useWindowDimensions } from "react-native";
import Colors from "../utils/Colors";

const GameText = ({ children, style }) => {
  const { width, height } = useWindowDimensions();
  let paddingHorizontal = 15;

  if (width < 380) {
    paddingHorizontal = 8;
  }

  if (height < 400) {
    paddingHorizontal = 30;
  }

  if (height <= 350) {
    paddingHorizontal = 0;
  }

  return (
    <Text
      style={[styles.text, style, { paddingHorizontal: paddingHorizontal }]}
    >
      {children}
    </Text>
  );
};

export default GameText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "NunitoSans_400Regular",
    textAlign: "center",
    color: Colors.darkGrey,
  },
});
