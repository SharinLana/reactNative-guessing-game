import React from "react";
import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import Colors from "../utils/Colors";

const GuessList = ({ guessedNum, round }) => {
  const { width, height } = useWindowDimensions();
  let marginV = 10;
  let paddingV = 8;
  let textFS = 17;

  if (width < 380) {
    marginV = 6;
    paddingV = 4;
    textFS = 15;
  }

  if (height <= 350) {
    marginV = 6;
    paddingV = 4;
    textFS = 15;
  }
  return (
    <View
      style={[
        styles.mainContainer,
        { marginVertical: marginV, paddingVertical: paddingV },
      ]}
    >
      <Text style={[styles.text, { fontSize: textFS }]}>#{round} </Text>
      <Text style={[styles.text, { fontSize: textFS }]}>{guessedNum}</Text>
    </View>
  );
};

export default GuessList;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.light,
    borderRadius: 10,
    paddingHorizontal: 20,
  },

  text: {
    color: Colors.lilac,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 17,
  },
});
