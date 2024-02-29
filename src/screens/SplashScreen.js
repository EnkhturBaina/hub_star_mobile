import { StyleSheet, View, Image, LogBox, ImageBackground } from "react-native";
import React, { useEffect, useRef } from "react";
import splash_logo from "../../assets/splash_logo.png";
import LottieView from "lottie-react-native";

if (__DEV__) {
  const ignoreWarns = [
    "EventEmitter.removeListener",
    "[fuego-swr-keys-from-collection-path]",
    "Setting a timer for a long period of time",
    "ViewPropTypes will be removed from React Native",
    "AsyncStorage has been extracted from react-native",
    "exported from 'deprecated-react-native-prop-types'.",
    "Non-serializable values were found in the navigation state.",
    "VirtualizedLists should never be nested inside plain ScrollViews",
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}
const SplashScreen = () => {
  const animation = useRef(null);

  useEffect(() => {}, []);
  return (
    <ImageBackground
      source={require("../../assets/splash_bg.png")}
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        resizeMode: "contain",
      }}
      resizeMode="cover"
    >
      <Image
        style={{
          resizeMode: "contain",
          width: "40%",
          height: "60%",
          zIndex: 999,
        }}
        source={splash_logo}
      />
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 150,
          height: 150,
          backgroundColor: "transparent",
        }}
        source={require("../../assets/hub_star_loader.json")}
      />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
