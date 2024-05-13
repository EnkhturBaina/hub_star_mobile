import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { IMG_URL, SERVER_URL, X_API_KEY } from "../constant";
import axios from "axios";
import MainContext from "../contexts/MainContext";
import NewsDTLSkeleton from "../components/Skeletons/NewsDTLSkeleton";

const SliderDTLScreen = (props) => {
  const state = useContext(MainContext);
  const [newsData, setNewsData] = useState(null);

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

  const getNewsDTL = async () => {
    await axios
      .get(`${SERVER_URL}reference/news/show/${props.route?.params?.news_id}`, {
        headers: {
          "X-API-KEY": X_API_KEY,
        },
      })
      .then((response) => {
        // console.log("get NewsDTL response", response.data.response);
        setNewsData(response.data.response);
      })
      .catch((error) => {
        if (error.response.status == "401") {
          state.setIsLoggedIn(false);
          state.setErrorMsg(
            "Токены хүчинтэй хугацаа дууссан байна. Дахин нэвтэрнэ үү"
          );
        }
        // console.error("Error fetching get NewsDTL:", error.response.status);
      });
  };

  useEffect(() => {
    props.route?.params?.news_id && getNewsDTL();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {newsData == null ? (
        <NewsDTLSkeleton />
      ) : (
        <>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
            {newsData.title}
          </Text>
          <Image
            source={{
              uri: IMG_URL + newsData.imageId,
            }}
            style={{ width: "100%", height: 200, borderRadius: 10 }}
            resizeMode="cover"
          />
          <Text
            style={{ fontWeight: "bold", fontSize: 16, marginVertical: 10 }}
          >
            {newsData.description}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            {newsData.body}
          </Text>
        </>
      )}
    </ScrollView>
  );
};

export default SliderDTLScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
});
