import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Colors from "../utils/Colors";
import Header from "../components/Header";
import GameText from "../components/GameText";
import Input from "../components/Input";

const StartScreen = ({ onHideScreen }) => {
  const [userInput, setUserInput] = useState("");

  // STYLING
  const { width, height } = useWindowDimensions();
  let fontSizeHighlighted = 21;
  let textFontSize = 18;
  let marginTKeyboard = 0;

  if (width < 380) {
    fontSizeHighlighted = 15;
    textFontSize = 14;
  }

  if (height < 400) {
    fontSizeHighlighted = 20;
    marginTKeyboard = 30;
  }

  if (height <= 350) {
    fontSizeHighlighted = 17;
    textFontSize = 15;
    marginTKeyboard = 15;
  }

  // GETTING THE USER INPUT VALUE
  const getUserInput = (value) => {
    setUserInput(value);
  };

  // TO AVOID THE WARNING:
  // Warning: Cannot update a component <App> while rendering a different component <StartScreen>
  useEffect(() => {
    if (userInput) {
      onHideScreen(userInput);
    }
  }, [userInput]);

  return (
    <KeyboardAvoidingView
      style={[styles.mainContainer, { marginTop: marginTKeyboard }]}
      behavior={Platform.select({ ios: "position", android: "" })}
    >
      {/* HEADER */}
      <Header>Guessing Game</Header>

      {/* RULES */}
      <View style={styles.rulesContainer}>
        <GameText style={{ fontSize: textFontSize }}>
          How soon can your smartphone guess the number you picked?
        </GameText>
        {height > 400 && (
          <GameText style={{ fontSize: textFontSize }}>
            Let's find out!
          </GameText>
        )}
        <GameText style={{ fontSize: textFontSize }}>
          Enter a number between
          <Text style={[styles.highlighted, { fontSize: fontSizeHighlighted }]}>
            {" "}
            1
          </Text>{" "}
          and
          <Text style={[styles.highlighted, { fontSize: fontSizeHighlighted }]}>
            {" "}
            99
          </Text>
        </GameText>
        <GameText style={{ fontSize: textFontSize }}>
          and press the
          <Text style={[styles.highlighted, { fontSize: fontSizeHighlighted }]}>
            {" "}
            START{" "}
          </Text>
          button!
        </GameText>
      </View>

      {/* INPUT */}
      <Input onGetUserInput={getUserInput} />
    </KeyboardAvoidingView>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },

  rulesContainer: {
    marginTop: 15,
  },

  highlighted: {
    color: Colors.lilac,
    fontFamily: "NunitoSans_700Bold",
  },
});
