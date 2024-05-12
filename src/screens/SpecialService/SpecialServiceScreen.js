import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { StatusBar, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { Dropdown } from "react-native-element-dropdown";
import SideMenu from "react-native-side-menu-updated";
import SideBarFilter from "../SideBarFilter";
import MainContext from "../../contexts/MainContext";
import axios from "axios";
import { IMG_URL, ORDER_DATA, SERVER_URL, X_API_KEY } from "../../constant";
import SpecialServiceListSekeleton from "../../components/Skeletons/SpecialServiceListSekeleton";
import Empty from "../../components/Empty";

const SpecialServiceScreen = (props) => {
  const state = useContext(MainContext);
  const tabBarHeight = useBottomTabBarHeight();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [loadingServices, setLoadingServices] = useState(false);
  const [specialServiceData, setSpecialServiceData] = useState([]);

  useLayoutEffect(() => {
    // TabBar Hide хийх
    props.navigation?.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      props.navigation?.getParent()?.setOptions({
        tabBarStyle: {
          position: "absolute",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 105,
          padding: 10,
        },
      });
    // TabBar Hide хийх
  }, [props.navigation]);

  const getSpecialServiceData = async () => {
    setLoadingServices(true);
    await axios
      .get(`${SERVER_URL}advertisement`, {
        params: state.specialServiceParams,
        headers: {
          "X-API-KEY": X_API_KEY,
        },
      })
      .then((response) => {
        // console.log(
        //   "get SpecialServiceData response",
        //   JSON.stringify(response.data.response)
        // );
        // setNews(response.data.response);
        setSpecialServiceData(response.data.response.data);
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
        setLoadingServices(false);
      });
  };
  useEffect(() => {
    getSpecialServiceData();
  }, []);

  useEffect(() => {
    //Side filter -с check хийгдэх үед GET service -н PARAM -уудыг бэлдээд SERVICE -г дуудах
    getSpecialServiceData();
  }, [state.specialServiceParams]);

  return (
    <SideMenu
      menu={
        <SideBarFilter setIsOpen={setIsOpen} isOpen={isOpen} isSpecial={1} />
      }
      isOpen={isOpen}
      onChange={(isOpen) => setIsOpen(isOpen)}
    >
      <SafeAreaProvider
        style={{
          flex: 1,
          backgroundColor: "#fff",
          paddingBottom: tabBarHeight,
        }}
      >
        <StatusBar
          translucent
          barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            paddingBottom: 10,
          }}
        >
          <Icon
            name="options"
            type="ionicon"
            size={23}
            style={{
              borderWidth: 0.5,
              padding: 5,
              borderRadius: 8,
              borderColor: "#aeaeae",
            }}
            onPress={() => setIsOpen(!isOpen)}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={ORDER_DATA}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Эрэмбэлэлт" : "..."}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
              state.setSpecialServiceParams((prevState) => ({
                ...prevState,
                order: item.value == "ASC" ? "ASC" : "DESC",
              }));
            }}
          />
        </View>
        <ScrollView
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
        >
          {specialServiceData.length == 0 && loadingServices ? (
            <SpecialServiceListSekeleton />
          ) : specialServiceData.length == 0 && !loadingServices ? (
            <Empty text="Онцгой үйлчилгээ олдсонгүй." />
          ) : (
            specialServiceData?.map((el, index) => {
              return (
                <TouchableOpacity
                  style={styles.gridItem}
                  key={index}
                  onPress={() => {
                    props.navigation.navigate("SingleSpecialScreen", {
                      adv_id: el.id,
                    });
                  }}
                >
                  <ActivityIndicator
                    size="small"
                    style={{
                      position: "absolute",
                      alignSelf: "center",
                      justifyContent: "center",
                      height: 150,
                    }}
                  />
                  <Image
                    source={
                      el.images[0]
                        ? {
                            uri: IMG_URL + el.images[0]?.id,
                          }
                        : require("../../../assets/splash_bg_1.jpg")
                    }
                    style={{
                      width: "100%",
                      height: 150,
                      borderTopLeftRadius: 6,
                      borderTopRightRadius: 6,
                    }}
                    resizeMode="cover"
                  />
                  <View style={{ flexDirection: "column", padding: 10 }}>
                    <Text
                      numberOfLines={1}
                      style={{ fontSize: 16, fontWeight: "500" }}
                    >
                      {el.title}
                    </Text>
                    <Text
                      style={{ color: "#aeaeae", fontWeight: "500" }}
                      numberOfLines={1}
                    >
                      {el.desciption}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </SafeAreaProvider>
    </SideMenu>
  );
};

export default SpecialServiceScreen;

const styles = StyleSheet.create({
  dropdown: {
    borderColor: "#aeaeae",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "50%",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  gridContainer: {
    flexGrow: 1,
    paddingTop: 10,
  },
  gridItem: {
    marginBottom: 10,
    marginHorizontal: 20,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 2,
    },
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
});
