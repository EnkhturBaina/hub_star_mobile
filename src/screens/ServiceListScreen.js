import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { Dropdown } from "react-native-element-dropdown";
import SideMenu from "react-native-side-menu-updated";
import SideBarFilter from "./SideBarFilter";

const ServiceListScreen = (props) => {
  const tabBarHeight = useBottomTabBarHeight();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const data = [
    { label: "Огноогоор", value: "1" },
    { label: "Шинэ эхэндээ", value: "2" },
  ];

  return (
    <SideMenu
      menu={<SideBarFilter setIsOpen={setIsOpen} isOpen={isOpen} />}
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
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {[...Array(10)].map((el, index) => {
            return (
              <TouchableOpacity
                style={styles.gridItem}
                key={index}
                onPress={() => {
                  props.navigation.navigate("ServiceDTLScreen");
                }}
              >
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
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaProvider>
    </SideMenu>
  );
};

export default ServiceListScreen;

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
    flex: 1,
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
  },
});
