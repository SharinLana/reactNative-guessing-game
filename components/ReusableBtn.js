import React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  useWindowDimensions,
  Platform,
} from "react-native";
import Colors from "../utils/Colors";

const ReusableBtn = ({ children, style, onPress }) => {
  const { width, height } = useWindowDimensions();
  let fontSize = 24;

  if (width < 380) {
    fontSize = 18;
  }

  if (height < 400) {
    fontSize = 20;
  }

  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.container, styles.pressed, style]
          : [styles.container, style]
      }
      android_ripple={{ color: Colors.violet }}
      onPress={onPress}
    >
      <Text style={[styles.btnText, { fontSize: fontSize }]}>{children}</Text>
    </Pressable>
  );
};

export default ReusableBtn;

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    shadowColor: Colors.darkGrey,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.4,
  },

  btnText: {
    textAlign: "center",
    fontFamily: "NunitoSans_600SemiBold",
    color: Platform.select({ ios: Colors.light, android: Colors.beige2 }),
  },

  pressed: {
    opacity: 0.5,
  },
});
