import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { Dropdown } from "react-native-element-dropdown";
import SideMenu from "react-native-side-menu-updated";
import {
  MAIN_BORDER_RADIUS,
  ORDER_DATA,
  SERVER_URL,
  X_API_KEY,
} from "../../constant";
import AdviceSideBarFilter from "./AdviceSideBarFilter";
import axios from "axios";
import Empty from "../../components/Empty";
import ListServiceSkeleton from "../../components/Skeletons/ListServiceSkeleton";

const MainAdviceScreen = (props) => {
  const tabBarHeight = useBottomTabBarHeight();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [loadingServices, setLoadingServices] = useState(false);
  const [adviceData, setAdviceData] = useState([]);

  const [adviceDataParams, setAdviceDataParams] = useState({
    order: "DESC",
    page: 1,
    limit: 10,
    mainDirectionId: props.route?.params?.advice_id,
  });

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

  const getAdvices = async () => {
    console.log("getAdvices");
    setLoadingServices(true);
    await axios
      .get(`${SERVER_URL}reference/advice`, {
        params: adviceDataParams,
        headers: {
          "X-API-KEY": X_API_KEY,
        },
      })
      .then((response) => {
        // console.log("get Advices ==>", JSON.stringify(response.data.response));
        setAdviceData(response.data.response.data);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      })
      .finally(() => {
        setLoadingServices(false);
      });
  };
  useEffect(() => {
    getAdvices();
  }, []);

  useEffect(() => {
    getAdvices();
  }, [adviceDataParams]);

  return (
    <SideMenu
      menu={
        <AdviceSideBarFilter
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          mainDirecionId={props.route?.params?.advice_id}
          setAdviceDataParams={setAdviceDataParams}
        />
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
              setAdviceDataParams((prevState) => ({
                ...prevState,
                order: item.value == "ASC" ? "ASC" : "DESC",
              }));
            }}
          />
        </View>
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {adviceData.length == 0 && loadingServices ? (
            <ListServiceSkeleton />
          ) : adviceData.length == 0 && !loadingServices ? (
            <Empty text="Хийгдэж буй ажил олдсонгүй." />
          ) : (
            adviceData?.map((el, index) => {
              return (
                <TouchableOpacity
                  onPress={() => []}
                  style={styles.gridItem}
                  key={index}
                >
                  <Image
                    style={styles.fileIcon}
                    source={require("../../../assets/pdf_icon.png")}
                  />
                  <Text style={styles.fileText} numberOfLines={2}>
                    {el.title}
                  </Text>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </SafeAreaProvider>
    </SideMenu>
  );
};

export default MainAdviceScreen;

const styles = StyleSheet.create({
  dropdown: {
    borderColor: "#aeaeae",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "50%",
  },
  placeholderStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginHorizontal: 20,
    gap: 2,
  },
  gridItem: {
    marginTop: 10,
    borderRadius: MAIN_BORDER_RADIUS,
    height: 150,
    paddingHorizontal: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "48%", // is 50% of container width
    borderColor: "#dadada",
    borderWidth: 1,
  },
  fileIcon: {
    height: 70,
    width: 55,
  },
  fileText: {
    textAlign: "center",
    color: "#919395",
    fontWeight: "500",
    marginTop: 10,
  },
});
