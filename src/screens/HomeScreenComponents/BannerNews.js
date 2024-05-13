import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";
import { IMG_URL, SERVER_URL, X_API_KEY } from "../../constant";
import MainContext from "../../contexts/MainContext";
import axios from "axios";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const BannerNews = () => {
  const state = useContext(MainContext);
  const navigation = useNavigation();
  const ref = useRef();
  const [news, setNews] = useState([]);

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
        console.error("Error fetching get News:", error);
        if (error.response.status == "401") {
          state.setIsLoggedIn(false);
          state.setErrorMsg(
            "Токены хүчинтэй хугацаа дууссан байна. Дахин нэвтэрнэ үү"
          );
        }
      });
  };

  useEffect(() => {
    getNews();
  }, []);
  return (
    <>
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
                    navigation.navigate("SliderDTLScreen", {
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
    </>
  );
};

export default BannerNews;

const styles = StyleSheet.create({
  slideImg: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: height * 0.2,
  },
});
