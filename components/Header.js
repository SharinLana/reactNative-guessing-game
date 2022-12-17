import React from "react";
import { StyleSheet, Text, useWindowDimensions } from "react-native";
import Colors from "../utils/Colors";

const Header = ({ children, style }) => {
  const { width, height } = useWindowDimensions();
  let marginT = 40;
  let padding = 10;
  let fontSize = 40;

  if (width < 380) {
    marginT = 10;
    padding = 5;
    fontSize = 26;
  }

  if (height < 400) {
    padding = 0;
    marginT = 10;
    fontSize = 30;
  }

  if (height < 350) {
    fontSize = 25;
    marginT = 5;
  }

  return (
    <Text
      style={[
        styles.header,
        style,
        { marginTop: marginT, padding: padding, fontSize: fontSize },
      ]}
    >
      {children}
    </Text>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    fontFamily: "NunitoSans_700Bold",
    color: Colors.lilac,
    textAlign: "center",
  },
});
