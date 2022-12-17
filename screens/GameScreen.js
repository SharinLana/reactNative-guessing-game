import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  FlatList,
  useWindowDimensions,
  Platform
} from "react-native";
import GameText from "../components/GameText";
import Header from "../components/Header";
import GuessList from "../components/GuessList";
import ReusableBtn from "../components/ReusableBtn";
import Colors from "../utils/Colors";

// GENERATING A RANDOM NUMBER
const getrandomNum = (min, max, original) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
let minNum = 1;
let maxNum = 100;

// COMPONENT FUNCTION

const GameScreen = ({ userInput, onGameOver }) => {
  // CALCULATING THE FIRST PHONE GUESS BETWEEN 1 AND 99
  let firstGuess = getrandomNum(1, 100, userInput);
  // PREVEINTING THE SUCCESS ON THE FIRST ROUND
  if (firstGuess == userInput) {
    firstGuess = getrandomNum(1, 100, userInput);
  }

  const [guess, setGuess] = useState(firstGuess);
  const [results, setResults] = useState([firstGuess]);

  // STYLING
  const { width, height } = useWindowDimensions();

  let paddingVertical = 15;
  let marginBottom = 20;
  let marginTop = 0;
  let guessFontSize = 45;
  let highlightedFontSize = 55;
  let hintFontSize = 26;
  let btnPaddingV = 15;
  let btnPaddingH = 26;

  // TRACKING THE UPDATES ON THE USER INPUT AND PHONE GUESSES
  useEffect(() => {
    if (guess == userInput) {
      onGameOver(guess, results.length);
    }
  }, [guess, userInput, onGameOver, results.length]);

  // RESETTING THE MIN AND MAX ON STARTING A NEW GAME
  useEffect(() => {
    minNum = 1;
    maxNum = 100;
  }, []);

  // 'HIGHER' AND 'LOWER' BUTTON HANDLERS
  const getDirectionHandler = (directions) => {
    // WRONG HINTS PREVENTION
    if (
      (directions === "higher" && guess > userInput) ||
      (directions === "lower" && guess < userInput)
    ) {
      Alert.alert(
        "Wrong hint!",
        "You are not playing fair!",
        [
          {
            text: "OK",
            style: "default",
          },
        ],
        { cancelable: true }
      );
      return;
    }

    if (directions === "higher") {
      minNum = guess + 1;
    }

    if (directions === "lower") {
      maxNum = guess;
    }

    let newNum = getrandomNum(minNum, maxNum, userInput);
    setGuess(newNum);
    setResults((previousResults) => [newNum, ...previousResults]);
  };

  // STYLING (REBUILDING THE COMPONENTS DUE TO THE SCREEN ORIENTATION)

  if (width < 380) {
    paddingVertical = 5;
    marginBottom = 0;
    guessFontSize = 28;
    highlightedFontSize = 40;
    hintFontSize = 20;
    btnPaddingV = 10;
    btnPaddingH = 18;
  }

  // PHONE GUESSES STYLING OPTIONS FOR THE PORTRAIT & LANDSCAPE ORIENTATION

  const getContent = (name) => {
    const options = {
      portrait: (
        <>
          <GameText style={[styles.guess, { fontSize: guessFontSize }]}>
            Is it{" "}
            <Text
              style={[styles.highlighted, { fontSize: highlightedFontSize }]}
            >
              {guess}{" "}
            </Text>
            ?
          </GameText>
          <GameText style={[styles.hint, { fontSize: hintFontSize }]}>
            Please give me a hint!
          </GameText>

          <View style={styles.btnsContainer}>
            {/* LOWER BUTTON */}
            <ReusableBtn
              style={[
                styles.regulator,
                {
                  paddingVertical: btnPaddingV,
                  paddingHorizontal: btnPaddingH,
                },
              ]}
              onPress={getDirectionHandler.bind(this, "lower")}
            >
              Lower
            </ReusableBtn>

            {/* HIGHER BUTTON */}
            <ReusableBtn
              style={[
                styles.regulator,
                {
                  paddingVertical: btnPaddingV,
                  paddingHorizontal: btnPaddingH,
                },
              ]}
              onPress={getDirectionHandler.bind(this, "higher")}
            >
              Higher
            </ReusableBtn>
          </View>
        </>
      ),

      landscape: (
        <>
          <View style={styles.landscapeContainer}>
            {/* LOWER BUTTON */}
            <ReusableBtn
              style={[
                styles.regulator,
                {
                  paddingVertical: btnPaddingV,
                  paddingHorizontal: btnPaddingH,
                },
              ]}
              onPress={getDirectionHandler.bind(this, "lower")}
            >
              Lower
            </ReusableBtn>

            {/* GUESSED NUMBER */}
            <GameText style={[styles.guess, { fontSize: guessFontSize }]}>
              Is it{" "}
              <Text
                style={[styles.highlighted, { fontSize: highlightedFontSize }]}
              >
                {guess}{" "}
              </Text>
              ?
            </GameText>

            {/* HIGHER BUTTON */}
            <ReusableBtn
              style={[
                styles.regulator,
                {
                  paddingVertical: btnPaddingV,
                  paddingHorizontal: btnPaddingH,
                },
              ]}
              onPress={getDirectionHandler.bind(this, "higher")}
            >
              Higher
            </ReusableBtn>
          </View>
        </>
      ),
    };

    return options[name];
  };

  if (height < 400) {
    guessFontSize = 40;
    highlightedFontSize = 45;
    btnPaddingV = 15;
    btnPaddingH = 32;
    marginTop = 30;
    getContent("landscape"); // here I applied that function
  }

  if (height <= 350) {
    paddingVertical = 5;
    guessFontSize = 26;
    highlightedFontSize = 32;
    btnPaddingV = 8;
    btnPaddingH = 16;
    marginTop = 30;
    getContent("landscape"); // here I applied that function
  }

  return (
    <View style={[styles.mainContainer, { marginTop: marginTop }]}>
      {/* HEADER */}
      <Header
        style={[
          styles.header,
          {
            paddingVertical: paddingVertical,
            marginBottom: marginBottom,
          },
        ]}
      >
        Your phone guess:
      </Header>

      {/* PHONE GUESS & HINT BUTTONS */}
      {height <= 400 ? getContent("landscape") : getContent("portrait")}

      {/* LIST OF GUESSES */}
      <View style={styles.listContainer}>
        <FlatList
          style={styles.flatList}
          data={results}
          keyExtractor={(results, index) => index.toString()}
          renderItem={(itemData) => {
            return (
              <GuessList
                guessedNum={itemData.item}
                round={results.length - itemData.index}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },

  landscapeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },

  header: {
    borderWidth: 2,
    borderColor: Colors.lilac,
    borderRadius: 10,
    color: Colors.lilac,
    paddingHorizontal: 20,
  },

  guess: {
    fontFamily: "NunitoSans_600SemiBold",
    marginTop: 10,
  },

  highlighted: {
    fontFamily: "NunitoSans_700Bold",
  },

  hint: {
    fontFamily: "NunitoSans_400Regular",
    marginTop: 20,
    color: Platform.select({ios: Colors.violet, android: Colors.light}),
  },

  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 20,
  },

  regulator: {
    backgroundColor: Colors.lilac,
    borderRadius: 10,
    border: "none",
  },

  listContainer: {
    flex: 5,
    width: "75%",
    marginTop: 10,
    marginBottom: 10,
  },

  flatList: {
    width: "100%",
    paddingHorizontal: 20,
  },
});
