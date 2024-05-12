import {
  StyleSheet,
  Platform,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import Constants from "expo-constants";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import UserTypes from "./HomeScreenComponents/UserTypes";
import BannerNews from "./HomeScreenComponents/BannerNews";
import HomeHeader from "./HomeScreenComponents/HomeHeader";
import HomeSearch from "./HomeScreenComponents/HomeSearch";
import SpecialService from "./HomeScreenComponents/SpecialService";
import Advices from "./HomeScreenComponents/Advices";

const HomeScreen = (props) => {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar
        translucent
        barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
      />
      <HomeHeader />
      <HomeSearch />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: tabBarHeight,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <UserTypes />
        <BannerNews />
        <SpecialService />
        <Advices />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
