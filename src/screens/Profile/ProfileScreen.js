import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Icon } from "@rneui/base";
import MainContext from "../../contexts/MainContext";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import {
  GRAY_ICON_COLOR,
  IMG_URL,
  MAIN_BG_GRAY,
  MAIN_COLOR_GRAY,
  SERVER_URL,
  X_API_KEY,
} from "../../constant";
import { Divider } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import GradientButton from "../../components/GradientButton";
import axios from "axios";
import { menuList } from "./ProfileMenuList";

const ProfileScreen = (props) => {
  const state = useContext(MainContext);
  const sheetRef = useRef(); //*****Bottomsheet

  const [profileData, setProfileData] = useState(null);
  const [loadingProfileData, setLoadingProfileData] = useState(false);
  const tabBarHeight = useBottomTabBarHeight();

  const getProfileData = async () => {
    setLoadingProfileData(true);
    await axios
      .get(`${SERVER_URL}authentication`, {
        headers: {
          "X-API-KEY": X_API_KEY,
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((response) => {
        console.log("AAA", response.data.response?.user);
        setProfileData(response.data.response?.user);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
        if (error.response.status == "401") {
          state.setIsLoggedIn(false);
          state.setErrorMsg(
            "Токены хүчинтэй хугацаа дууссан байна. Дахин нэвтэрнэ үү"
          );
        }
      })
      .finally(() => {
        setLoadingProfileData(false);
      });
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#fff",
        paddingBottom: tabBarHeight,
      }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <StatusBar
          translucent
          barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
        />
        <View style={{ position: "relative" }}>
          <Image
            style={styles.headerBg}
            source={require("../../../assets/splash_bg_1.jpg")}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              backgroundColor: "rgba(255,255,255, 0.7)",
              padding: 8,
              borderRadius: 100,
            }}
            onPress={() => {
              console.log("X");
            }}
            activeOpacity={0.7}
          >
            <Icon name="camera" type="feather" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileCircle}>
          <Image
            style={styles.userIcon}
            source={
              profileData?.avatarId
                ? {
                    uri: IMG_URL + profileData?.avatarId,
                  }
                : require("../../../assets/PersonCircle.png")
            }
          />
          <View
            style={{
              flexDirection: "column",
              top: 60,
              marginLeft: 20,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {state.lastName && state.firstName ? (
                <Text style={{ fontWeight: "500" }}>
                  {state.lastName?.substr(0, 1)}. {state.firstName}
                </Text>
              ) : (
                <Text style={styles.generalText}>Хэрэглэгч</Text>
              )}
            </Text>
            <Text style={{ color: GRAY_ICON_COLOR }}>
              “МЕТА СТАРТ” ХХК Захирал
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            marginTop: 110,
          }}
        >
          {menuList.map((el, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.gridMenus}
                onPress={() => props.navigation.navigate(el.nav)}
              >
                {el.icon}
                <Text style={styles.menuText}>{el.name}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={styles.gridMenus}
            onPress={() => {
              sheetRef.current.open();
            }}
          >
            <Icon name="log-out" type="feather" size={25} color="red" />
            <Text style={styles.lastText}>Системээс гарах</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <RBSheet
        ref={sheetRef}
        height={200}
        closeOnDragDown={true} //*****sheet -г доош чирж хаах
        closeOnPressMask={true} //*****sheet -н гадна дарж хаах
        dragFromTopOnly={true}
        customStyles={{
          container: {
            backgroundColor: MAIN_BG_GRAY,
            flexDirection: "column",
            borderTopEndRadius: 16,
            borderTopStartRadius: 16,
          },
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              color: "red",
              fontSize: 22,
              textAlign: "center",
            }}
          >
            Системээс гарах
          </Text>
          <Divider style={{ marginVertical: 20 }} />
          <Text
            style={{
              fontWeight: "500",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Та системээс гарах гэж байна.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: "48%",
                borderWidth: 2,
                borderRadius: 8,
                borderColor: "#aeaeae",
                height: 40,
              }}
              onPress={() => {
                sheetRef.current.close();
              }}
            >
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  paddingVertical: Platform.OS == "ios" ? 8 : 0,
                  fontSize: 18,
                  fontWeight: "500",
                  color: "#aeaeae",
                }}
              >
                Буцах
              </Text>
            </TouchableOpacity>
            <View style={{ width: "48%" }}>
              <GradientButton
                text="Гарах"
                action={() => {
                  state.logout();
                }}
                height={40}
                radius={6}
              />
            </View>
          </View>
        </View>
      </RBSheet>
    </SafeAreaProvider>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  headerBg: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  userIcon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderWidth: 4,
    borderRadius: 120,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  gridMenus: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  lastText: {
    color: "red",
    fontWeight: "500",
    marginLeft: 20,
  },
  menuText: {
    color: GRAY_ICON_COLOR,
    fontWeight: "500",
    marginLeft: 20,
  },
  profileCircle: {
    position: "absolute",
    flexDirection: "row",
    top: 100,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: MAIN_COLOR_GRAY,
  },
});
