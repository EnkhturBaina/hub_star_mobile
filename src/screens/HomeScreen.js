import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Linking,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import MainContext from "../contexts/MainContext";

const HomeScreen = (props) => {
  const state = useContext(MainContext);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar
        translucent
        barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
      />
      <Text>zzzzzzzzzz</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
