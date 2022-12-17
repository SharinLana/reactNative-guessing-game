# Guessing Game (React Native)

> This mobile app is a game in which the user's smartphone has to correctly guess the number picked by the user.

## The goals of creating this application:

The main goals for me as a web developer were to improve my skills in working with:

- the React Native components, such as View, Text, TextInput, Alert, Pressable, FlatList, StyleSheet, KeyboardAvoidingView;
- creating custom reusable components (button, header, text);
- the React Native hook useWindowDimensions() to adjust the app style to both portrait and landscape orientation;
- the React Native module Platform and its method select() to detect the platform in which the app is running on and apply different color palette for iOS and Android;
- the React props;
- the React hooks such as useState() and useEffect();
- JS logic and methods (ternary operator, Math.floor(), Math.random(), if/else statement, spread operator, etc) to create the game functionalities and handle the user input data.
- the "expo-google-fonts" package to apply Google font Nunito Sans;
- "@expo/vector-icons" package (https://icons.expo.fyi/) to use some icons from there;
- "expo-linear-gradient" package to apply a linear gradient on the app body;

## To start the app on your machine:

1. Clone the project to your machine by running:

```
git clone https://github.com/SharinLana/reactNative-guessing-game.git
```

2. To install the project dependencies, run:

```
npm install
```

3. When the installation is complete, run the following command to start the app:

```
npm start
```

4. Download and install Android Studio and Xcode, select simulators, and then, to run the app on Android, run:

```
a
```

To run the app on iOS, run:

```
i
```

## Languages, frameworks, libraries, packages, tools and technologies:

- ReactNative
- React.js
- JavaScript
- expo-status-bar
- expo-linear-gradient
- @expo-google-fonts/nunito-sans
- expo-status-bar

## Functionalities:

- handling the user input data (reseiving and 'memorizing' the number picked by the user);
- input validation and informing the user about input errors;
- resetting the entry data process to the input;
- generating random numbers (the phone guesses) and limiting their range;
- displaying the phone guesses as a list;
- providing the user with the ability to give hints to the smartphone;
- ban on wrong hints; 
- displaying different 'screens' (functional components) depending on the progress of the game;
- responsive design (portrait or landsacpe orientation).


