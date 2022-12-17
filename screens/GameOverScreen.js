import React from "react";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import GameText from "../components/GameText";
import ReusableBtn from "../components/ReusableBtn";
import Colors from "../utils/Colors";

const GameOverScreen = ({ number, rounds, onStartNewGame }) => {
  const { width, height } = useWindowDimensions();

  let firstLineFS = 30;
  let secondLineFS = 20;
  let thirdLineFS = 25;
  let highlightedFS = 38;
  let firstLineMarginTop = 70;
  let marginTop = 50;
  let btnMarginTop = 50;
  let btnPaddingH = 30;
  let btnPaddingV = 15;

  if (width < 380) {
    firstLineFS = 20;
    secondLineFS = 16;
    thirdLineFS = 18;
    highlightedFS = 23;
    firstLineMarginTop = 10;
    marginTop = 30;
    btnMarginTop = 30;
    btnPaddingH = 20;
    btnPaddingV = 10;
  }

  if (height < 400) {
    firstLineMarginTop = 40;
    marginTop = 25;
    btnMarginTop = 35;
  }

  if (height < 350) {
    firstLineMarginTop = 40;
    firstLineFS = 20;
    highlightedFS = 26;
    secondLineFS = 17;
    thirdLineFS = 19;
    marginTop = 15;
    btnMarginTop = 25;
    btnPaddingH = 22;
    btnPaddingV = 8;
  }

  // DISPLAYING TEXT DEPENDING ON THE NUMBER OF ROUNDS

  const displaySuitableText = (name) => {
    const textOptions = {
      rock: (
        <>
          'I rock'{" "}
          <FontAwesome5
            name="hand-rock"
            size={40}
            color={Platform.select({ ios: "#2B4865", android: "#F8EDE3" })}
          />
        </>
      ),
      meh: (
        <>
          I could do better...{" "}
          <FontAwesome5
            name="meh-rolling-eyes"
            size={40}
            color={Platform.select({ ios: "#2B4865", android: "#F8EDE3" })}
          />
        </>
      ),
      sad: (
        <>
          I was kinda... slow{" "}
          <Ionicons
            name="ios-sad-outline"
            size={40}
            color={Platform.select({ ios: "#2B4865", android: "#F8EDE3" })}
          />
        </>
      ),
      cry: (
        <>
          It sucks{" "}
          <FontAwesome5
            name="sad-cry"
            size={35}
            color={Platform.select({ ios: "#2B4865", android: "#F8EDE3" })}
          />
        </>
      ),
    };

    return textOptions[name];
  };

  return (
    <View style={styles.container}>
      {/* DISPLAYING THE CORRECT GUESS */}
      <GameText
        style={[
          styles.firstLine,
          {
            fontSize: firstLineFS,
            marginTop: firstLineMarginTop,
          },
        ]}
      >
        Oh, so the picked number was{" "}
        <Text style={[styles.highlightedNumber, { fontSize: highlightedFS }]}>
          {number}{" "}
        </Text>
        !
      </GameText>

      {/* DISPLAYING THE NUMBER OF ROUNDS */}
      <GameText
        style={[
          styles.secondLine,
          { fontSize: secondLineFS, marginTop: marginTop },
        ]}
      >
        It took me{" "}
        <Text style={[styles.highlightedRounds, { fontSize: highlightedFS }]}>
          {rounds}
        </Text>{" "}
        rounds to make the correct guess!
      </GameText>

      {/* DISPLAYING THE CONCLUSION DEPENDING ON THE NUMBER OF ROUNDS */}
      <GameText
        style={[
          styles.thirdLine,
          { fontSize: thirdLineFS, marginTop: marginTop },
        ]}
      >
        {rounds <= 3 ? displaySuitableText("rock") : ""}
        {rounds > 3 && rounds <= 6 ? displaySuitableText("meh") : ""}
        {rounds > 6 && rounds <= 9 ? displaySuitableText("sad") : ""}
        {rounds > 9 ? displaySuitableText("cry") : ""}
      </GameText>

      {/* START NEW GAME BUTTON */}
      <ReusableBtn
        onPress={onStartNewGame}
        style={[
          styles.restartBtn,
          {
            marginTop: btnMarginTop,
            paddingHorizontal: btnPaddingH,
            paddingVertical: btnPaddingV,
          },
        ]}
      >
        Play Again
      </ReusableBtn>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  firstLine: {
    fontFamily: "NunitoSans_600SemiBold",
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: Platform.select({ ios: Colors.lilac, android: Colors.beige2 }),
    borderRadius: 10,
  },

  highlightedNumber: {
    fontFamily: "NunitoSans_700Bold",
    color: Platform.select({ ios: Colors.yellow, android: Colors.lilac }),
  },

  highlightedRounds: {
    fontFamily: "NunitoSans_700Bold",
    color: Platform.select({ ios: Colors.lilac, android: Colors.beige2 }),
  },

  secondLine: {
    fontFamily: "NunitoSans_600SemiBold",
    paddingHorizontal: 20,
  },

  thirdLine: {
    fontFamily: "NunitoSans_600SemiBold",
    paddingHorizontal: 20,
  },

  restartBtn: {
    alignSelf: "center",
    backgroundColor: Platform.select({
      ios: Colors.yellow,
      android: Colors.palePurple,
    }),
    borderRadius: 10,
    border: "none",
    elevation: 3,
  },
});
