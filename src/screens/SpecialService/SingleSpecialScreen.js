import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { IMG_URL, SERVER_URL, X_API_KEY } from "../../constant";
import axios from "axios";
import Constants from "expo-constants";
import { Dialog, Icon } from "@rneui/base";
import GradientButton from "../../components/GradientButton";
import AdviceDTLSkeleton from "../../components/Skeletons/AdviceDTLSkeleton";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";

const SingleSpecialScreen = (props) => {
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [adviceData, setAdviceData] = useState(null);
  const [visible1, setVisible1] = useState(false);

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

  const getAdvice = async () => {
    setLoadingAdvice(true);
    await axios
      .get(`${SERVER_URL}advertisement/${props.route?.params?.advice_id}`, {
        headers: {
          "X-API-KEY": X_API_KEY,
        },
      })
      .then((response) => {
        // console.log(
        //   "get Advice response",
        //   JSON.stringify(response.data.response)
        // );
        setAdviceData(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      })
      .finally(() => {
        setLoadingAdvice(false);
      });
  };
  useEffect(() => {
    getAdvice();
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
      {loadingAdvice ? (
        <AdviceDTLSkeleton />
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            marginHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {adviceData?.images && adviceData?.images?.length > 0 ? (
            <TouchableOpacity
              onPress={() => setVisible1(true)}
              styles={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="small" style={styles.slideImg} />
              <Image
                source={{ uri: IMG_URL + adviceData?.images[0].id }}
                style={{
                  height: 220,
                  width: "100%",
                  flex: 1,
                  borderRadius: 12,
                }}
              />
            </TouchableOpacity>
          ) : null}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingRight: 20 }}
          ></ScrollView>
          <Text style={{ fontWeight: "bold", fontSize: 22, marginTop: 10 }}>
            {adviceData?.title}
          </Text>
          <Text
            style={{
              color: "#646669",
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            {adviceData?.mainDirection != null
              ? `${adviceData?.mainDirection?.name} / `
              : null}
            {adviceData?.direction != null
              ? `${adviceData?.direction?.name} / `
              : null}
            {adviceData?.subDirection != null
              ? `${adviceData?.subDirection?.name}`
              : null}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 10,
              marginVertical: 10,
            }}
          >
            <Icon
              name="flag"
              type="feather"
              size={23}
              style={{
                borderWidth: 0.5,
                padding: 5,
                borderRadius: 8,
                borderColor: "#aeaeae",
              }}
            />
            <View style={{ width: "85%" }}>
              <GradientButton
                text="Үйлчилгээг захиалах"
                action={() => {}}
                height={40}
                radius={6}
              />
            </View>
          </View>
          <Text>{adviceData?.desciption}</Text>
        </ScrollView>
      )}
      <Dialog
        isVisible={visible1}
        onBackdropPress={() => {
          setVisible1(!visible1);
        }}
        style={{ backgroundColor: "red" }}
        overlayStyle={styles.dialogOverlay}
      >
        <ImageZoom
          source={{ uri: IMG_URL + adviceData?.images[0].id }}
          style={{ flex: 1, height: 200, width: "100%" }}
        />
        <View style={{ width: 200, alignSelf: "center", marginTop: 10 }}>
          <GradientButton
            text="Хаах"
            action={() => setVisible1(false)}
            height={40}
            radius={6}
          />
        </View>
      </Dialog>
    </SafeAreaView>
  );
};

export default SingleSpecialScreen;

const styles = StyleSheet.create({
  slideImg: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 220,
  },
  dialogOverlay: {
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.9)",
    width: "100%",
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
});
