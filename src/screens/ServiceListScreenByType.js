import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { StatusBar, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { Dropdown } from "react-native-element-dropdown";
import { Drawer } from "react-native-paper";
import MainContext from "../contexts/MainContext";
import { MAIN_BORDER_RADIUS, MAIN_COLOR, SERVER_URL } from "../constant";

const ServiceListScreenByType = (props) => {
  const state = useContext(MainContext);

  const tabBarHeight = useBottomTabBarHeight();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [active, setActive] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
  const data = [
    { label: "Огноогоор", value: "1" },
    { label: "Шинэ эхэндээ", value: "2" },
  ];

  return (
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
          onPress={() => console.log("X")}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
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
          }}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {state.customerTypes?.map((el, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.typeContainer,
                  {
                    marginLeft: index == 0 ? 20 : 10,
                    backgroundColor:
                      index == selectedType ? MAIN_COLOR : "#fff",
                  },
                ]}
                onPress={() => {
                  setSelectedType(index);
                }}
              >
                <Image
                  style={styles.typeLogo}
                  source={{ uri: SERVER_URL + "images/" + el.logo?.path }}
                />
                <Text
                  style={[
                    styles.typeText,
                    {
                      color: index == selectedType ? "#fff" : "#000",
                    },
                  ]}
                >
                  {el.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={styles.gridScrollContainer}>
        <View styles={styles.gridContainer}>
          {[...Array(10)].map((el, index) => {
            return (
              <View style={styles.gridItem} key={index}>
                <Image
                  source={require("../../assets/splash_bg_1.jpg")}
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
                    Үндэсний шилдэг бүтээн байгуулагч NCD Group болон хот
                    БАРИЛГЫН САЛБАРЫН ХӨГЖЛИЙН ЧИГ ХАНДЛАГА
                  </Text>
                  <Text style={{ color: "#aeaeae", fontWeight: "500" }}>
                    NCD Group - {index}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default ServiceListScreenByType;

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
  gridScrollContainer: {
    flexGrow: 1,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 2,
  },
  gridItem: {
    marginBottom: 10,
    marginHorizontal: 20,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 6,
    width: "40%",
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 2,
    backgroundColor: "#fff",
    marginVertical: 5,
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: MAIN_BORDER_RADIUS,
  },
  typeLogo: {
    resizeMode: "contain",
    width: 30,
    height: 30,
  },
  typeText: {
    marginLeft: 5,
    textTransform: "uppercase",
    fontWeight: 500,
  },
});
