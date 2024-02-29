import { View } from "react-native";
import React, { useRef } from "react";
// import LottieView from "lottie-react-native";

const Loader = () => {
  const animation = useRef(null);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        justifyContent: "center",
      }}
    >
      {/* <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 80,
          height: 80,
          backgroundColor: "transparent",
        }}
        source={require("../../assets/loader.json")}
      /> */}
    </View>
  );
};

export default Loader;
