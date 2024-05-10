import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import MainContext from "../contexts/MainContext";
import Constants from "expo-constants";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Icon, ListItem } from "@rneui/base";
import {
  GRAY_ICON_COLOR,
  IMG_URL,
  MAIN_BG_GRAY,
  MAIN_BORDER_RADIUS,
  MAIN_COLOR,
  MAIN_COLOR_GRAY,
  SERVER_URL,
  X_API_KEY,
} from "../constant";
import Carousel from "react-native-reanimated-carousel";
import RBSheet from "react-native-raw-bottom-sheet";
import UserTabData from "../refs/UserTabData";
import SpecialServiceData from "../refs/SpecialServiceData";
import AdvicesSkeleton from "../components/Skeletons/AdvicesSkeleton";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const HomeScreen = (props) => {
  const state = useContext(MainContext);
  const tabBarHeight = useBottomTabBarHeight();
  const [expanded, setExpanded] = useState({});
  const [news, setNews] = useState([]);
  const [advices, setAdvices] = useState([]);
  const [loadingAdvices, setLoadingAdvices] = useState(false);

  const ref = useRef();
  const sheetRef = useRef(); //*****Bottomsheet

  const H_MAX_HEIGHT = height * 0.2 + 30;
  const H_MIN_HEIGHT = 0;
  const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [H_MAX_HEIGHT - 20, H_MIN_HEIGHT - 20],
    extrapolate: "clamp",
  });

  const getNews = async () => {
    await axios
      .get(`${SERVER_URL}reference/news`, {
        headers: {
          "X-API-KEY": X_API_KEY,
        },
      })
      .then((response) => {
        // console.log("get News response", response.data.response);
        setNews(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  };

  const getAdvices = async () => {
    setLoadingAdvices(true);
    await axios
      .get(`${SERVER_URL}reference/main-direction`, {
        params: {
          isAdvice: 1,
        },
        headers: {
          "X-API-KEY": X_API_KEY,
        },
      })
      .then((response) => {
        // console.log("get Advices response", response.data.response);
        setAdvices(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      })
      .finally(() => {
        setLoadingAdvices(false);
      });
  };

  useEffect(() => {
    getNews();
    getAdvices();
  }, []);

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
      <View style={styles.headerContainer}>
        <Image
          style={styles.headerLogo}
          source={require("../../assets/Logo.png")}
        />
        <View style={styles.headerIcons}>
          <Icon
            name="bell"
            type="feather"
            size={25}
            style={{ marginRight: 15 }}
            onPress={() => props.navigation.navigate("NotificationScreen")}
          />
          <Icon
            name="chatbox-ellipses-outline"
            type="ionicon"
            size={28}
            onPress={() => props.navigation.navigate("HistoryMainScreen")}
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
          <Text style={styles.filterText}>Хайх</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Icon
            name="sliders"
            type="feather"
            size={20}
            color={GRAY_ICON_COLOR}
            onPress={() => sheetRef.current.open()}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: tabBarHeight,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={{ marginBottom: 10 }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {UserTabData.map((el, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.typeContainer,
                    {
                      marginLeft: index == 0 ? 20 : 10,
                    },
                  ]}
                  onPress={() => {
                    state.setSelectedUserType(el.type);
                    props.navigation.navigate("UserTypeServiceScreen");
                  }}
                >
                  <Image style={styles.typeLogo} source={el.image} />
                  <Text style={styles.typeText}>{el.title}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        {news != null ? (
          <Animated.View
            style={{
              height: headerScrollHeight,
              width: "100%",
              overflow: "hidden",
              zIndex: 999,
            }}
          >
            <View style={{ marginHorizontal: 20 }}>
              <Carousel
                width={width - 40}
                ref={ref}
                data={news}
                pagingEnabled
                autoPlay={false}
                autoPlayInterval={5000}
                style={{
                  borderRadius: 8,
                  height: height * 0.2,
                }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("SliderDTLScreen", {
                        news_id: item.id,
                      });
                    }}
                    styles={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ActivityIndicator size="small" style={styles.slideImg} />
                    <Image
                      source={{
                        uri: IMG_URL + item.imageId,
                      }}
                      style={styles.slideImg}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                )}
                onSnapToItem={(e) => {}}
              />
            </View>
          </Animated.View>
        ) : null}
        <Text style={{ fontWeight: 500, fontSize: 16, marginLeft: 20 }}>
          Онцгой үйлчилгээ
        </Text>
        <View style={styles.gridContainer}>
          {SpecialServiceData?.map((el, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  state.setSelectedSpecialService(el.type);
                  state.setSpecialServiceParams((prevState) => ({
                    ...prevState,
                    specialService: el.type,
                  }));
                  props.navigation.navigate("SpecialServiceScreen");
                }}
                style={styles.gridItem}
                key={index}
              >
                <Image style={styles.typeLogo} source={el.icon} />
                <Text style={styles.featureText}>{el.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.specialServiceText}>Зөвлөмжүүд</Text>
        <View style={{ marginVertical: 10 }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingRight: 20 }}
          >
            {advices.length == 0 && loadingAdvices ? (
              <AdvicesSkeleton />
            ) : (
              advices.map((el, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.mainServiceContainer,
                      {
                        marginLeft: index == 0 ? 20 : 10,
                      },
                    ]}
                    onPress={() =>
                      props.navigation.navigate("MainAdviceScreen", {
                        advice_id: el.id,
                      })
                    }
                  >
                    <ActivityIndicator size="small" style={styles.adviceImg} />
                    <ImageBackground
                      source={{ uri: IMG_URL + el.coverId }}
                      resizeMode="cover"
                      style={{
                        flex: 1,
                        justifyContent: "center",
                      }}
                      imageStyle={{ borderRadius: MAIN_BORDER_RADIUS }}
                    >
                      <Text style={styles.mainServiceText}>{el.name}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
        </View>
      </ScrollView>
      <RBSheet
        ref={sheetRef}
        height={height - 100}
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
        <View style={styles.dirMainContainer}>
          <ScrollView
            nestedScrollEnabled
            contentContainerStyle={styles.dirContainer}
            bounces={false}
          >
            {state?.mainDirection?.map((el, index) => {
              return (
                <View key={index} style={styles.eachDir}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingBottom: 3,
                    }}
                  >
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={{
                        uri: IMG_URL + el.logoId,
                      }}
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
                                  color: checkOpen ? MAIN_COLOR : "#6f7275",
                                  fontWeight: "500",
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
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  headerLogo: {
    resizeMode: "contain",
    width: 120,
    height: 35,
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
    marginBottom: 10,
  },
  searchInput: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  typeLogo: {
    resizeMode: "contain",
    width: 30,
    height: 30,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 2,
    },
    elevation: 2,
    backgroundColor: "#fff",
    marginVertical: 5,
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: MAIN_BORDER_RADIUS,
  },
  typeText: {
    marginLeft: 5,
    textTransform: "uppercase",
    fontWeight: "500",
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
    height: 65,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 2,
    },
    elevation: 2,
    backgroundColor: "#fff",
    width: "48%", // is 50% of container width
  },
  featureIcon: {
    resizeMode: "contain",
    width: 40,
    height: 40,
  },
  featureText: {
    flex: 1,
    marginLeft: 5,
    color: "#798585",
    fontWeight: "500",
    flexShrink: 1,
  },
  mainServiceContainer: {
    flex: 1,
    width: 180,
    height: 120,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 2,
    },
    elevation: 2,
  },
  mainServiceText: {
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  filterText: {
    color: GRAY_ICON_COLOR,
    marginLeft: 10,
  },
  filterBtn: {
    height: "100%",
    justifyContent: "center",
    width: 40,
  },
  specialServiceText: {
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 20,
    marginTop: 10,
  },
  dirMainContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
  },
  dirContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    flexDirection: "column",
    paddingBottom: 40,
  },
  eachDir: {
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
    marginBottom: 10,
    paddingBottom: 10,
  },
  slideImg: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: height * 0.2,
  },
  adviceImg: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 120,
  },
});
