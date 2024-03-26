import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  GRAY_ICON_COLOR,
  MAIN_BG_GRAY,
  MAIN_BORDER_RADIUS,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
  SERVER_URL,
} from "../../constant";
import { Icon, ListItem } from "@rneui/base";
import MainContext from "../../contexts/MainContext";

const CategoryScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const state = useContext(MainContext);

  const [expanded, setExpanded] = useState({});

  return (
    <SafeAreaProvider
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
      <View style={styles.stack1}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {}}
        >
          <View>
            <Image
              source={require("../../../assets/PersonCircle.png")}
              style={{ width: 50, height: 50, borderRadius: 50 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <Text style={{ fontWeight: 500 }}>xaxaxaxa</Text>
            <Text style={{}}>ID дугаар: 12112212</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <Icon
            name="bell"
            type="feather"
            size={23}
            style={{ marginRight: 10 }}
            onPress={() => console.log("X")}
          />
          <Icon
            name="chatbox-ellipses-outline"
            type="ionicon"
            size={25}
            onPress={() => console.log("X")}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.searchContainer}
        activeOpacity={1}
        onPress={() => {
          // props.navigation.navigate("SearchScreen")
        }}
      >
        <View style={styles.searchInput}>
          <Icon
            name="search"
            type="feather"
            size={20}
            color={GRAY_ICON_COLOR}
          />
          <Text
            style={{
              color: GRAY_ICON_COLOR,
              marginLeft: 10,
            }}
          >
            Хайх
          </Text>
        </View>
        <TouchableOpacity
          style={{
            height: "100%",
            justifyContent: "center",
            width: 40,
          }}
        >
          <Icon
            name="sliders"
            type="feather"
            size={20}
            color={GRAY_ICON_COLOR}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          flexDirection: "column",
          backgroundColor: MAIN_BG_GRAY,
          paddingTop: 20,
        }}
        bounces={false}
      >
        {state?.mainDirection?.map((el, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: "column",
                borderBottomWidth: 1,
                borderBottomColor: "#ebebeb",
                marginBottom: 10,
                paddingBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: 3,
                }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={{ uri: SERVER_URL + "images/" + el?.logo?.path }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    marginLeft: 5,
                  }}
                >
                  {el.name}
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 10,
                }}
              >
                {el.children?.map((child, index2) => {
                  const checkOpen = expanded[index + "-" + index2];
                  return (
                    <ListItem.Accordion
                      noIcon={child?.sub_children != "" ? false : true}
                      key={index + "-" + index2}
                      content={
                        <ListItem.Content>
                          <ListItem.Title
                            style={{
                              color: checkOpen ? MAIN_COLOR : "#000",
                              fontWeight: checkOpen ? "500" : "normal",
                              marginBottom: 5,
                            }}
                          >
                            {child.name}
                          </ListItem.Title>
                        </ListItem.Content>
                      }
                      isExpanded={checkOpen}
                      onPress={() => {
                        child?.sub_children != "" &&
                          setExpanded((prevState) => ({
                            ...prevState,
                            [index + "-" + index2]:
                              !prevState[index + "-" + index2],
                          }));
                      }}
                      containerStyle={{
                        paddingVertical: 8,
                        paddingHorizontal: 3,
                        backgroundColor: MAIN_BG_GRAY,
                      }}
                    >
                      <ListItem
                        containerStyle={{
                          flexDirection: "column",
                          alignItems: "flex-start",
                          backgroundColor: MAIN_BG_GRAY,
                        }}
                      >
                        {child?.sub_children?.map((sub, indexSub) => {
                          return (
                            <View
                              key={indexSub}
                              style={{
                                marginBottom: 20,
                              }}
                            >
                              <Text>{sub.name}</Text>
                            </View>
                          );
                        })}
                      </ListItem>
                    </ListItem.Accordion>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  stack1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: MAIN_COLOR_GRAY,
    borderRadius: MAIN_BORDER_RADIUS,
    height: 50,
    paddingLeft: 20,
    paddingRight: 10,
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  searchInput: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
