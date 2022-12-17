import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  useWindowDimensions,
  Platform,
} from "react-native";
import Colors from "../utils/Colors";
import ReusableBtn from "./ReusableBtn";

const Input = ({ onGetUserInput }) => {
  const [inputValue, setInputValue] = useState("");

  // STYLING
  const { width, height } = useWindowDimensions();
  let marginTContainer = 50;
  let marginTButtonsContainer = 50;
  let fontSizeInput = 60;
  let inputHeight = 70;
  let inputWidth = 100;
  let btnPaddingV = 15;
  let btnPaddingH = 20;

  if (width < 380) {
    marginTContainer = 20;
    marginTButtonsContainer = 30;
    fontSizeInput = 38;
    inputHeight = 50;
    inputWidth = 60;
    btnPaddingV = 10;
    btnPaddingH = 12;
  }

  if (height < 400) {
    marginTContainer = 20;
    marginTButtonsContainer = 30;
    btnPaddingV = 10;
    btnPaddingH = 12;
  }

  if (height < 350) {
    marginTContainer = 15;
    marginTButtonsContainer = 30;
    fontSizeInput = 40;
    inputHeight = 60;
    inputWidth = 70;
    btnPaddingV = 10;
    btnPaddingH = 12;
  }

  // GETTING INPUT VALUE
  const getInputValue = (enteredText) => {
    setInputValue(enteredText);
  };

  const passUserInputHandler = () => {
    // INPUT VALIDATION
    if (
      inputValue.trim().length === 0 ||
      isNaN(inputValue) ||
      inputValue < 1 ||
      inputValue > 99 ||
      inputValue.startsWith("0")
    ) {
      Alert.alert(
        "Error!",
        "Please enter a number between 1 and 99",
        [
          {
            text: "OK",
            style: "default",
          },
        ],
        { cancelable: true }
      );
      setInputValue("");
      return;
    }

    onGetUserInput(inputValue);
  };

  // RESETTING INPUT VALUE
  const resetUserInputHandler = () => {
    setInputValue("");
    return;
  };

  return (
    <View style={[styles.mainContainer, { marginTop: marginTContainer }]}>
      <TextInput
        style={[
          styles.input,
          { fontSize: fontSizeInput, height: inputHeight, width: inputWidth },
        ]}
        maxLength={2}
        keyboardType="number-pad"
        onChangeText={getInputValue}
        value={inputValue}
      />
      <View
        style={[styles.btnsContainer, { marginTop: marginTButtonsContainer }]}
      >
        <ReusableBtn
          style={[
            styles.btnContainer,
            { paddingVertical: btnPaddingV, paddingHorizontal: btnPaddingH },
          ]}
          onPress={resetUserInputHandler}
        >
          Reset
        </ReusableBtn>
        <ReusableBtn
          style={[
            styles.btnContainer,
            { paddingVertical: btnPaddingV, paddingHorizontal: btnPaddingH },
          ]}
          onPress={passUserInputHandler}
        >
          Start
        </ReusableBtn>
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  mainContainer: {
    width: "90%",
    alignSelf: "center",
  },

  input: {
    alignSelf: "center",
    borderBottomWidth: 3,
    borderBottomColor: Platform.select({
      ios: Colors.light,
      android: Colors.beige2,
    }),
    fontFamily: "NunitoSans_700Bold",
    textAlign: "center",
    color: Platform.select({ ios: Colors.darkGrey, android: Colors.beige2 }),
  },

  btnsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  btnContainer: {
    width: "40%",
    backgroundColor: Colors.palePurple,
    borderRadius: 10,
    elevation: 3,
  },
});
