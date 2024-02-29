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
import Constants from "expo-constants";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const HomeScreen = (props) => {
  const state = useContext(MainContext);
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#fff",
        paddingBottom: tabBarHeight,
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
