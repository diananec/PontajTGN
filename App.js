import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { ErrorBoundary } from "react-error-boundary";

import Interface from "./app/components/Interface";

const getFonts = () =>
  Font.loadAsync({
    bauhausbold: require("./assets/BauhausBold.ttf"),
    "creteround-regular": require("./assets/CreteRound-Regular.ttf"),
    "hind-medium": require("./assets/Hind-Medium.ttf"),
    rocksalt: require("./assets/RockSalt-Regular.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return <Interface />;
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
}
