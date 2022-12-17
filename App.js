import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, useWindowDimensions, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  NunitoSans_300Light,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";
import Colors from "./utils/Colors";
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [gameState, setGameState] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [rounds, setRounds] = useState(0);
  const [finalGuess, setFinalGuess] = useState(null);
  const { height } = useWindowDimensions();

  // USING THE FONTS
  let [fontsLoaded] = useFonts({
    NunitoSans_300Light,
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // STYLING
  let paddingV = 50;

  if (height < 400) {
    paddingV = 0;
  }

  const changeGameState = (value) => {
    setGameState(true);
    setUserInput(value);
  };

  const gameOverState = (finalGuess, rounds) => {
    setGameState(false);
    setUserInput("");
    setFinalGuess(finalGuess);
    setRounds(rounds);
  };

  const startNewGameHandler = () => {
    setGameState(false);
    setFinalGuess(null);
    setRounds(0);
    setUserInput("");
  };

  return (
    <LinearGradient
      colors={Platform.select({
        ios: [Colors.light, Colors.violet],
        android: [Colors.beige1, Colors.purple],
      })}
      style={[styles.mainComponent, { paddingVertical: paddingV }]}
    >
      {/* START SCREEN */}
      {!gameState && !finalGuess && (
        <StartScreen onHideScreen={changeGameState} />
      )}

      {/* GAME SCREEN */}
      {gameState && (
        <GameScreen userInput={userInput} onGameOver={gameOverState} />
      )}

      {/* GAME OVER SCREEN */}
      {!gameState && finalGuess && (
        <GameOverScreen
          number={finalGuess}
          rounds={rounds}
          onStartNewGame={startNewGameHandler}
        />
      )}

      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainComponent: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
});
